import React from 'react';
import { 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  BookOpen, 
  Languages, 
  Upload, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ProcessedDocument } from '../types';

interface HeaderProps {
  activeTab: 'studio' | 'benchmark' | 'failure' | 'docs';
  setActiveTab: (tab: 'studio' | 'benchmark' | 'failure' | 'docs') => void;
  sampleDocuments: ProcessedDocument[];
  currentDoc: ProcessedDocument;
  onSelectSample: (doc: ProcessedDocument) => void;
  onUploadClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  sampleDocuments,
  currentDoc,
  onSelectSample,
  onUploadClick,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner with Project Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold text-xl">
            प
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-100 tracking-tight font-serif">
                PATRAM <span className="text-amber-400 font-sans font-light">IndicDoc</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">
                BharatGen &amp; AI4Bharat
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Indian Document Understanding, OCR Field Extraction &amp; Multilingual VQA
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'studio'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'benchmark'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Quantitative Benchmark (40 TCs)</span>
          </button>

          <button
            onClick={() => setActiveTab('failure')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'failure'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Failure Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'docs'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rubric &amp; Dossier</span>
          </button>
        </nav>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Sub-bar for Document Studio: Quick Sample Document Selector */}
      {activeTab === 'studio' && (
        <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 overflow-x-auto text-xs">
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <span className="font-semibold text-slate-300">Sample Records:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            {sampleDocuments.map((doc) => {
              const isSelected = currentDoc.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => onSelectSample(doc)}
                  className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-medium'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {doc.title.split('(')[0].trim()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">VLM Engine:</span>
              <span className="text-amber-400 font-mono">Patram-VLM</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-[11px]">
              <Languages className="w-3 h-3 text-emerald-400" />
              <span className="text-slate-300">IndicTrans2:</span>
              <span className="text-emerald-400">22 Languages</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
