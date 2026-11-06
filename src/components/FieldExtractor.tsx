import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Check, 
  X, 
  Plus, 
  Copy, 
  CheckCheck,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { ExtractedField, ProcessedDocument } from '../types';

interface FieldExtractorProps {
  document: ProcessedDocument;
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  onUpdateField: (updatedField: ExtractedField) => void;
  onAddField: (newField: ExtractedField) => void;
}

export const FieldExtractor: React.FC<FieldExtractorProps> = ({
  document,
  selectedFieldId,
  onSelectField,
  onUpdateField,
  onAddField,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editOriginal, setEditOriginal] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New field state
  const [newKeyEng, setNewKeyEng] = useState('');
  const [newKeyOrig, setNewKeyOrig] = useState('');
  const [newValEng, setNewValEng] = useState('');
  const [newValOrig, setNewValOrig] = useState('');
  const [newCategory, setNewCategory] = useState<ExtractedField['category']>('Identifier');

  const categories = ['All', 'Identifier', 'Citizen Info', 'Monetary', 'Date & Time', 'Department & Authority', 'Technical / Usage'];

  const filteredFields = document.fields.filter((f) => {
    const matchesCategory = categoryFilter === 'All' || f.category === categoryFilter;
    const matchesSearch = 
      f.keyEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.keyOriginal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.valueEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.valueOriginal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartEdit = (field: ExtractedField, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFieldId(field.id);
    setEditOriginal(field.valueOriginal);
    setEditEnglish(field.valueEnglish);
  };

  const handleSaveEdit = (field: ExtractedField, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateField({
      ...field,
      valueOriginal: editOriginal,
      valueEnglish: editEnglish,
      isEdited: true,
    });
    setEditingFieldId(null);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFieldId(null);
  };

  const handleCopy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyEng || !newValEng) return;

    const newField: ExtractedField = {
      id: `custom-${Date.now()}`,
      keyEnglish: newKeyEng,
      keyOriginal: newKeyOrig || newKeyEng,
      valueEnglish: newValEng,
      valueOriginal: newValOrig || newValEng,
      category: newCategory,
      confidence: 100,
      isEdited: true,
    };

    onAddField(newField);
    setIsAddingNew(false);
    setNewKeyEng('');
    setNewKeyOrig('');
    setNewValEng('');
    setNewValOrig('');
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(document.fields, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.id}_extracted_fields.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Key (English)', 'Key (Original Script)', 'Value (English)', 'Value (Original)', 'Normalized Value', 'Category', 'Confidence (%)'];
    const rows = document.fields.map(f => [
      `"${f.keyEnglish.replace(/"/g, '""')}"`,
      `"${f.keyOriginal.replace(/"/g, '""')}"`,
      `"${f.valueEnglish.replace(/"/g, '""')}"`,
      `"${f.valueOriginal.replace(/"/g, '""')}"`,
      `"${(f.valueNormalized || '').replace(/"/g, '""')}"`,
      `"${f.category}"`,
      f.confidence.toFixed(1)
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.id}_fields.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Structured Field Extraction</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
              {document.fields.length} Fields
            </span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Key-value pairs extracted by BharatGen Patram with normalized values and confidence.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Field</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Export as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Export as JSON"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search fields in English or Indic script..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inline Add Field Form */}
      {isAddingNew && (
        <form onSubmit={handleCreateField} className="p-3 bg-amber-500/5 border-b border-amber-500/20 text-xs">
          <div className="font-semibold text-amber-300 mb-2 flex items-center justify-between">
            <span>Add New Custom Field</span>
            <button type="button" onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Key Name (English) *"
              value={newKeyEng}
              onChange={(e) => setNewKeyEng(e.target.value)}
              required
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Key Name (Indic Script)"
              value={newKeyOrig}
              onChange={(e) => setNewKeyOrig(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Value (English) *"
              value={newValEng}
              onChange={(e) => setNewValEng(e.target.value)}
              required
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Value (Indic Script)"
              value={newValOrig}
              onChange={(e) => setNewValOrig(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 placeholder-slate-500"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-200 text-xs"
            >
              <option value="Identifier">Identifier</option>
              <option value="Citizen Info">Citizen Info</option>
              <option value="Monetary">Monetary</option>
              <option value="Date & Time">Date & Time</option>
              <option value="Department & Authority">Department & Authority</option>
              <option value="Technical / Usage">Technical / Usage</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded bg-amber-500 text-slate-950 font-bold"
              >
                Save Field
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Fields List / Table */}
      <div className="flex-1 overflow-auto divide-y divide-slate-800/60">
        {filteredFields.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No fields match your search or category filter.
          </div>
        ) : (
          filteredFields.map((field) => {
            const isSelected = selectedFieldId === field.id;
            const isEditing = editingFieldId === field.id;

            return (
              <div
                key={field.id}
                onClick={() => onSelectField(isSelected ? null : field.id)}
                className={`p-3 transition-colors cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-amber-500/10 border-l-4 border-l-amber-500'
                    : 'hover:bg-slate-800/40 border-l-4 border-l-transparent'
                }`}
              >
                {/* Field Top Row: Key and Category */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-200">
                      {field.keyEnglish}
                    </span>
                    <span className="text-slate-400 font-normal">
                      ({field.keyOriginal})
                    </span>
                    {field.isEdited && (
                      <span className="px-1.5 py-0.2 text-[9px] bg-blue-500/20 text-blue-300 rounded font-medium">
                        Edited
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Category pill */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {field.category}
                    </span>
                    {/* Confidence */}
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                      {field.confidence.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Field Value Row */}
                {isEditing ? (
                  <div className="space-y-2 mt-2 p-2 bg-slate-950 rounded border border-slate-700" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Value (Indic Script):</label>
                      <input
                        type="text"
                        value={editOriginal}
                        onChange={(e) => setEditOriginal(e.target.value)}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-100 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Value (English):</label>
                      <input
                        type="text"
                        value={editEnglish}
                        onChange={(e) => setEditEnglish(e.target.value)}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-100 text-xs"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={handleCancelEdit}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleSaveEdit(field, e)}
                        className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 space-y-0.5">
                      <div className="text-sm font-semibold text-slate-100 font-sans tracking-wide">
                        {field.valueOriginal}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{field.valueEnglish}</span>
                        {field.valueNormalized && (
                          <span className="text-[10px] text-slate-500 font-mono bg-slate-950/60 px-1.5 py-0.5 rounded">
                            Norm: {field.valueNormalized}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Action Icons */}
                    <div className="flex items-center gap-1 opacity-80 hover:opacity-100 shrink-0">
                      <button
                        onClick={(e) => handleCopy(`${field.valueEnglish} (${field.valueOriginal})`, field.id, e)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                        title="Copy Value"
                      >
                        {copiedId === field.id ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => handleStartEdit(field, e)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                        title="Edit Field"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
