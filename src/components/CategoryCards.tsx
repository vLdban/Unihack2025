import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Recycle, Lightbulb, Users, Heart, Calendar, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  date: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  completedChallenges: number;
  totalChallenges: number;
  color: string;
  dbCategory: string;
  todayChallenge?: Challenge | null;
  isTodayChallengeCompleted?: boolean;
}

const categoryMapping: Category[] = [
  {
    id: "recycle",
    name: "Reciclare",
    icon: <Recycle className="w-6 h-6" />,
    description: "Reduce, refolosește, reciclează",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-primary/10 text-primary",
    dbCategory: "Reciclare"
  },
  {
    id: "energy",
    name: "Energie",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Economisește energie și resurse",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-accent/10 text-accent",
    dbCategory: "Energie"
  },
  {
    id: "community",
    name: "Comunitate",
    icon: <Users className="w-6 h-6" />,
    description: "Implicație în acțiuni locale",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-blue-500/10 text-blue-600",
    dbCategory: "Comunitate"
  },
  {
    id: "wellness",
    name: "Echilibru Personal",
    icon: <Heart className="w-6 h-6" />,
    description: "Grijă de tine și de natură",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-pink-500/10 text-pink-600",
    dbCategory: "Echilibru Personal"
  }
];

export const CategoryCards = () => {
  const [categories, setCategories] = useState<Category[]>(categoryMapping);
  const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    fetchTodayChallenge();
    fetchCategoryProgress();
  }, []);

  const fetchTodayChallenge = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('challenges')
        .select('*')
        .eq('date', today)
        .single();

      if (data) {
        setTodayChallenge(data);
      }
    } catch (error) {
      console.error('Error fetching today challenge:', error);
    }
  };

  const fetchCategoryProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: allChallenges } = await supabase
        .from('challenges')
        .select('id, category');

      const { data: completions } = await supabase
        .from('completions')
        .select('challenge_id, verified')
        .eq('user_id', user.id)
        .eq('verified', true);

      if (!allChallenges) return;

      const completedChallengeIds = new Set(completions?.map(c => c.challenge_id) || []);

      // Check if today's challenge is completed
      const today = new Date().toISOString().split('T')[0];
      const { data: todayChallengeData } = await supabase
        .from('challenges')
        .select('id, category')
        .eq('date', today)
        .single();

      const isTodayCompleted = todayChallengeData ? completedChallengeIds.has(todayChallengeData.id) : false;

      const updatedCategories = categoryMapping.map(category => {
        const totalInCategory = allChallenges.filter(
          c => c.category === category.dbCategory
        ).length;
        const completedInCategory = allChallenges.filter(
          c => c.category === category.dbCategory && completedChallengeIds.has(c.id)
        ).length;

        // Check if today's challenge belongs to this category
        const hasTodayChallenge = todayChallengeData && todayChallengeData.category === category.dbCategory;

        return {
          ...category,
          totalChallenges: totalInCategory,
          completedChallenges: completedInCategory,
          todayChallenge: hasTodayChallenge ? todayChallenge : null,
          isTodayChallengeCompleted: hasTodayChallenge ? isTodayCompleted : false
        };
      });

      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error fetching category progress:', error);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Categorii de Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card 
            key={category.id} 
            className={`shadow-medium hover:shadow-strong transition-all cursor-pointer group hover:scale-105 duration-300 border-2 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4 ${
              category.todayChallenge ? 'ring-2 ring-primary/50 ring-offset-2' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                  {category.icon}
                </div>
                {category.todayChallenge && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Astăzi
                  </Badge>
                )}
              </div>
              <CardTitle className="text-base group-hover:text-primary transition-colors">{category.name}</CardTitle>
              <CardDescription className="text-sm">{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {category.todayChallenge && (
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-primary mb-1 line-clamp-2">
                        {category.todayChallenge.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {category.todayChallenge.description}
                      </p>
                    </div>
                  </div>
                  {category.isTodayChallengeCompleted ? (
                    <Badge variant="secondary" className="w-full text-xs justify-center">
                      ✓ Completat
                    </Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      className="w-full text-xs h-7"
                      onClick={() => {
                        // Trigger DailyChallenge dialog
                        const dailyChallengeBtn = document.querySelector('[data-daily-challenge-trigger]') as HTMLElement;
                        if (dailyChallengeBtn) dailyChallengeBtn.click();
                      }}
                    >
                      Completează
                    </Button>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  Progres
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.completedChallenges}/{category.totalChallenges}
                </Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-primary transition-all duration-700 group-hover:shadow-glow relative overflow-hidden"
                  style={{ 
                    width: `${category.totalChallenges > 0 ? (category.completedChallenges / category.totalChallenges) * 100 : 0}%` 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
