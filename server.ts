import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Helper to get GoogleGenAI client
function getGenAIClient(customKey?: string) {
  const apiKey = customKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Check API status
app.get('/api/status', (req, res) => {
  const hasEnvKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '' && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    hasEnvKey,
    model: 'gemini-2.5-flash',
  });
});

// Explain topic endpoint
app.post('/api/explain', async (req, res) => {
  try {
    const { topicTitle, category, difficulty, mode, userApiKey } = req.body;
    const ai = getGenAIClient(userApiKey);

    if (!ai) {
      return res.status(401).json({
        error: 'NO_API_KEY',
        message: 'No Gemini API key detected. Please configure GEMINI_API_KEY or paste your key in the settings modal.',
      });
    }

    let modeInstruction = '';
    if (mode === 'analogy') {
      modeInstruction = `
Tone & Style: ANALOGY MODE.
Your primary mission is to explain everything using vivid, relatable, unforgettable real-world physical analogies (e.g. restaurant kitchens, libraries, airport baggage handling, postal networks, car engines, orchestra conductors, mechanical clockworks).
Keep the technical jargon minimal, and anchor every concept to tangible everyday objects and actions.
      `;
    } else if (mode === 'layman') {
      modeInstruction = `
Tone & Style: LAYMAN / SIMPLE MODE.
Explain clearly in plain English as if explaining to a curious high school student or business professional.
Avoid mathematical formulas and deep academic jargon. Use intuitive explanations, clear examples, and direct prose.
      `;
    } else {
      modeInstruction = `
Tone & Style: TECHNICAL DEEP-DIVE MODE.
Provide rigorous, technically precise explanations suitable for senior machine learning engineers and AI researchers.
Include mathematical intuition, architectural diagrams described in text/ASCII, algorithmic steps, hyperparameter considerations, runtime trade-offs, and code or pseudocode snippets where relevant.
      `;
    }

    const systemInstruction = `You are the lead author of the definitive "AI Encyclopedia".
Your task is to explain the topic "${topicTitle}" (Category: ${category}, Difficulty: ${difficulty}) strictly in "${mode}" mode.
${modeInstruction}

You must return a valid JSON object matching the exact schema requested. Do not include markdown code block backticks outside the JSON.`;

    const prompt = `Generate a comprehensive, engaging, multi-part encyclopedic entry for the AI concept "${topicTitle}".
Cover all 5 core FAQ sections thoroughly:
1. What is it?
2. How does it actually work?
3. The Core Analogy (with a distinct title, rich narrative, and component breakdown mapping real-world to AI concepts)
4. Common Pitfalls & Misconceptions (list 2-3 genuine misconceptions and their counter-intuitive realities)
5. Where is this used in real production systems? (list 2-3 concrete real-world companies or production systems and how they use it)
Also provide 3 concise key takeaways, and if in technical mode, a relevant code snippet or architecture snippet.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topicTitle: { type: Type.STRING },
            mode: { type: Type.STRING },
            summary: { type: Type.STRING, description: '1-2 sentence high impact summary' },
            whatIsIt: { type: Type.STRING, description: 'Comprehensive explanation answering What is it?' },
            howItWorks: { type: Type.STRING, description: 'Step-by-step breakdown answering How does it actually work?' },
            coreAnalogy: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: 'Memorable title for the analogy, e.g. "The Gourmet Kitchen Expediter"' },
                story: { type: Type.STRING, description: 'The narrative analogy story explaining the concept' },
                breakdown: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      realWorld: { type: Type.STRING, description: 'The real-world counterpart' },
                      aiConcept: { type: Type.STRING, description: 'The corresponding AI mechanism' },
                    },
                    required: ['realWorld', 'aiConcept'],
                  },
                },
              },
              required: ['title', 'story', 'breakdown'],
            },
            pitfalls: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  misconception: { type: Type.STRING, description: 'Common myth or flawed belief' },
                  reality: { type: Type.STRING, description: 'The actual technical or practical reality' },
                },
                required: ['misconception', 'reality'],
              },
            },
            productionUse: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING, description: 'Overview of industry adoption' },
                examples: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      companyOrCase: { type: Type.STRING, description: 'E.g. Netflix, ChatGPT, GitHub Copilot, Tesla' },
                      application: { type: Type.STRING, description: 'How it is utilized in production' },
                    },
                    required: ['companyOrCase', 'application'],
                  },
                },
              },
              required: ['summary', 'examples'],
            },
            technicalSnippet: {
              type: Type.STRING,
              description: 'Optional code snippet, mathematical formula, or ASCII architecture flow if relevant',
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 punchy bullet point takeaways',
            },
          },
          required: ['whatIsIt', 'howItWorks', 'coreAnalogy', 'pitfalls', 'productionUse', 'keyTakeaways'],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating explanation:', error);
    return res.status(500).json({
      error: 'GENERATION_FAILED',
      message: error?.message || 'Failed to generate explanation from Gemini API',
    });
  }
});

// Ask follow-up question endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { topicTitle, question, mode, userApiKey, currentSummary } = req.body;
    const ai = getGenAIClient(userApiKey);

    if (!ai) {
      return res.status(401).json({
        error: 'NO_API_KEY',
        message: 'No Gemini API key detected. Please configure GEMINI_API_KEY or paste your key in the settings modal.',
      });
    }

    const modePrompt = mode === 'analogy'
      ? 'Answer using a vivid, intuitive real-world analogy.'
      : mode === 'layman'
      ? 'Answer in plain, simple, jargon-free English for a general audience.'
      : 'Answer with technical precision, engineering depth, and mathematical or architectural exactness.';

    const prompt = `Topic context: "${topicTitle}".
Current summary context: "${currentSummary || topicTitle}".
Follow-up Question from user: "${question}".

Mode requirement: ${modePrompt}
Please provide an insightful, highly engaging, and structured answer (around 150-250 words) that addresses this exact question directly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an AI Encyclopedia conversational expert. Provide a direct, crystal-clear answer strictly aligned with the requested mode (${mode}). Format with clean markdown headers and bullet points if appropriate.`,
      },
    });

    return res.json({
      success: true,
      answer: response.text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error answering follow-up:', error);
    return res.status(500).json({
      error: 'FOLLOW_UP_FAILED',
      message: error?.message || 'Failed to answer question from Gemini API',
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
