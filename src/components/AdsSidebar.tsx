import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface JobAd {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  location: string;
}

interface AdsSidebarProps {
  position: "left" | "right";
}

export const AdsSidebar = ({ position }: AdsSidebarProps) => {
  const navigate = useNavigate();
  const [promotedJobs, setPromotedJobs] = useState<JobAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotedJobs = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('job_announcements')
          .select('id, title, description, category, price, location')
          .eq('is_promoted', true)
          .limit(6);

        if (!error && data) {
          setPromotedJobs(data);
        }
      } catch (err) {
        console.error('Error fetching promoted jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotedJobs();
  }, []);

  const displayAds = position === "left" ? promotedJobs.slice(0, 3) : promotedJobs.slice(3, 6);

  return (
    <div className="space-y-4 sticky top-8">
      {loading ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Se încarcă...</p>
        </div>
      ) : displayAds.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Nu sunt anunțuri promovate</p>
        </div>
      ) : (
        displayAds.map((job) => (
          <Card 
            key={job.id} 
            className="p-4 hover:shadow-elegant transition-all cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm"
            onClick={() => navigate(`/jobs?id=${job.id}`)}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
                  {job.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-primary">
                    {job.price}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {job.category}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
