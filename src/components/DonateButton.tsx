import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const DonateButton = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("visa");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setCheckout(false);
      setSelected(null);
      setCustom("");
      setPaymentMethod("visa");
      toast.success("Tranzacție finalizată cu succes! Mulțumim pentru susținere.");
    }, 3000);
  };

  const handleAbort = () => {
    setOpen(false);
    setCheckout(false);
    setSelected(null);
    setCustom("");
    setPaymentMethod("visa");
  };

  return (
    <div style={{ position: "fixed", left: 32, bottom: 80, zIndex: 50 }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "linear-gradient(90deg, #1ed760 0%, #f9d423 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "2em",
          padding: "0.5em 1.3em",
          fontWeight: 600,
          fontSize: "0.98em",
          boxShadow: "0 2px 8px 0 rgba(30,215,96,0.15)",
          marginLeft: 0,
          marginBottom: "0.5em",
          cursor: "pointer",
          transition: "filter 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.filter = "brightness(0.95)")}
        onMouseOut={e => (e.currentTarget.style.filter = "none")}
      >
        Donate
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-start z-50" onClick={handleAbort}>
          <div className="m-4" onClick={e => e.stopPropagation()}>
            <Card className="w-80">
              <CardHeader>
                <CardTitle>Donează pentru Green&Go</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!checkout ? (
                  <>
                    <div className="flex flex-col gap-2">
                      {[10, 50, 100].map((sum, idx) => (
                        <Button
                          key={sum}
                          variant={selected === idx ? "default" : "outline"}
                          className="w-full"
                          onClick={() => { setSelected(idx); setCustom(""); }}
                        >
                          {sum} RON
                        </Button>
                      ))}
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          min={1}
                          placeholder="Altă sumă"
                          value={custom}
                          onChange={e => { setCustom(e.target.value); setSelected(null); }}
                          className="w-full"
                        />
                        <span>RON</span>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={handleAbort}>Abandon</Button>
                      <Button
                        onClick={() => setCheckout(true)}
                        disabled={selected === null && !custom}
                      >
                        Plătește
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      <div className="font-semibold mb-2">Alege metoda de plată:</div>
                      <div className="flex gap-2">
                        <Button
                          variant={paymentMethod === "visa" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setPaymentMethod("visa")}
                          disabled={loading}
                        >
                          <span role="img" aria-label="Visa">💳</span> Visa
                        </Button>
                        <Button
                          variant={paymentMethod === "paypal" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setPaymentMethod("paypal")}
                          disabled={loading}
                        >
                          <span role="img" aria-label="PayPal">🅿️</span> PayPal
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <Button variant="outline" onClick={handleAbort} disabled={loading}>Abandon</Button>
                      <Button
                        onClick={handlePay}
                        disabled={loading}
                      >
                        {loading ? "Se procesează..." : "Plătește"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
