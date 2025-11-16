import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bună! Sunt asistentul tău AI pentru sustenabilitate și mediu. Cum te pot ajuta astăzi?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Apelează Ollama prin API
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2', // sau alt model instalat în Ollama
          prompt: `Ești un asistent AI expert în sustenabilitate, mediu și practici eco-friendly. Răspunde în limba română. 

Conversație anterioară:
${messages.map(m => `${m.role === 'user' ? 'Utilizator' : 'Asistent'}: ${m.content}`).join('\n')}

Utilizator: ${input}
Asistent:`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Eroare la comunicarea cu Ollama. Asigură-te că Ollama rulează (ollama serve).');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Eroare chat:', error);
      toast.error(error.message || "Eroare la trimiterea mesajului. Verifică dacă Ollama rulează.");
      
      // Mesaj de fallback
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Ne pare rău, am întâmpinat o problemă tehnică. Te rugăm să verifici dacă Ollama rulează cu comanda "ollama serve" în terminal.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Bună! Sunt asistentul tău AI pentru sustenabilitate și mediu. Cum te pot ajuta astăzi?',
        timestamp: new Date()
      }
    ]);
    toast.success("Conversația a fost ștearsă");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <TopNavBar user={user} />
      
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--eco-green))] to-[hsl(var(--eco-light))] bg-clip-text text-transparent mb-2">
            Asistent AI Eco 🤖
          </h1>
          <p className="text-muted-foreground">
            Pune întrebări despre sustenabilitate, reciclare, energie regenerabilă și multe altele
          </p>
        </div>

        <Card className="flex-1 flex flex-col shadow-strong border-primary/20 max-w-4xl mx-auto w-full">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  Chat cu AI
                </CardTitle>
                <CardDescription>
                  Conversație alimentată de Ollama (Local AI)
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Șterge Chat
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString('ro-RO', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm text-muted-foreground">Se gândește...</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrie mesajul tău aici..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  💡 Sfat: Apasă Enter pentru a trimite
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🤖 Model: Llama2
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 max-w-4xl mx-auto w-full">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Întrebări sugerate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Care sunt cele mai bune metode de reciclare?",
                  "Cum pot reduce amprenta de carbon?",
                  "Ce este energia regenerabilă?",
                  "Cum pot economisi energie acasă?",
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto py-3"
                    onClick={() => setInput(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AiChat;
