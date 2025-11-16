import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

export const PromotedJobs = () => {
  const [jobs, setJobs] = useState<JobAnnouncement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotedJobs();
  }, []);

  const fetchPromotedJobs = async () => {
    const { data, error } = await (supabase as any)
      .from('job_announcements')
      .select('*')
      .eq('is_promoted', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setJobs(data);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">
        Anunțuri Promovate
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {jobs.map((job) => (
          <Card 
            key={job.id}
            className="shadow-medium hover:shadow-strong transition-all cursor-pointer border-2 border-primary/20"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Briefcase className="h-8 w-8 text-primary flex-shrink-0" />
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  Promoted
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
              <CardDescription className="line-clamp-2">{job.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold text-primary">{job.price}</span>
              </div>
              <Badge variant="outline">{job.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
