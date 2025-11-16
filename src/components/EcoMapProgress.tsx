import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Lock, Unlock, Trophy, ArrowRight } from "lucide-react";
import { getTotalRecyclingCenters } from "@/data/romaniaRegions";

export const EcoMapProgress = () => {
  const navigate = useNavigate();
  const [unlockedCount, setUnlockedCount] = useState(0);
  const totalCenters = getTotalRecyclingCenters();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // TODO: Fetch din baza de date când va fi implementat
        // const { data } = await supabase
        //   .from('user_checkins')
        //   .select('center_id')
        //   .eq('user_id', user.id);
        // setUnlockedCount(data?.length || 0);

        // Deocamdată ia din localStorage pentru demo
        const saved = localStorage.getItem(`eco_map_unlocked_${user.id}`);
        setUnlockedCount(saved ? JSON.parse(saved).length : 0);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();

    // Listen for storage changes (când se face check-in pe hartă)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('eco_map_unlocked_')) {
        const newData = e.newValue ? JSON.parse(e.newValue) : [];
        setUnlockedCount(newData.length);
      }
    };

    // Listen for custom event când se face check-in pe aceeași tab
    const handleCheckIn = ((e: CustomEvent) => {
      setUnlockedCount(e.detail.count);
    }) as EventListener;

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('eco-map-updated', handleCheckIn);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('eco-map-updated', handleCheckIn);
    };
  }, []);

  const progress = totalCenters > 0 ? Math.round((unlockedCount / totalCenters) * 100) : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Harta Eco România</CardTitle>
              <CardDescription className="text-xs">Descoperă țara reciclând!</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progres</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center border">
            <Trophy className="h-4 w-4 text-yellow-500 mx-auto mb-0.5" />
            <p className="text-xl font-bold text-primary">{progress}%</p>
            <p className="text-[10px] text-muted-foreground">Complet</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center border">
            <Unlock className="h-4 w-4 text-green-500 mx-auto mb-0.5" />
            <p className="text-xl font-bold text-green-600">{unlockedCount}</p>
            <p className="text-[10px] text-muted-foreground">Vizitate</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center border">
            <Lock className="h-4 w-4 text-gray-400 mx-auto mb-0.5" />
            <p className="text-xl font-bold text-gray-500">{totalCenters - unlockedCount}</p>
            <p className="text-[10px] text-muted-foreground">Rămase</p>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => navigate('/eco-map')}
          className="w-full bg-primary hover:bg-primary/90 group"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Explorează Harta
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Quick Info */}
        <div className="text-[10px] text-muted-foreground text-center pt-1.5 border-t">
          <p>📍 {totalCenters} puncte de reciclare în 16 județe • 🎁 +10 puncte/check-in</p>
        </div>
      </CardContent>
    </Card>
  );
};
