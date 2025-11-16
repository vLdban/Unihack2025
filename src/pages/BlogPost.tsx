import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ThumbsUp, MessageSquare, User, Send } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  user_id: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchComments();
    checkIfLiked();
  }, [id]);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error("Error loading post");
      navigate("/blog");
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });

    if (data) setComments(data);
  };

  const checkIfLiked = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('blog_likes')
      .select('*')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .single();

    setIsLiked(!!data);
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be authenticated to like");
      return;
    }

    if (isLiked) {
      await supabase
        .from('blog_likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', user.id);
      setIsLiked(false);
      toast.success("Like removed");
    } else {
      await supabase
        .from('blog_likes')
        .insert({ post_id: id, user_id: user.id });
      setIsLiked(true);
      toast.success("Post appreciated!");
    }
    fetchPost();
  };

  const handleComment = async () => {
    if (!user) {
      toast.error("You must be authenticated to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const { error } = await supabase
      .from('blog_comments')
      .insert({ post_id: id, user_id: user.id, content: newComment });

    if (error) {
      toast.error("Error adding comment");
    } else {
      toast.success("Comment added!");
      setNewComment("");
      fetchComments();
      fetchPost();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Recycling": return "bg-primary/10 text-primary";
      case "Energy": return "bg-accent/10 text-accent";
      case "Community": return "bg-blue-500/10 text-blue-600";
      case "Personal Balance": return "bg-pink-500/10 text-pink-600";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-strong mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString('ro-RO')}
              </span>
            </div>
            <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {post.content}
            </p>

              <div className="flex items-center gap-6 pt-4 border-t">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {post.likes_count}
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments_count} comments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment Form */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button onClick={handleComment} className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Send Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">
            Comments ({comments.length})
          </h3>
          {comments.map((comment) => (
            <Card key={comment.id} className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(comment.created_at).toLocaleDateString('ro-RO')} la {new Date(comment.created_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {comments.length === 0 && (
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center text-muted-foreground">
                No comments yet. Be the first to comment! 💬
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
