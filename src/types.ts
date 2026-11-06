export type IndicLanguage = 
  | 'Hindi' 
  | 'Kannada' 
  | 'Tamil' 
  | 'Telugu' 
  | 'Marathi' 
  | 'Bengali' 
  | 'Gujarati' 
  | 'Malayalam' 
  | 'Punjabi' 
  | 'Odia' 
  | 'English'
  | 'Bilingual (Hindi/English)'
  | 'Bilingual (Kannada/English)'
  | 'Bilingual (Tamil/English)'
  | 'Bilingual (Marathi/English)';

export type DocumentCategory = 
  | 'Government Gazette / Notice'
  | 'Utility Bill (Electricity/Water)'
  | 'Land Revenue Record (7/12 / Khasra)'
  | 'Identity & Ration Card (PDS)'
  | 'Academic Certificate / Marksheet'
  | 'Court Notice & Legal Affidavit';

export interface BoundingBox {
  ymin: number; // 0 - 1000 normalized
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface ExtractedField {
  id: string;
  keyOriginal: string; // e.g. "ಖಾತೆ ಸಂಖ್ಯೆ" or "खाता संख्या"
  keyEnglish: string; // e.g. "Account Number"
  valueOriginal: string; // in native script
  valueEnglish: string; // translated
  valueNormalized?: string; // e.g. ISO date, numeric currency
  category: 'Identifier' | 'Citizen Info' | 'Monetary' | 'Date & Time' | 'Department & Authority' | 'Technical / Usage';
  confidence: number; // 0 - 100
  bbox?: BoundingBox;
  isEdited?: boolean;
}

export interface DocumentSummary {
  originalScriptSummary: string[];
  englishSummary: string[];
  romanizedTransliteration?: string[];
  documentTypeDetected: string;
  primaryLanguage: IndicLanguage;
  scriptFamily: 'Devanagari' | 'Dravidian' | 'Eastern Indic' | 'Western Indic' | 'Gurmukhi' | 'Latin / Bilingual';
  issuingAuthority: string;
  issueDate?: string;
  referenceNumber?: string;
}

export interface VQAMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query: string;
  queryLanguage?: string;
  answerOriginal: string;
  answerEnglish?: string;
  evidenceQuote?: string;
  groundedBbox?: BoundingBox;
  confidenceScore?: number;
  tokensUsed?: number;
}

export interface ProcessedDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  language: IndicLanguage;
  pageCount: number;
  fileSize: string;
  previewUrl: string; // data URL or SVG representation
  summary: DocumentSummary;
  fields: ExtractedField[];
  vqaHistory: VQAMessage[];
  suggestedQuestions: string[];
  stampsAndSignaturesCount: number;
  processingTimeMs: number;
}

export interface BenchmarkTestCase {
  id: string;
  title: string;
  documentType: DocumentCategory;
  language: IndicLanguage;
  script: string;
  quality: 'Clean High-DPI' | 'Moderate Mobile Scan' | 'Degraded / Skewed' | 'Stamp Occluded' | 'Faint Carbon Copy';
  totalGroundTruthFields: number;
  extractedFields: number;
  exactMatchAccuracy: number; // %
  f1Score: number; // %
  wer: number; // Word Error Rate %
  cer: number; // Character Error Rate %
  vqaAccuracy: number; // %
  latencyMs: number;
  status: 'passed' | 'warning' | 'failed';
  failureCategory?: 'Ligature Segmentation' | 'Stamp Occlusion' | 'Bilingual Layout Skew' | 'Faint Contrast' | 'None';
  failureDescription?: string;
  groundTruthSample?: {
    field: string;
    expected: string;
    predicted: string;
  };
}

export interface AggregateMetrics {
  totalTestCases: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  meanPrecision: number;
  meanRecall: number;
  meanF1: number;
  meanWER: number;
  meanCER: number;
  meanVqaAccuracy: number;
  avgLatencyMs: number;
}
