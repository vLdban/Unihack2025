import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Sprout, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";

interface TopNavBarProps {
  user: any;
}

export const TopNavBar = ({ user }: TopNavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userLevel, setUserLevel] = useState(1);
  const [currentUser, setCurrentUser] = useState(user);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // Update current user when prop changes
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    // Fetch user level from profiles table
    const fetchUserLevel = async () => {
      if (!currentUser?.id) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("current_level")
          .eq("id", currentUser.id)
          .single();

        if (!error && data) {
          setUserLevel(data.current_level || 1);
        }
      } catch (err) {
        console.error("Error fetching user level:", err);
      }
    };

    if (currentUser) {
      fetchUserLevel();
      
      // Refresh when window gains focus (user comes back to tab)
      const handleFocus = () => fetchUserLevel();
      window.addEventListener('focus', handleFocus);
      
      // Set up real-time subscription for profile updates
      const channel = supabase
        .channel(`profile-level-${currentUser.id}-${location.pathname}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${currentUser.id}`
          },
          (payload) => {
            if (payload.new && payload.new.current_level) {
              setUserLevel(payload.new.current_level);
            }
          }
        )
        .subscribe();

      return () => {
        window.removeEventListener('focus', handleFocus);
        supabase.removeChannel(channel);
      };
    }
  }, [currentUser, location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully!");
    navigate("/auth");
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-primary/20 dark:border-gray-700 shadow-sm transition-colors">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left side - Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-3 py-2 h-10"
        >
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-black dark:text-white tracking-tight">Green&Go</span>
        </button>

        {/* Right side - User info and Level */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-full border border-gray-200/50 dark:border-gray-600/50 transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
            <Sun className="h-4 w-4 text-yellow-500 dark:text-gray-500 transition-colors" />
            <Switch 
              checked={isDark}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400"
            />
            <Moon className="h-4 w-4 text-gray-500 dark:text-blue-400 transition-colors" />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full">
            <p className="text-sm text-primary dark:text-primary font-semibold">
              Level {userLevel}
            </p>
          </div>
          
          <button 
            onClick={() => navigate("/profile")}
            className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full transition-transform hover:scale-105"
          >
            <Avatar className="h-10 w-10 bg-primary ring-2 ring-primary/20 cursor-pointer">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} alt="Profile" />
              <AvatarFallback className="bg-primary text-white">
                {currentUser?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </nav>
  );
};
