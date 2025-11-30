const API_URL =
  import.meta.env.VITE_BTRBOT_API_URL || 'https://api.btrbot.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_BTRBOT_API_KEY || 'not-needed';
const MODEL = import.meta.env.VITE_BTRBOT_MODEL || 'qwen2.5:32b';

const SYSTEM_INSTRUCTION = `
You are a creative writing assistant designed to rewrite dialogue for characters with specific personality traits.
Your task is to rewrite the user's input sentence to match a specific "Persona Level" from -4 to +4.

Levels:
-4 (Self-loathing): Apologetic, pathetic, thinks they are a burden, attributes success to luck.
-3 (Very Humble): Extremely soft-spoken, downplays all achievements, very deferential.
-2 (Modest): Shares credit, uses soft qualifiers ("we", "maybe"), avoids spotlight.
-1 (Polite): Reserved, respectful, slightly understated.
0 (Neutral): Factual, objective, journalistic style.
+1 (Confident): Self-assured, clear, professional, ownership of success.
+2 (Proud): Boastful, strong verbs, highlights personal skill.
+3 (Arrogant): Condescending, superior, dismissive of others.
+4 (God Complex): Delusional, refers to self as supreme/deity, treats others as ants.

Maintain the core meaning of the original sentence, but completely overhaul the vocabulary and tone to match the persona.
Return ONLY the transformed text. Do not add quotes or explanations.
`.trim();

const extractContent = (payload: any): string => {
  const choice = payload?.choices?.[0];
  if (!choice) return '';

  const message = choice.message || choice.delta;
  const content = message?.content;

  if (!content) return '';

  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part) return '';
        if (typeof part === 'string') return part;
        return part.text || part.content || '';
      })
      .join('')
      .trim();
  }

  if (typeof content === 'object') {
    return (content.text || content.content || '').trim();
  }

  return '';
};

export const transformText = async (text: string, level: number): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: `Target Persona Level: ${level}\nOriginal Text: "${text}"` }
        ]
      })
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        payload?.error?.message ||
        payload?.error ||
        payload?.message ||
        'Could not transform text. Please try again.';
      throw new Error(message);
    }

    const transformed = extractContent(payload);

    if (!transformed) {
      throw new Error('No response generated. Please try again.');
    }

    return transformed;
  } catch (error: any) {
    console.error('BtrBot API Error:', error);
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Could not transform text. Please try again.');
  }
};
