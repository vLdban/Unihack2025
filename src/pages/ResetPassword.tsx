import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user has a valid session from the password reset link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Link invalid sau expirat. Solicită un nou email de resetare.");
        navigate("/auth");
      }
    });
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Parolele nu se potrivesc!");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      toast.error("Parola trebuie să conțină cel puțin 6 caractere!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success("Parolă schimbată cu succes! Te poți autentifica cu noua parolă.");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "Eroare la resetarea parolei");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Resetează Parola
          </CardTitle>
          <CardDescription>
            Introdu noua ta parolă
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Parolă Nouă</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Minim 6 caractere
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirmă Parola Nouă</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className={confirmPassword && password !== confirmPassword ? "border-red-500" : ""}
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">
                  Parolele nu se potrivesc
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Se actualizează..." : "Resetează Parola"}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="text-sm text-primary hover:underline"
              >
                Înapoi la autentificare
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
