import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Award } from "lucide-react";

interface TopDonor {
  id: string;
  name: string;
  donations: number;
  amount: string;
}

const staticTopDonors: TopDonor[] = [
  { id: '1', name: 'Michael', donations: 12, amount: '500 RON' },
  { id: '2', name: 'Andrew', donations: 10, amount: '420 RON' },
  { id: '3', name: 'Fred', donations: 8, amount: '350 RON' },
  { id: '4', name: 'Franklin', donations: 6, amount: '280 RON' },
  { id: '5', name: 'Peter', donations: 5, amount: '210 RON' }
];

export const TopDonors = () => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Heart className="h-5 w-5 text-red-500" />;
      case 1:
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 2:
        return <Heart className="h-5 w-5 text-rose-400" />;
      default:
        return <Award className="h-5 w-5 text-primary" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-red-500/10 border-red-500/30";
      case 1:
        return "bg-pink-500/10 border-pink-500/30";
      case 2:
        return "bg-rose-400/10 border-rose-400/30";
      default:
        return "bg-primary/5 border-primary/20";
    }
  };

  return (
    <Card className="shadow-medium h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Top 5 Donatori
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {staticTopDonors.map((donor, index) => (
          <div
            key={donor.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:scale-105 ${getRankColor(index)}`}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            <Avatar className="h-10 w-10 bg-red-500/20">
              <AvatarFallback className="bg-red-500/10 text-red-600">
                {donor.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {donor.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {donor.amount}
              </p>
            </div>
            <Badge variant="secondary" className="flex-shrink-0 min-w-[70px] justify-center bg-red-500/10 text-red-600 border-red-500/20">
              {donor.donations} donații
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
