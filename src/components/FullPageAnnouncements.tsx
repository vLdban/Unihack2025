import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

export const FullPageAnnouncements = () => {
  const [jobs, setJobs] = useState<JobAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("job_announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6); // Show 6 announcements in a 2x3 or 3x2 grid

      if (!error && data) {
        setJobs(data);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <p className="text-muted-foreground">Se încarcă anunțurile...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-[73px] overflow-hidden">
      <div className="w-full h-full overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="shadow-medium hover:shadow-strong transition-all border-2 border-primary/20 h-full flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Briefcase className="h-8 w-8 text-primary flex-shrink-0" />
                  {job.is_promoted && (
                    <div className="flex gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {job.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-semibold text-primary">{job.price}</span>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit">
                  {job.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
