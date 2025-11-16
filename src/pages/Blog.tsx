import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, ThumbsUp, User } from "lucide-react";
interface BlogPost {
  id: string;
  title: string;
  category: string;
  user_id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}
const categories = ["All", "Recycling", "Energy", "Community", "Personal Balance"];
const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const {
      data
    } = await supabase.from('blog_posts').select('*').order('created_at', {
      ascending: false
    });
    if (data) setPosts(data);
    setLoading(false);
  };
  const filteredPosts = selectedCategory === "All" ? posts : posts.filter(post => post.category === selectedCategory);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Recycling":
        return "bg-primary/10 text-primary";
      case "Energy":
        return "bg-accent/10 text-accent";
      case "Community":
        return "bg-blue-500/10 text-blue-600";
      case "Personal Balance":
        return "bg-pink-500/10 text-pink-600";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 mx-0 my-0 px-0 py-[10px]">
            Blog & Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Share your eco-friendly experiences, learn from others' journeys,
            and find solutions to your sustainability challenges. 🌱
          </p>
        </div>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
            {categories.map(category => <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </TabsTrigger>)}
          </TabsList>
        </Tabs>

        {loading ? <div className="text-center py-12">
            <div className="animate-pulse text-xl text-muted-foreground">Loading...</div>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => <Card key={post.id} onClick={() => navigate(`/blog/${post.id}`)} className="shadow-medium hover:shadow-strong transition-all cursor-pointer hover:scale-105 duration-300 animate-in fade-in slide-in-from-bottom-4" style={{
          animationDelay: `${index * 80}ms`,
          animationFillMode: 'backwards'
        }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString('ro-RO')}
                    </span>
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <User className="h-3 w-3" />
                    User
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
            {filteredPosts.length === 0 && <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles yet in this category. Be the first to write! ✍️
                </p>
              </div>}
          </div>}

        <Card className="mt-12 bg-gradient-primary text-primary-foreground shadow-strong">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Do you have a story to share?</CardTitle>
            <CardDescription className="text-center text-primary-foreground/80">
              Help the community grow by sharing your eco-friendly experiences!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" variant="secondary" className="shadow-medium hover:shadow-strong transition-all" onClick={() => navigate("/blog/create")}>
              Write an Article
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Blog;