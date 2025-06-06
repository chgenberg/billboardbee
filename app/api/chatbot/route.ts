import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Du är en professionell och vänlig kundtjänstmedarbetare för BillboardBee, Sveriges ledande marknadsplats för utomhusreklam. 

Din personlighet:
- Professionell men varm och välkomnande
- Använd lite humor när det passar (särskilt bin-relaterade ordlekar 🐝)
- Håll svaren korta och koncisa
- Avsluta alltid dina svar helt - lämna aldrig meningar ofärdiga

Din kunskap om BillboardBee:
- Vi är en digital marknadsplats som kopplar samman annonsörer med skyltägare
- Annonsörer kan hyra reklamplatser på digitala och traditionella skyltar över hela Sverige
- Skyltägare kan hyra ut sina reklamytor och tjäna pengar
- Vi erbjuder flexibla bokningsperioder från dagar till månader
- Priser varierar baserat på: plats, storlek, synlighet, och lokala evenemang
- Större evenemang (konserter, sportevenemang, festivaler) kan öka priserna p.g.a. högre trafik

Vanliga frågor du kan svara på:
1. Hur fungerar BillboardBee? - Förklara vår marknadsplats
2. Vilka typer av skyltar? - Digitala LED-skärmar, traditionella affischtavlor, stortavlor
3. Prissättning - Beror på plats, tid, evenemang, synlighet
4. Bokningsprocess - Sök skyltar, välj period, ladda upp material, betala
5. Hur lång tid? - Vanligtvis 3-5 arbetsdagar från bokning till publicering

Om du inte kan svara på något eller om kunden vill ha mänsklig hjälp:
"För den frågan rekommenderar jag att du kontaktar vårt team direkt på hej@billboardbee.com. De hjälper dig gärna! 📧"

Kom ihåg: Håll svaren korta, relevanta och alltid kompletta. Ingen ska behöva gissa vad du menade!`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Meddelande saknas' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Fallback responses when OpenAI is not configured
      const fallbackResponses: { [key: string]: string } = {
        'hur fungerar': 'BillboardBee är Sveriges smartaste marknadsplats för utomhusreklam! 🐝 Vi kopplar samman dig som vill annonsera med skyltägare runt om i landet. Du söker, bokar och betalar direkt på plattformen. Enkelt som en plätt!',
        'vilka typer': 'Vi har allt från digitala LED-skärmar som lyser upp staden till klassiska affischtavlor och imponerande stortavlor. Något för varje budget och budskap! ✨',
        'pris': 'Priserna varierar beroende på skyltens läge, storlek och hur många som ser den. Evenemang i närheten kan också påverka - en skylt vid en arena blir mer värdefull under en stor konsert! 🎵',
        'hur lång tid': 'Från bokning till att din annons syns tar det vanligtvis 3-5 arbetsdagar. Vi ser till att allt flyter smidigt! 🚀',
        'evenemang': 'Stora evenemang som festivaler, konserter och sportevenemang ökar trafiken förbi skyltar. Det gör dem mer värdefulla och kan höja priserna tillfälligt. Smart att boka i förväg! 📅'
      };

      const lowerMessage = message.toLowerCase();
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          return NextResponse.json({ response });
        }
      }

      return NextResponse.json({
        response: 'Hej! Just nu är vår AI-assistent på kafferast ☕ Men du kan alltid nå vårt fantastiska team på hej@billboardbee.com för personlig hjälp!'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 
      'Oj, något blev fel! Kontakta oss på hej@billboardbee.com så hjälper vi dig personligen! 💌';

    return NextResponse.json({ response });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    return NextResponse.json({
      response: 'Hoppsan, tekniken krånglar lite! 🛠️ Mejla hej@billboardbee.com så får du hjälp av en riktig människa istället!'
    });
  }
} 