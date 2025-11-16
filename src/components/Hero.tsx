import { Button } from "@/components/ui/button";
import { Gift, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TopUsers } from "./TopUsers";
import { TopDonors } from "./TopDonors";

interface HeroProps {
  user: any;
}

export const Hero = ({
  user
}: HeroProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 py-12">
      {/* Leaderboards + Logo Central */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-6 items-center mb-8">
        {/* Top 5 Utilizatori - Left */}
        <div className="order-2 lg:order-1">
          <TopUsers />
        </div>

        {/* Logo Central */}
        <div className="order-1 lg:order-2 text-center">
          <div className="relative inline-block mb-4 animate-bounce-horizontal">
            <img src="/logo-green&go.png" alt="Green&Go" className="h-56 w-56" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Green&Go
          </h1>
        </div>

        {/* Top 5 Donatori - Right */}
        <div className="order-3">
          <TopDonors />
        </div>
      </div>

      {/* Description and Buttons */}
      <div className="text-center space-y-6">
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Transformă grijă pentru mediu într-o experiență plăcută și realistă. Fiecare pas contează pentru un viitor mai sustenabil.  
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-primary hover:opacity-90 shadow-strong transition-all w-full md:w-auto" onClick={() => navigate("/rewards")}>
            <Gift className="mr-2 h-5 w-5" />
            Vezi Premiile
          </Button>
          <Button size="lg" variant="outline" className="shadow-medium transition-all w-full md:w-auto border-primary/30 hover:bg-primary/10" onClick={() => navigate("/ai-chat")}>
            <Bot className="mr-2 h-5 w-5" />
            Întreabă AI-ul
          </Button>
        </div>
      </div>
    </div>
  );
};