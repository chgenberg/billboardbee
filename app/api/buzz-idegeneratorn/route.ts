import { NextResponse } from 'next/server';
import { load } from 'cheerio';

async function fetchAndExtractText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Kunde inte hämta sidan.');
  const html = await res.text();
  const $ = load(html);
  // Plocka ut huvudtexten (body, p, h1-h3)
  let text = '';
  $('h1, h2, h3, p').each((_, el) => {
    text += $(el).text() + '\n';
  });
  return text.trim().slice(0, 4000); // max 4000 tecken till OpenAI
}

async function openaiChat(messages: any[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key saknas. Vänligen konfigurera OPENAI_API_KEY i miljövariabler.');
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error('OpenAI API error:', errorData);
    throw new Error(errorData?.error?.message || 'OpenAI API fel');
  }
  
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log('URL:', url);
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Ogiltig URL.' }, { status: 400 });
    }

    // 1. Hämta och extrahera text från sidan
    const text = await fetchAndExtractText(url);
    console.log('Text length:', text.length);

    // 2. Sammanfatta sidan med OpenAI
    const summaryPrompt = [
      { role: 'system', content: 'Du är en expert på marknadsföring och copywriting.' },
      { role: 'user', content: `Sammanfatta denna webbsida på max 5 meningar, på svenska:\n\n${text}` },
    ];
    const summary = await openaiChat(summaryPrompt);
    console.log('Summary generated');

    // 3. Generera billboard-idéer med OpenAI
    const ideaPrompt = [
      { role: 'system', content: 'Du är världens bästa marknadsförare och skapare av unika och uppseendeväckande billboardmotiv.' },
      { role: 'user', content: `Utgå från att du är världens bästa marknadsförare och skapare av unika och uppseendeväckande billboardmotiv. Du ska utgå från varje enskild kunds absoluta grund och att kunden verkligen ska känna någonting med företagets verksamhet. Det ska vara ett kort budskap då det är en billboard som är nära en väg, dvs. att budskapet måste gå att uppfattas först.\n\nHär är en sammanfattning av företagets verksamhet:\n${summary}\n\nGe exakt 2 kreativa, mycket korta och säljande förslag på billboard-budskap (på svenska). För varje förslag, ge:\n1. Slogan: Ett mycket kort, slagkraftigt budskap (max 12 ord)\n2. Beskrivning: En kort idé om bildens upplägg (på svenska, max 30 ord, ingen bildgenerering sker).\n3. Effekt: En kort förklaring (max 2 meningar) om hur budskapet träffar konsumentens känslor och köpkraft.\n\nSvara som en JSON-array med objekt: [{\"slogan\": \"...\", \"beskrivning\": \"...\", \"effekt\": \"...\"}, ...]` },
    ];
    const ideasJson = await openaiChat(ideaPrompt);
    let ideas: { slogan: string; beskrivning: string; effekt: string }[] = [];
    try {
      ideas = JSON.parse(ideasJson);
    } catch (e) {
      // fallback: extrahera manuellt om OpenAI inte svarar med JSON
      console.error('Failed to parse JSON, trying fallback');
      ideas = ideasJson.split(/\n|•|\d+\./).map((s: string) => {
        const [slogan, rest1] = s.split('Beskrivning:');
        const [beskrivning, effekt] = (rest1 || '').split('Effekt:');
        return { slogan: (slogan || '').trim(), beskrivning: (beskrivning || '').trim(), effekt: (effekt || '').trim() };
      }).filter((i: any) => i.slogan);
    }

    return NextResponse.json({ ideas });
  } catch (e: any) {
    console.error('Buzz idégeneratorn error:', e);
    
    if (e.message.includes('API key')) {
      return NextResponse.json({ 
        error: 'OpenAI API-nyckeln är inte konfigurerad. Kontakta support.' 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: e.message || 'Kunde inte generera idéer. Försök igen senare.' 
    }, { status: 500 });
  }
} 