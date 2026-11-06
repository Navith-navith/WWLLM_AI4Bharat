import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Download, 
  Layers, 
  Info,
  Check
} from 'lucide-react';
import { ProcessedDocument, ExtractedField, BoundingBox } from '../types';

interface DocumentViewerProps {
  document: ProcessedDocument;
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  highlightedBbox?: BoundingBox | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  selectedFieldId,
  onSelectField,
  highlightedBbox,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoom(1);

  // Category color mapper
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Identifier':
        return { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.18)', text: '#93c5fd' };
      case 'Citizen Info':
        return { border: '#a855f7', bg: 'rgba(168, 85, 247, 0.18)', text: '#d8b4fe' };
      case 'Monetary':
        return { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.22)', text: '#fde68a' };
      case 'Date & Time':
        return { border: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', text: '#a7f3d0' };
      case 'Department & Authority':
        return { border: '#f43f5e', bg: 'rgba(244, 63, 94, 0.18)', text: '#fecdd3' };
      default:
        return { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.18)', text: '#a5f3fc' };
    }
  };

  const handleDownloadDoc = () => {
    const link = window.document.createElement('a');
    link.href = document.previewUrl;
    link.download = `${document.id}.svg`;
    link.click();
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Viewer Control Toolbar */}
      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-[320px]">
            {document.title}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
            {document.language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition ${
              showBoxes
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle OCR Layout Bounding Boxes"
          >
            {showBoxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Boxes</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5"></div>

          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-slate-400 text-[11px] px-1 min-w-[38px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            title="Fit to View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5"></div>

          <button
            onClick={handleDownloadDoc}
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
            title="Download Document Asset"
          >
            {copiedNotification ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Document View Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-slate-950/90 relative p-4 flex items-center justify-center min-h-[520px]"
      >
        <div 
          className="relative transition-transform duration-150 ease-out shadow-2xl rounded-sm overflow-hidden"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center top',
            width: '100%',
            maxWidth: '750px',
            aspectRatio: '1000 / 1350'
          }}
        >
          {/* Base Document Image / SVG */}
          <img
            src={document.previewUrl}
            alt={document.title}
            className="w-full h-full object-contain pointer-events-none select-none bg-white"
          />

          {/* Interactive Bounding Box Overlay Layer */}
          {showBoxes && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 1000 1350"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* VQA Grounded Citation Box (Radar Pulse) */}
              {highlightedBbox && (
                <g>
                  <rect
                    x={highlightedBbox.xmin}
                    y={highlightedBbox.ymin}
                    width={highlightedBbox.xmax - highlightedBbox.xmin}
                    height={highlightedBbox.ymax - highlightedBbox.ymin}
                    fill="rgba(245, 158, 11, 0.25)"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray="6,3"
                    className="animate-pulse"
                  />
                  <circle
                    cx={highlightedBbox.xmin}
                    cy={highlightedBbox.ymin}
                    r="8"
                    fill="#f59e0b"
                  />
                  <text
                    x={highlightedBbox.xmin + 14}
                    y={highlightedBbox.ymin - 8}
                    fill="#fef08a"
                    fontSize="18"
                    fontWeight="800"
                    stroke="#000000"
                    strokeWidth="3"
                    paintOrder="stroke fill"
                  >
                    VQA Evidence Grounding
                  </text>
                </g>
              )}

              {/* Extracted Fields Bounding Boxes */}
              {document.fields.map((field) => {
                if (!field.bbox) return null;
                const isSelected = selectedFieldId === field.id;
                const isHovered = hoveredFieldId === field.id;
                const style = getCategoryColor(field.category);
                const width = Math.max(field.bbox.xmax - field.bbox.xmin, 20);
                const height = Math.max(field.bbox.ymax - field.bbox.ymin, 15);

                return (
                  <g
                    key={field.id}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredFieldId(field.id)}
                    onMouseLeave={() => setHoveredFieldId(null)}
                    onClick={() => onSelectField(isSelected ? null : field.id)}
                  >
                    {/* Bounding Box Rect */}
                    <rect
                      x={field.bbox.xmin}
                      y={field.bbox.ymin}
                      width={width}
                      height={height}
                      fill={isSelected || isHovered ? style.bg : 'rgba(255,255,255,0.01)'}
                      stroke={isSelected ? '#facc15' : isHovered ? style.border : style.border}
                      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
                      strokeDasharray={isSelected ? 'none' : '4,2'}
                      rx="3"
                    />

                    {/* Badge on Hover or Selection */}
                    {(isSelected || isHovered) && (
                      <g transform={`translate(${field.bbox.xmin}, ${Math.max(field.bbox.ymin - 26, 25)})`}>
                        <rect
                          x="0"
                          y="0"
                          width={Math.max(field.keyEnglish.length * 11 + 60, 160)}
                          height="24"
                          rx="4"
                          fill="#0f172a"
                          stroke={style.border}
                          strokeWidth="1.2"
                        />
                        <text
                          x="8"
                          y="16"
                          fill="#f8fafc"
                          fontSize="13"
                          fontWeight="700"
                          fontFamily="sans-serif"
                        >
                          {field.keyEnglish} ({field.confidence.toFixed(1)}%)
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Viewer Footer Status Bar */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Click any box or table row to cross-highlight visual grounding.</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            Fields Detected: <strong className="text-slate-200">{document.fields.length}</strong>
          </span>
          <span className="text-slate-400">
            Official Seals: <strong className="text-amber-400">{document.stampsAndSignaturesCount}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
