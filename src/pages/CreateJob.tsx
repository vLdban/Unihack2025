import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Elimin importul Select custom
import { ArrowLeft, CreditCard, Wallet, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categories = [
  { value: "Constructions", label: "Construcții" },
  { value: "gardening", label: "Grădinărit" },
  { value: "cleaning", label: "Curățenie" },
  { value: "installations", label: "Instalații" },
  { value: "painting", label: "Pictură" },
  { value: "other", label: "Altele" },
];

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show payment info instead of creating immediately
    setShowPayment(true);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Trebuie să fii autentificat");
        return;
      }

      const { error } = await (supabase as any).from("job_announcements").insert([
        {
          ...formData,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Anunțul creat cu succes!");
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Eroare la crearea anunțului");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Creează Anunț de Loc de Muncă
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titlu</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Ajutor la grădină în Brașov"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrie"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categorie</Label>
                <div className="relative">
                  <select
                    id="category"
                    className="appearance-none flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="" disabled hidden>Alege categorie</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="price">Preț</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder=""
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Locul de muncă</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Brașov, România"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Număr de telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ex: 0712345678"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={loading}
              >
                {loading ? "Se creează..." : "Publică Anunțul"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Payment Info Card */}
        {showPayment && (
          <Card className="mt-6 border-2 border-primary/30 shadow-lg animate-in slide-in-from-bottom-4">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Detalii Plată - Anunț Promovat
              </CardTitle>
              <CardDescription>
                Promovează-ți anunțul pentru vizibilitate maximă!
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Pricing Options */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-2 hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">40 RON</div>
                    <div className="text-sm text-muted-foreground mb-4">/ săptămână</div>
                    <ul className="text-xs space-y-2 text-left">
                      <li>✓ Anunț promovat 7 zile</li>
                      <li>✓ Apare în top rezultate</li>
                      <li>✓ Badge "Promovat"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary hover:border-primary transition-all cursor-pointer bg-primary/5">
                  <CardContent className="pt-6 text-center relative">
                    <div className="absolute top-2 right-2">
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">Popular</span>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">100 RON</div>
                    <div className="text-sm text-muted-foreground mb-4">/ lună</div>
                    <ul className="text-xs space-y-2 text-left">
                      <li>✓ Anunț promovat 30 zile</li>
                      <li>✓ Apare în top rezultate</li>
                      <li>✓ Badge "Promovat"</li>
                      <li>✓ Economisești 60 RON</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Metode de Plată
                </h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-all">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Card Bancar</div>
                      <div className="text-xs text-muted-foreground">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-all">
                    <Wallet className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Transfer Bancar</div>
                      <div className="text-xs text-muted-foreground">IBAN: RO49AAAA1B31007593840000</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPayment(false)}
                  disabled={loading}
                >
                  Înapoi
                </Button>
                <Button
                  className="flex-1 bg-primary"
                  onClick={handleFinalSubmit}
                  disabled={loading}
                >
                  {loading ? "Se procesează..." : "Confirmă & Plătește"}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                💡 Anunțurile promovate primesc de 5x mai multe vizualizări!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
