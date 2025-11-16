import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
}

const badges: BadgeItem[] = [
  {
    id: "first-steps",
    name: "Primii Pași",
    description: "Completează prima ta provocare",
    emoji: "🌱",
    earned: true
  },
  {
    id: "eco-warrior",
    name: "Războinic Eco",
    description: "Completează 10 provocări",
    emoji: "🛡️",
    earned: true
  },
  {
    id: "recycling-pro",
    name: "Expert Reciclare",
    description: "Completează toate provocările de reciclare",
    emoji: "♻️",
    earned: true
  },
  {
    id: "energy-saver",
    name: "Economisitor de Energie",
    description: "Completează 5 provocări de energie",
    emoji: "⚡",
    earned: false
  },
  {
    id: "community-hero",
    name: "Erou al Comunității",
    description: "Implică-te în 3 acțiuni comunitare",
    emoji: "🤝",
    earned: false
  },
  {
    id: "green-legend",
    name: "Legendă Verde",
    description: "Atinge nivelul 10",
    emoji: "🌟",
    earned: false
  }
];

export const BadgeGallery = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Badge-urile tale
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {badges.map((badge, index) => (
          <Card 
            key={badge.id}
            className={`shadow-medium transition-all text-center border-2 animate-in fade-in slide-in-from-bottom-4 ${
              badge.earned 
                ? 'hover:shadow-strong cursor-pointer hover:scale-110 hover:-rotate-2 hover:border-primary/50 duration-300' 
                : 'opacity-60 grayscale hover:opacity-70'
            }`}
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
          >
            <CardContent className="pt-4 pb-3 px-2">
              <div className={`text-3xl mb-2 transition-transform duration-300 ${badge.earned ? 'group-hover:scale-125 group-hover:animate-float' : ''}`}>
                {badge.emoji}
              </div>
              <h3 className="font-bold text-xs mb-1 line-clamp-2">{badge.name}</h3>
              <p className="text-[10px] text-muted-foreground leading-tight line-clamp-3 mb-2">{badge.description}</p>
              {badge.earned && (
                <Badge className="mt-1 text-[9px] py-0 px-1.5 bg-primary text-primary-foreground shadow-sm" variant="secondary">
                  ✓ Obținut
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
