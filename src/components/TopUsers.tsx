import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TopUser {
  id: string;
  username: string;
  current_level: number;
  total_points: number;
}

const staticTopUsers: TopUser[] = [
  { id: '1', username: 'George', current_level: 10, total_points: 1250 },
  { id: '2', username: 'Oliver', current_level: 8, total_points: 950 },
  { id: '3', username: 'Jack', current_level: 7, total_points: 780 },
  { id: '4', username: 'Lily', current_level: 6, total_points: 620 },
  { id: '5', username: 'John', current_level: 5, total_points: 480 }
];

export const TopUsers = () => {
  const [topUsers, setTopUsers] = useState<TopUser[]>(staticTopUsers);

  // No need to fetch from database, using static data

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <Award className="h-5 w-5 text-primary" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-yellow-500/10 border-yellow-500/30";
      case 1:
        return "bg-gray-400/10 border-gray-400/30";
      case 2:
        return "bg-amber-700/10 border-amber-700/30";
      default:
        return "bg-primary/5 border-primary/20";
    }
  };

  return (
    <Card className="shadow-medium h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top 5 Utilizatori
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:scale-105 ${getRankColor(index)}`}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            <Avatar className="h-10 w-10 bg-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">
                {(user.username || `U${index + 1}`).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {user.username || `Utilizator ${index + 1}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.total_points} puncte
              </p>
            </div>
            <Badge variant="secondary" className="flex-shrink-0 min-w-[70px] justify-center">
              Lvl {user.current_level}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
