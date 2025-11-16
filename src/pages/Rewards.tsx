import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, Gift, Eye, EyeOff, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Reward {
  id: string;
  level: number;
  title: string;
  description: string;
  company: string;
  value: string;
  icon: string;
  voucher_code?: string;
}

const Rewards = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [revealedCodes, setRevealedCodes] = useState<{ [key: string]: boolean }>({});
  const [copiedCodes, setCopiedCodes] = useState<{ [key: string]: boolean }>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserLevel();
    fetchRewards();
    fetchClaimedRewards();
  }, []);

  const fetchUserLevel = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('current_level')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCurrentLevel(profile.current_level);
      }
    } catch (error) {
      console.error('Error fetching user level:', error);
    }
  };

  const fetchClaimedRewards = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch din localStorage pentru demo (ar trebui să fie din baza de date)
      const claimed = localStorage.getItem(`claimed_rewards_${user.id}`);
      if (claimed) {
        setClaimedRewards(JSON.parse(claimed));
      }
    } catch (error) {
      console.error('Error fetching claimed rewards:', error);
    }
  };

  const handleClaimReward = async (rewardId: string) => {
    if (!userId) return;

    // Verifică dacă e deja revendicat
    if (claimedRewards.includes(rewardId)) {
      toast.error("Ai revendicat deja această recompensă!");
      return;
    }

    // Adaugă în lista de revendicate
    const newClaimed = [...claimedRewards, rewardId];
    setClaimedRewards(newClaimed);
    localStorage.setItem(`claimed_rewards_${userId}`, JSON.stringify(newClaimed));

    toast.success("Recompensă revendicată! Vezi codul mai jos.");
  };

  const toggleCodeVisibility = (rewardId: string) => {
    setRevealedCodes(prev => ({
      ...prev,
      [rewardId]: !prev[rewardId]
    }));
  };

  const copyVoucherCode = async (code: string, rewardId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodes(prev => ({ ...prev, [rewardId]: true }));
      toast.success("Cod copiat în clipboard!");
      
      setTimeout(() => {
        setCopiedCodes(prev => ({ ...prev, [rewardId]: false }));
      }, 2000);
    } catch (error) {
      toast.error("Eroare la copierea codului!");
    }
  };

  const generateVoucherCode = (rewardId: string) => {
    // Generează cod unic pentru fiecare reward
    const codes: { [key: string]: string } = {
      // Exemplu de coduri - în producție ar trebui să vină din baza de date
      '1': 'EMAG-VERDE-2024-XK9P',
      '2': 'ALTEX-ECO-50LEI-M7T2',
      '3': 'DECATHLON-GREEN-100-Q4W8',
    };
    return codes[rewardId] || `VOUCHER-${rewardId}-${Math.random().toString(36).substring(7).toUpperCase()}`;
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('level', { ascending: true });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      toast.error("Error loading rewards");
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">
            Recompense & Premii
          </h1>
          <p className="text-muted-foreground mb-2">
            Nivelul tău curent: <Badge className="ml-2 bg-primary">{currentLevel}</Badge>
          </p>
          <p className="text-sm text-muted-foreground">
            Recompensele sunt disponibile la fiecare 10 niveluri (10, 20, 30, etc.)
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward, index) => {
            const isUnlocked = currentLevel >= reward.level;
            const isClaimed = claimedRewards.includes(reward.id);
            const voucherCode = generateVoucherCode(reward.id);
            const isRevealed = revealedCodes[reward.id];
            const isCopied = copiedCodes[reward.id];
            const isLastItem = index === rewards.length - 1;
            const shouldSpanFull = isLastItem && rewards.length % 3 !== 0;

            return (
              <Card
                key={reward.id}
                className={`transition-all duration-300 flex flex-col ${
                  isUnlocked
                    ? "shadow-medium hover:shadow-strong border-primary/20"
                    : "opacity-60 border-muted"
                } ${shouldSpanFull ? 'lg:col-span-3' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{reward.icon}</div>
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {reward.title}
                          {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                          {isClaimed && <Badge variant="secondary" className="ml-2 bg-green-500 text-white">Revendicat</Badge>}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Level {reward.level} • {reward.company}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={isUnlocked ? "default" : "secondary"}
                      className={isUnlocked ? "bg-primary" : ""}
                    >
                      {reward.value}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">{reward.description}</p>
                  
                  {isUnlocked ? (
                    <div className="space-y-3">
                      {!isClaimed ? (
                        <Button 
                          className="w-full bg-primary hover:opacity-90 flex items-center justify-center gap-2"
                          onClick={() => handleClaimReward(reward.id)}
                        >
                          <Gift className="h-4 w-4" />
                          Revendică Recompensa
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg border-2 border-primary/20">
                            <div className="flex-1 font-mono text-sm">
                              {isRevealed ? (
                                <span className="font-bold text-primary">{voucherCode}</span>
                              ) : (
                                <span className="blur-sm select-none">XXXX-XXXX-XXXX-XXXX</span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleCodeVisibility(reward.id)}
                              className="hover:bg-primary/10"
                            >
                              {isRevealed ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            {isRevealed && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyVoucherCode(voucherCode, reward.id)}
                                className="hover:bg-primary/10"
                              >
                                {isCopied ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Click pe <Eye className="h-3 w-3 inline" /> pentru a vizualiza codul
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      Atinge nivelul {reward.level} pentru a debloca
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;