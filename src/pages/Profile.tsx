import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TopNavBar } from "@/components/TopNavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Flame, Award, TrendingUp, LogOut } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userLevel, setUserLevel] = useState(1);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<any[]>([]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Deconectat cu succes!");
    navigate("/auth");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      // Fetch user profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("current_level, total_points")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserLevel(profile.current_level || 1);
        setCurrentPoints(profile.total_points || 0);
      }

      // Fetch streak data - calculate from challenge completions
      const { data: challenges } = await supabase
        .from("completions")
        .select("completed_at")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(30);

      if (challenges) {
        // Calculate streak
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (challenges.length > 0) {
          // Group challenges by date
          const dateMap = new Map();
          challenges.forEach(challenge => {
            const date = new Date(challenge.completed_at);
            date.setHours(0, 0, 0, 0);
            const dateStr = date.toISOString().split('T')[0];
            if (!dateMap.has(dateStr)) {
              dateMap.set(dateStr, true);
            }
          });

          // Calculate current streak
          let checkDate = new Date(today);
          while (dateMap.has(checkDate.toISOString().split('T')[0])) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          }
        }

        setStreak(currentStreak);
        
        // Generate calendar data for last 42 days (6 weeks)
        const calendar = [];
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 41);

        for (let i = 0; i < 42; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          const dateStr = currentDate.toISOString().split('T')[0];
          
          calendar.push({
            date: new Date(currentDate),
            dateStr: dateStr,
            hasActivity: challenges?.some(c => {
              const cDate = new Date(c.completed_at);
              return cDate.toISOString().split('T')[0] === dateStr;
            }) || false,
            isToday: dateStr === today.toISOString().split('T')[0]
          });
        }

        setCalendarData(calendar);
      }

      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <TopNavBar user={user} />
        <div className="pt-24 px-6 flex items-center justify-center">
          <p className="text-muted-foreground">Se încarcă...</p>
        </div>
      </div>
    );
  }

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <TopNavBar user={user} />
      
      <div className="pt-24 px-6 pb-12 max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 shadow-medium">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 bg-primary ring-4 ring-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} alt="Profile" />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{user?.email}</h1>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    <Award className="h-4 w-4 mr-2" />
                    Level {userLevel}
                  </Badge>
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {currentPoints} puncte
                  </Badge>
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    <Flame className="h-4 w-4 mr-2 text-orange-500" />
                    {streak} zile streak
                  </Badge>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Green Streak Calendar */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Calendar Activitate Eco
            </CardTitle>
            <CardDescription>
              {streak > 0 
                ? `Felicitări! Ai un streak de ${streak} ${streak === 1 ? 'zi' : 'zile'} consecutive! 🔥` 
                : "Completează provocări zilnice pentru a-ți construi un streak!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="text-center text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarData.map((day, index) => {
                const dayNumber = day.date.getDate();
                const isCurrentMonth = day.date.getMonth() === new Date().getMonth();
                
                return (
                  <div
                    key={index}
                    className={`
                      aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-medium
                      transition-all duration-200 hover:scale-105
                      ${day.hasActivity 
                        ? 'bg-primary/90 border-primary text-white shadow-lg' 
                        : 'bg-background dark:bg-gray-800 border-border hover:border-primary/50'
                      }
                      ${day.isToday 
                        ? 'ring-2 ring-accent ring-offset-2' 
                        : ''
                      }
                      ${!isCurrentMonth 
                        ? 'opacity-30' 
                        : ''
                      }
                    `}
                    title={`${day.dateStr}${day.hasActivity ? ' - Provocare completată' : ''}`}
                  >
                    <span className={day.hasActivity ? 'font-bold' : ''}>
                      {dayNumber}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex gap-6 justify-center flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary border-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">Zi activă</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-background dark:bg-gray-800 border-2 border-border"></div>
                <span className="text-sm text-muted-foreground">Zi inactivă</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-border ring-2 ring-accent"></div>
                <span className="text-sm text-muted-foreground">Astăzi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
