import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
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

export const UnpromortedJobs = () => {
  const [jobs, setJobs] = useState<JobAnnouncement[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnpromortedJobs();
  }, []);

  const fetchUnpromortedJobs = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('job_announcements')
        .select('*')
        .eq('is_promoted', false)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching unpromoted jobs:', error);
      } else {
        console.log('Unpromoted jobs fetched:', data?.length, data);
        setJobs(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Se încarcă anunțuri...</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-sm text-muted-foreground">Nu sunt anunțuri disponibile</div>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">
          Anunțuri Disponibile
        </h2>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate("/jobs")}
        >
          Vezi toate
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {jobs.map((job) => (
          <Card 
            key={job.id}
            className="shadow-medium hover:shadow-strong transition-all cursor-pointer border border-border/50"
            onClick={() => navigate("/jobs")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Briefcase className="h-6 w-6 text-primary/70 flex-shrink-0" />
                <Badge variant="outline" className="text-xs">
                  {job.category}
                </Badge>
              </div>
              <CardTitle className="text-base line-clamp-2">{job.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">{job.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary text-xs">{job.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
