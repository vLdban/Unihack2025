import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Camera } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  icon: string;
}


export const DailyChallenge = () => {
  const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchTodayChallenge();
  }, []);

  useEffect(() => {
    if (todayChallenge) {
      checkIfCompleted();
    }
  }, [todayChallenge]);

  const fetchTodayChallenge = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('date', today)
        .single();

      if (error) throw error;
      setTodayChallenge(data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast.error("Eroare la încărcarea provocării zilei");
    }
  };

  const checkIfCompleted = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !todayChallenge) return;

      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('completions')
        .select('*, challenges!inner(date)')
        .eq('user_id', user.id)
        .eq('challenge_id', todayChallenge.id)
        .eq('challenges.date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking completion:', error);
      }

      if (data) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    } catch (error) {
      console.error('Error checking completion:', error);
    }
  };

  const handleStartVerification = () => {
    setShowVerification(true);
  };

  const handleVerify = async () => {
    if (!todayChallenge) return;
    
    setVerifying(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Trebuie să fii autentificat");
        return;
      }

      let verified = false;
      let verificationMethod = '';
      let verificationData: any = {};

      // Verificare cu fotografie folosind AI
      if (uploadedImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          try {
            const payload = {
              imageBase64: base64Image,
              challengeTitle: todayChallenge.title,
              challengeDescription: todayChallenge.description,
            };

            const { data: verificationResult, error: funcError } = await supabase.functions.invoke('verify-challenge', {
              body: JSON.stringify(payload),
              headers: { 'Content-Type': 'application/json' },
            });

            console.log('verify-challenge result (photo):', { verificationResult, funcError });

            if (funcError) {
              throw funcError;
            }
            if (verificationResult?.error) {
              throw new Error(verificationResult.error || 'Verification failed');
            }

            verified = !!verificationResult.verified;
            verificationMethod = 'photo';
            verificationData = { aiResponse: verificationResult.message };

            await completeChallenge(user.id, verified, verificationMethod, verificationData);
          } catch (error: any) {
            console.error('AI verification error:', error);
            toast.error(error?.message || "Eroare la verificarea fotografiei");
            setVerifying(false);
          }
        };
        reader.readAsDataURL(uploadedImage);
      } 
      // Verificare cu întrebare (server-side)
      else if (verificationAnswer) {
        try {
          try {
            const payload = {
              textAnswer: verificationAnswer,
              challengeId: todayChallenge.id,
              challengeTitle: todayChallenge.title,
              challengeDescription: todayChallenge.description,
            };

            const { data: verificationResult, error: funcError } = await supabase.functions.invoke('verify-challenge', {
              body: JSON.stringify(payload),
              headers: { 'Content-Type': 'application/json' },
            });

            console.log('verify-challenge result (text):', { verificationResult, funcError });

            if (funcError) throw funcError;
            if (verificationResult?.error) {
              throw new Error(verificationResult.error || 'Verification failed');
            }

            verified = !!verificationResult.verified;
            verificationMethod = 'question';
            verificationData = { answer: verificationAnswer };

            await completeChallenge(user.id, verified, verificationMethod, verificationData);
          } catch (error: any) {
            console.error('Text verification error:', error);
            toast.error(error?.message || "Eroare la verificarea răspunsului");
            setVerifying(false);
          }
        } catch (error: any) {
          console.error('Text verification error:', error);
          toast.error("Eroare la verificarea răspunsului");
          setVerifying(false);
        }
      } else {
        toast.error("Te rugăm să încarci o fotografie sau să răspunzi la întrebare");
        setVerifying(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error("Eroare la verificare");
      setVerifying(false);
    }
  };

  const completeChallenge = async (
    userId: string,
    verified: boolean,
    verificationMethod: string,
    verificationData: any
  ) => {
    if (!todayChallenge) return;

    try {
      console.log('Attempting to save completion:', {
        user_id: userId,
        challenge_id: todayChallenge.id,
        verification_method: verificationMethod,
        verified,
        verification_data: verificationData
      });

      // Check if completion already exists
      const { data: existingCompletion } = await supabase
        .from('completions')
        .select('*')
        .eq('user_id', userId)
        .eq('challenge_id', todayChallenge.id)
        .single();

      let savedCompletion;

      if (existingCompletion) {
        // Update existing completion
        const { data: updatedCompletion, error: updateError } = await supabase
          .from('completions')
          .update({
            verification_method: verificationMethod,
            verified,
            verification_data: verificationData
          })
          .eq('user_id', userId)
          .eq('challenge_id', todayChallenge.id)
          .select();

        if (updateError) {
          console.error('Completion update error:', updateError);
          throw new Error(`Nu s-a putut actualiza completarea: ${updateError.message}`);
        }
        savedCompletion = updatedCompletion?.[0] || existingCompletion;
        console.log('Completion updated successfully:', savedCompletion);
      } else {
        // Insert new completion
        const { data: insertedCompletion, error: insertError } = await supabase
          .from('completions')
          .insert({
            user_id: userId,
            challenge_id: todayChallenge.id,
            verification_method: verificationMethod,
            verified,
            verification_data: verificationData
          })
          .select()
          .single();

        if (insertError) {
          console.error('Completion insert error:', insertError);
          throw new Error(`Nu s-a putut salva completarea: ${insertError.message}`);
        }
        savedCompletion = insertedCompletion;
        console.log('Completion saved successfully:', savedCompletion);
      }

      if (verified) {
        // Actualizează profilul utilizatorului
        const { data: profile, error: profileFetchError } = await supabase
          .from('profiles')
          .select('total_points, completed_challenges')
          .eq('id', userId)
          .single();

        if (profileFetchError) {
          console.error('Profile fetch error:', profileFetchError);
          throw new Error(`Nu s-a putut citi profilul: ${profileFetchError.message}`);
        }

        if (profile) {
          const newPoints = (profile.total_points || 0) + todayChallenge.points;
          const newCompletedChallenges = (profile.completed_challenges || 0) + 1;
          const newLevel = Math.floor(newPoints / 100) + 1;

          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              total_points: newPoints,
              completed_challenges: newCompletedChallenges,
              current_level: newLevel
            })
            .eq('id', userId);

          if (updateError) {
            console.error('Profile update error:', updateError);
            throw new Error(`Nu s-a putut actualiza profilul: ${updateError.message}`);
          }

          console.log('Profile updated successfully');

          setCompleted(true);
          setShowVerification(false);
          setVerificationAnswer("");
          setUploadedImage(null);
          
          toast.success("Provocare completată și verificată!", {
            description: `+${todayChallenge.points} puncte câștigate! 🎉`,
          });
        }
      } else {
        setVerifying(false);
        toast.error("Verificare eșuată", {
          description: "Fotografia nu corespunde provocării. Încearcă din nou!",
        });
      }
    } catch (error: any) {
      console.error('Error completing challenge:', error);
      toast.error(error?.message || "Eroare la salvarea provocării");
      setVerifying(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast.success("Fotografie încărcată!");
    }
  };

  if (!todayChallenge) {
    return (
      <Card className="shadow-medium border-primary/20">
        <CardContent className="py-8 text-center text-muted-foreground">
          Se încarcă provocarea zilei...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{todayChallenge.icon}</div>
            <div>
              <CardTitle className="text-2xl mb-2">{todayChallenge.title}</CardTitle>
              <CardDescription className="text-base">
                Provocarea zilei • {todayChallenge.category}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-gradient-accent border-none">
            +{todayChallenge.points} puncte
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {todayChallenge.description}
        </p>
        <Button
          data-daily-challenge-trigger
          onClick={handleStartVerification}
          disabled={completed}
          className={`w-full ${
            completed 
              ? "bg-success hover:bg-success" 
              : "bg-gradient-primary hover:opacity-90"
          } transition-all`}
          size="lg"
        >
          {completed ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Completat și Verificat!
            </>
          ) : (
            <>
              <Circle className="mr-2 h-5 w-5" />
              Verifică și Finalizează
            </>
          )}
        </Button>
      </CardContent>

      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Verifică Provocarea</DialogTitle>
            <DialogDescription>
              Pentru a finaliza provocarea, te rugăm să încarci o fotografie ca probă.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo">Încarcă o fotografie ca probă</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {uploadedImage && (
                <p className="text-sm text-success">
                  ✓ {uploadedImage.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowVerification(false)}
              className="flex-1"
            >
              Anulează
            </Button>
            <Button
              onClick={handleVerify}
              className="flex-1 bg-gradient-primary hover:opacity-90"
              disabled={verifying}
            >
              {verifying ? "Se verifică..." : "Verifică"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
