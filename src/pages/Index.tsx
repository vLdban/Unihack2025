import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TopNavBar } from "@/components/TopNavBar";
import { Hero } from "@/components/Hero";
import { DailyChallenge } from "@/components/DailyChallenge";
import { StatsDisplay } from "@/components/StatsDisplay";
import { CategoryCards } from "@/components/CategoryCards";
import { BadgeGallery } from "@/components/BadgeGallery";
import { PromotedJobs } from "@/components/PromotedJobs";
import { UnpromortedJobs } from "@/components/UnpromortedJobs";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { EcoMapProgress } from "@/components/EcoMapProgress";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <TopNavBar user={user} />
      <div className="container mx-auto px-4 py-8 mt-[73px]">
        {/* Main Content - Centered */}
        <main className="max-w-4xl mx-auto space-y-12">
          <Hero user={user} />
          <PromotedJobs />
          <UnpromortedJobs />
          <DailyChallenge />
          <StatsDisplay />
          <EcoMapProgress />
          <CategoryCards />
          <BadgeGallery />
        </main>
      </div>
      <Footer />
      <ChatWidget />
      
      {/* Floating Post Job Button - Left Bottom */}
      <Button
        onClick={() => navigate("/jobs/create")}
        className="fixed bottom-6 left-6 px-6 py-3 h-auto rounded-full shadow-strong bg-gradient-primary hover:opacity-90 transition-all hover:scale-105 z-40 group"
        title="Postează un anunț"
      >
        <span className="text-white font-semibold whitespace-nowrap">
          Vrei un anunț promovat?
        </span>
      </Button>
    </div>
  );
};

export default Index;