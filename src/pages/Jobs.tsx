import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, ArrowLeft, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

interface JobAnnouncement {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  location: string;
  is_promoted: boolean;
  created_at: string;
}

const categories = ["Toate", "Construcții", "Grădinărit", "Curățenie", "Instalații", "Pictură", "Altele"];

const Jobs = () => {
  const [jobs, setJobs] = useState<JobAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from('job_announcements')
      .select('*')
      .order('is_promoted', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const filteredJobs = selectedCategory === "Toate"
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
          <Button
            onClick={() => navigate("/jobs/create")}
            className="gap-2 bg-primary"
          >
            <Plus className="h-4 w-4" />
            Creează Anunț
          </Button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Joburi disponibile
        </h1>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid grid-cols-7 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card 
                key={job.id}
                className={`shadow-medium hover:shadow-strong transition-all cursor-pointer ${
                  job.is_promoted ? 'border-2 border-primary/30' : ''
                }`}
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Briefcase className="h-8 w-8 text-primary flex-shrink-0" />
                    {job.is_promoted && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Promoted
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{job.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{job.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{job.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(job.created_at), "dd MMM yyyy", { locale: ro })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nu sunt anunțuri în această categorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
