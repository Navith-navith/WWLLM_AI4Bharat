import React, { useState } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Languages, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { ProcessedDocument, ExtractedField, VQAMessage, BoundingBox } from './types';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { Header } from './components/Header';
import { DocumentViewer } from './components/DocumentViewer';
import { FieldExtractor } from './components/FieldExtractor';
import { DocumentVQA } from './components/DocumentVQA';
import { IndicTranslator } from './components/IndicTranslator';
import { BenchmarkDashboard } from './components/BenchmarkDashboard';
import { FailureAnalysisView } from './components/FailureAnalysisView';
import { DocumentationTab } from './components/DocumentationTab';
import { UploadModal } from './components/UploadModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'benchmark' | 'failure' | 'docs'>('studio');
  const [documents, setDocuments] = useState<ProcessedDocument[]>(SAMPLE_DOCUMENTS);
  const [currentDocId, setCurrentDocId] = useState<string>(SAMPLE_DOCUMENTS[0].id);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [highlightedBbox, setHighlightedBbox] = useState<BoundingBox | null>(null);
  const [studioRightTab, setStudioRightTab] = useState<'fields' | 'vqa' | 'translate'>('fields');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Current active document
  const currentDoc = documents.find((d) => d.id === currentDocId) || documents[0];

  const handleSelectSample = (doc: ProcessedDocument) => {
    setCurrentDocId(doc.id);
    setSelectedFieldId(null);
    setHighlightedBbox(null);
  };

  const handleUpdateField = (updatedField: ExtractedField) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== currentDoc.id) return doc;
        return {
          ...doc,
          fields: doc.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
        };
      })
    );
  };

  const handleAddField = (newField: ExtractedField) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== currentDoc.id) return doc;
        return {
          ...doc,
          fields: [newField, ...doc.fields],
        };
      })
    );
  };

  const handleAddVQAMessage = (msg: VQAMessage) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== currentDoc.id) return doc;
        return {
          ...doc,
          vqaHistory: [...doc.vqaHistory, msg],
        };
      })
    );
  };

  const handleDocumentAnalyzed = (newDoc: ProcessedDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDocId(newDoc.id);
    setSelectedFieldId(null);
    setHighlightedBbox(null);
    setActiveTab('studio');
    setStudioRightTab('fields');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sampleDocuments={documents}
        currentDoc={currentDoc}
        onSelectSample={handleSelectSample}
        onUploadClick={() => setIsUploadOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'studio' && (
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
            {/* Split Screen Studio Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[750px]">
              {/* Left Column: Interactive Document Canvas Viewer (7 cols) */}
              <div className="lg:col-span-7 flex flex-col h-[750px]">
                <DocumentViewer
                  document={currentDoc}
                  selectedFieldId={selectedFieldId}
                  onSelectField={(id) => {
                    setSelectedFieldId(id);
                    if (id) {
                      setStudioRightTab('fields');
                      setHighlightedBbox(null);
                    }
                  }}
                  highlightedBbox={highlightedBbox}
                />
              </div>

              {/* Right Column: Multi-tab Inspector (5 cols) */}
              <div className="lg:col-span-5 flex flex-col h-[750px] space-y-3">
                {/* Right Panel Sub-tab Navigator */}
                <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex items-center justify-between text-xs font-semibold">
                  <button
                    onClick={() => setStudioRightTab('fields')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                      studioRightTab === 'fields'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Fields ({currentDoc.fields.length})</span>
                  </button>

                  <button
                    onClick={() => setStudioRightTab('vqa')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                      studioRightTab === 'vqa'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>DocVQA</span>
                  </button>

                  <button
                    onClick={() => setStudioRightTab('translate')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition ${
                      studioRightTab === 'translate'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>IndicTrans2</span>
                  </button>
                </div>

                {/* Sub-tab view container */}
                <div className="flex-1 overflow-hidden">
                  {studioRightTab === 'fields' && (
                    <FieldExtractor
                      document={currentDoc}
                      selectedFieldId={selectedFieldId}
                      onSelectField={setSelectedFieldId}
                      onUpdateField={handleUpdateField}
                      onAddField={handleAddField}
                    />
                  )}

                  {studioRightTab === 'vqa' && (
                    <DocumentVQA
                      document={currentDoc}
                      onHighlightBbox={setHighlightedBbox}
                      onAddVQAMessage={handleAddVQAMessage}
                    />
                  )}

                  {studioRightTab === 'translate' && (
                    <IndicTranslator document={currentDoc} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quantitative Evaluation Suite */}
        {activeTab === 'benchmark' && (
          <BenchmarkDashboard />
        )}

        {/* Tab 3: Empirical Failure Analysis */}
        {activeTab === 'failure' && (
          <FailureAnalysisView />
        )}

        {/* Tab 4: Rubric & Dossier Docs */}
        {activeTab === 'docs' && (
          <DocumentationTab />
        )}
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAnalyzed={handleDocumentAnalyzed}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">PATRAM IndicDoc</span>
          <span>•</span>
          <span>CS3235 Undergraduate Mini-Project 3</span>
          <span>•</span>
          <span>Powered by BharatGen &amp; AI4Bharat</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Supported: 22 Scheduled Indian Languages</span>
          <span>•</span>
          <span>Patram-VLM 7B</span>
          <span>•</span>
          <span>IndicTrans2-1B</span>
        </div>
      </footer>
    </div>
  );
}
