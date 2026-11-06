import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase JSON payload limit to handle base64 images and PDFs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Server-side Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Patram IndicDoc Server',
    model: 'gemini-3.8-flash',
    features: ['BharatGen Patram VLM', 'AI4Bharat IndicTrans2', 'DocVQA', 'Field Extraction']
  });
});

// Endpoint: Analyze Document (OCR, Field Extraction, Summary, Layout Parsing)
app.post('/api/document/analyze', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/png', languageHint = 'Auto-detect', categoryHint } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body.' });
    }

    // Clean base64 string if data URL prefix was included
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    const systemInstruction = `You are BharatGen Patram, a state-of-the-art sovereign Indian Vision-Language Model specialized in Indian document understanding (OCR, bilingual layouts, stamps, seals, ligatures, and key-value field extraction).
Your task is to analyze the uploaded Indian notice, form, gazette, utility bill, land record, or certificate.
Languages covered: Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati, Malayalam, Punjabi, Odia, English.

Extract the following in strictly structured JSON:
1. documentTypeDetected: Exact specific document type (e.g., "Karnataka BESCOM Electricity Bill", "Uttar Pradesh Khasra-Khatauni 7/12", "Tamil Nadu Smart Ration Card PHH").
2. primaryLanguage: Primary language (Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati, Malayalam, Punjabi, Odia, or Bilingual).
3. scriptFamily: Devanagari, Dravidian, Eastern Indic, Western Indic, Gurmukhi, or Latin / Bilingual.
4. issuingAuthority: Name of the government department, board, or organization.
5. referenceNumber: Primary reference or registration ID if present.
6. issueDate: Date of document or issue.
7. originalScriptSummary: 3-4 bullet points summarizing the document in the native Indian script.
8. englishSummary: 3-4 bullet points summarizing the document in clear English.
9. romanizedTransliteration: 2-3 bullet points with IAST / Romanized transliteration.
10. fields: Array of structured key-value items with:
    - id: unique string (e.g. "f1")
    - keyOriginal: field name in original Indian script
    - keyEnglish: field name in English
    - valueOriginal: value in original script
    - valueEnglish: translated/transliterated value in English
    - valueNormalized: standardized formatted value (e.g. ISO date, plain number, currency amount)
    - category: 'Identifier' | 'Citizen Info' | 'Monetary' | 'Date & Time' | 'Department & Authority' | 'Technical / Usage'
    - confidence: number between 85 and 99.9
    - bbox: bounding box object with ymin, xmin, ymax, xmax normalized from 0 to 1000.
11. stampsAndSignaturesCount: count of detected rubber stamps, seals, or signatures.
12. suggestedQuestions: 4 relevant, natural questions a user would ask about this document.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType.includes('pdf') ? 'application/pdf' : mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `Analyze this Indian document thoroughly. Language hint: ${languageHint}. Category hint: ${categoryHint || 'Auto-detect'}. Return the JSON object matching the specification.`,
          },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean potential markdown wrap
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Document analysis error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze Indian document.',
    });
  }
});

// Endpoint: Document Visual Question Answering (DocVQA)
app.post('/api/document/vqa', async (req: Request, res: Response) => {
  try {
    const {
      query,
      queryLanguage = 'English',
      documentContext,
      imageBase64,
      mimeType = 'image/png',
    } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter.' });
    }

    const systemInstruction = `You are BharatGen Patram Document VQA engine. You answer user questions strictly based on the provided Indian document image and structured context.
Follow these rules:
1. Provide a direct, factual answer in the language requested (or original document script if query is in native script).
2. Also provide an English translation of the answer.
3. Quote the exact evidence snippet found on the document.
4. Estimate bounding box coordinates of the evidence on the document (ymin, xmin, ymax, xmax from 0 to 1000).
5. Confidence score between 80 and 99.9.
Return JSON with keys:
- answerOriginal: string
- answerEnglish: string
- evidenceQuote: string
- groundedBbox: { ymin, xmin, ymax, xmax }
- confidenceScore: number`;

    const parts: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    parts.push({
      text: `Document Context Metadata:\n${JSON.stringify(documentContext, null, 2)}\n\nUser Question (${queryLanguage}): "${query}"\nAnswer grounded accurately in the document visual/textual data.`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let parsedVQA;
    try {
      parsedVQA = JSON.parse(responseText);
    } catch {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedVQA = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      data: parsedVQA,
    });
  } catch (error: any) {
    console.error('DocVQA error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to process Document VQA.',
    });
  }
});

// Endpoint: AI4Bharat IndicTrans2 Translation
app.post('/api/document/translate', async (req: Request, res: Response) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Missing text or targetLanguage.' });
    }

    const systemInstruction = `You are AI4Bharat IndicTrans2, the state-of-the-art multilingual machine translation system for Indian languages.
Translate the text faithfully preserving official governmental, legal, and administrative terminology used in Indian government notices, land records, utility bills, and certificates.
Return JSON with key:
- translatedText: string
- sourceLanguageDetected: string
- targetLanguage: string
- pronunciationGuide: optional Romanized phonetic string`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Translate from ${sourceLanguage || 'auto-detect'} to ${targetLanguage}:\n\n"${text}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to translate via IndicTrans2.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Patram IndicDoc] Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
