import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient?: boolean;
  subtitle?: string;
}

const StatCard = ({ icon, label, value, gradient, subtitle }: StatCardProps) => (
  <Card className={`shadow-soft hover:shadow-medium transition-all ${gradient ? 'bg-gradient-primary text-primary-foreground' : ''}`}>
    <CardContent className="pt-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${gradient ? 'bg-white/20' : 'bg-primary/10'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className={`text-xs mt-1 ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatsDisplay = () => {
  const [stats, setStats] = useState({
    totalPoints: 0,
    completedChallenges: 0,
    currentLevel: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points, completed_challenges, current_level')
        .eq('id', user.id)
        .single();

      if (profile) {
        setStats({
          totalPoints: profile.total_points,
          completedChallenges: profile.completed_challenges,
          currentLevel: profile.current_level
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculează punctele necesare pentru următorul nivel
  // Nivel se calculează ca: nivel = (total_points / 100) + 1
  // Deci pentru nivel N, ai nevoie de (N-1) * 100 puncte
  const pointsForCurrentLevel = (stats.currentLevel - 1) * 100;
  const pointsForNextLevel = stats.currentLevel * 100;
  const pointsInCurrentLevel = stats.totalPoints - pointsForCurrentLevel;
  const pointsNeededForNextLevel = 100;
  const progressPercentage = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100;

  // Calculează next reward level (următorul multiplu de 10)
  const nextRewardLevel = Math.ceil(stats.currentLevel / 10) * 10;
  const pointsForNextReward = (nextRewardLevel - 1) * 100;
  const pointsNeededForReward = pointsForNextReward - stats.totalPoints;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-soft">
            <CardContent className="pt-6">
              <div className="animate-pulse">
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Total Points"
          value={stats.totalPoints}
          gradient
          subtitle={`${pointsInCurrentLevel}/${pointsNeededForNextLevel} for level ${stats.currentLevel + 1}`}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          label="Completed Challenges"
          value={stats.completedChallenges}
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-primary" />}
          label="Current Level"
          value={stats.currentLevel}
          subtitle={stats.currentLevel < nextRewardLevel 
            ? `${pointsNeededForReward} points until level ${nextRewardLevel}` 
            : "Reward available! 🎉"
          }
        />
      </div>
      
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to level {stats.currentLevel + 1}</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
