import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, challengeTitle, challengeDescription, textAnswer, challengeId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // If text answer provided, verify against protected table
    if (textAnswer && challengeId) {
      console.log('Verifying text answer for challenge:', challengeId);
      
      const { data: verification, error } = await supabaseAdmin
        .from('challenge_verification')
        .select('verification_answer')
        .eq('challenge_id', challengeId)
        .single();

      if (error) {
        console.error('Error fetching verification data:', error);
        throw new Error('Verification data not found');
      }

      const correctAnswers = verification.verification_answer?.toLowerCase().split(',').map((a: string) => a.trim()) || [];
      const userAnswer = textAnswer.toLowerCase().trim();
      
      const verified = correctAnswers.some((answer: string) => userAnswer.includes(answer));

      console.log('Text verification result:', verified);

      return new Response(
        JSON.stringify({ 
          verified, 
          message: verified ? 'Răspuns corect!' : `Răspuns incorect. Cuvinte cheie acceptate: ${correctAnswers.join(', ')}` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Verifying challenge with AI:', challengeTitle);

    // Extract base64 image data (remove data:image/... prefix if present)
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Ești un expert în sustenabilitate care verifică dacă utilizatorii au completat provocări eco-friendly.

**PROVOCAREA:**
Titlu: ${challengeTitle}
Descriere: ${challengeDescription}

**INSTRUCȚIUNI:**
1. Analizează cu atenție fotografia trimisă
2. Verifică dacă utilizatorul a realizat task-ul specificat în provocare
3. Fii generos dar realist - acceptă orice efort autentic către sustenabilitate
4. Dacă fotografia arată dovezi clare ale completării task-ului, ACCEPTĂ-o
5. Respinge doar fotografii care NU au nicio legătură cu provocarea

**EXEMPLE DE ACCEPTARE:**
- Pentru "Reciclează 3 obiecte": poză cu materiale sortate, coș de reciclare, sticle/hârtii pregătite
- Pentru "Plantează un copac": poză cu plantă/copac nou plantat, groapă săpată, ghiveci nou
- Pentru "Folosește transport public": poză în autobuz/tramvai/metrou, bilet transport
- Pentru "Strânge gunoi din parc": poză cu gunoaie adunate, saci plini, mănuși

**FORMAT RĂSPUNS (JSON obligatoriu):**
{
  "verified": true sau false,
  "reason": "explicație clară în română de ce ai acceptat sau respins poza"
}

Analizează poza acum și răspunde DOAR cu JSON-ul de mai sus:`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error('AI verification failed');
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    
    console.log('AI Response:', aiResponse);
    
    // Parse JSON response
    let verified = false;
    let message = 'Verificare completă';
    
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        verified = parsed.verified === true;
        message = parsed.reason || message;
      } else {
        // Fallback: check for keywords
        verified = aiResponse.toUpperCase().includes('TRUE') || 
                   aiResponse.toUpperCase().includes('"VERIFIED": TRUE');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback verification
      verified = aiResponse.toUpperCase().includes('TRUE');
    }

    return new Response(
      JSON.stringify({ verified, message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-challenge:', error);
    const errorMessage = error instanceof Error ? error.message : 'Eroare la verificarea provocării';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});