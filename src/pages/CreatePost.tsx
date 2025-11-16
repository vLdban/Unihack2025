import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Recycling", "Energy", "Community", "Personal Balance"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be authenticated to create an article");
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        user_id: user.id,
        title,
        content,
        category
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error("Error creating article");
    } else {
      toast.success("Article created successfully! 🎉");
      navigate(`/blog/${data.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">
              Create a New Article
            </CardTitle>
            <CardDescription className="text-base">
              Share your eco-friendly experience with the community! 🌱
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Article Title</Label>
                <Input
                  id="title"
                  placeholder="Ex: How I reduced plastic consumption by 80%"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write here your experience, tips and learnings..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="resize-none text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Minimum 100 characters. Current: {content.length}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || content.length < 100}
                  className="flex-1 bg-primary hover:opacity-90 shadow-medium"
                >
                  {loading ? "Publishing..." : "Publish Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
