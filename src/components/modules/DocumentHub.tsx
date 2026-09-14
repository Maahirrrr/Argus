import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Share2,
  Copy,
  Check,
  FileText,
  Sparkles,
  ChevronRight,
  Terminal,
  Quote,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { DocumentItem, NavigationTab } from '../../types/argus';
import { DEMO_DOCUMENTS } from '../../data/demoData';

interface DocumentHubProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

const CATEGORIES = [
  { id: 'ALL', label: 'All Documents' },
  { id: 'PRD', label: 'PRDs & Specs' },
  { id: 'Strategy', label: 'Strategy & Vision' },
  { id: 'User Research', label: 'User Research' },
  { id: 'Post-Mortem', label: 'Incident RCAs' },
  { id: 'PM Framework', label: 'PM Playbooks' },
];

export const DocumentHub: React.FC<DocumentHubProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [docs, setDocs] = useState<DocumentItem[]>(DEMO_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(DEMO_DOCUMENTS[0]?.id || 'doc-001');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const selectedDoc = docs.find((d) => d.id === selectedDocId) || docs[0];

  const filteredDocs = useMemo(() => {
    return docs.filter((d) => {
      const matchCat =
        selectedCategory === 'ALL' ||
        d.category === selectedCategory ||
        d.type === selectedCategory;
      const textToMatch = `${d.title} ${d.excerpt || ''} ${d.content || ''} ${d.tags.join(' ')}`.toLowerCase();
      const matchSearch = textToMatch.includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [docs, selectedCategory, searchQuery]);

  // Toggle Checklist Items in Document
  const handleToggleItem = (sectionId: string, itemId: string) => {
    setDocs((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id !== selectedDoc.id || !doc.sections) return doc;
        return {
          ...doc,
          sections: doc.sections.map((sec) => {
            if (sec.id !== sectionId || !sec.items) return sec;
            return {
              ...sec,
              items: sec.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            };
          }),
        };
      })
    );
  };

  // Copy Full Document as Markdown
  const handleCopyMarkdown = () => {
    if (!selectedDoc) return;
    let md = `# ${selectedDoc.title}\n\n`;
    md += `> **Category**: ${selectedDoc.category || 'PRD'} | **Author**: ${selectedDoc.author} | **Version**: v${selectedDoc.version || '1.0'} | **Status**: ${selectedDoc.status || 'Draft'}\n\n`;
    if (selectedDoc.excerpt) md += `${selectedDoc.excerpt}\n\n---\n\n`;

    if (selectedDoc.sections) {
      selectedDoc.sections.forEach((sec) => {
        md += `## ${sec.title}\n\n`;
        if (sec.type === 'quote') {
          md += `> ${sec.content}\n\n`;
        } else if (sec.type === 'code') {
          md += `\`\`\`${sec.codeLanguage || ''}\n${sec.content}\n\`\`\`\n\n`;
        } else {
          md += `${sec.content}\n\n`;
        }
        if (sec.items && sec.items.length > 0) {
          sec.items.forEach((item) => {
            md += `- [${item.done ? 'x' : ' '}] ${item.text}\n`;
          });
          md += '\n';
        }
      });
    }

    navigator.clipboard?.writeText(md);
    setIsCopied(true);
    onShowToast('Markdown copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Create Doc from Template
  const handleCreateFromTemplate = (templateType: string, templateTitle: string, category: string) => {
    const newDocId = `doc-custom-${Date.now()}`;
    const newDoc: DocumentItem = {
      id: newDocId,
      title: templateTitle,
      category,
      type: templateTitle.split(':')[0],
      templateType: templateType as any,
      author: 'Product Manager',
      lastEdited: 'Just now',
      updatedAt: 'Today',
      version: '1.0',
      tags: [category, 'New', 'v1.0'],
      readTime: '4 min read',
      status: 'Draft',
      targetSprint: 'Sprint 43 (Planning)',
      excerpt: `Freshly instantiated ${templateTitle} spec ready for product requirements drafting.`,
      tableOfContents: [
        { id: 'sec-overview', title: '1. Executive Summary & Problem', level: 1 },
        { id: 'sec-goals', title: '2. Goals & Non-Goals', level: 1 },
        { id: 'sec-deliverables', title: '3. Technical Deliverables & Acceptance Checklist', level: 1 },
      ],
      sections: [
        {
          id: 'sec-overview',
          title: 'Executive Summary & Problem Statement',
          type: 'callout',
          content: `**Context**: Outline the strategic background and core customer frustration driving this initiative. What metrics are failing, and what is the quantified GMV or user impact?`,
        },
        {
          id: 'sec-goals',
          title: 'Goals & Explicit Non-Goals',
          type: 'prose',
          content: `### Measurable Goals\n1. Target metric outcome (e.g. +3.5% checkout success rate).\n2. p95 execution latency <500ms.\n\n### Explicit Non-Goals\n- Out of scope items for this version that engineering should not build.`,
        },
        {
          id: 'sec-deliverables',
          title: 'Technical Deliverables & Acceptance Checklist',
          type: 'checklist',
          content: 'Verification requirements before sign-off:',
          items: [
            { id: 't1', text: 'Architecture RFC reviewed with Tech Lead', done: false },
            { id: 't2', text: 'Telemetry metrics defined in ClickHouse event schema', done: false },
            { id: 't3', text: 'Security & idempotency threat model approved', done: false },
          ],
        },
      ],
    };

    setDocs((prev) => [newDoc, ...prev]);
    setSelectedDocId(newDocId);
    setIsTemplateModalOpen(false);
    onShowToast(`New ${templateTitle} created!`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">
              Product Knowledge & Spec Studio
            </h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Notion & Coda workspace for PRDs, Strategy 1-Pagers, Discovery Notes & PM Frameworks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Doc from Template</span>
          </button>
        </div>
      </div>

      {/* 2. Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Document Navigation & Library (4 cols) */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-3.5 space-y-3.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
            <input
              type="text"
              placeholder="Search specs, memos & frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-[#1D1D1D] focus:border-[#0066FF] pl-9 pr-3 py-1.5 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none placeholder:text-[#555]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 pb-1 border-b border-[#141414]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-1 text-[11px] font-mono-tech rounded-[2px] transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#0066FF] text-white font-medium'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Document Tree List */}
          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-0.5 scrollbar-thin">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono-tech text-[#666]">
                No documents matching filters.
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const isSelected = doc.id === selectedDoc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 rounded-[2px] border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-[#121212] border-[#0066FF]/60 shadow-sm'
                        : 'bg-[#0E0E0E] border-[#181818] hover:border-[#282828] hover:bg-[#111]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[9px] font-mono-tech uppercase font-bold px-1.5 py-0.2 rounded-[2px] ${
                          doc.category === 'PRD'
                            ? 'bg-[#0066FF]/20 text-[#0066FF]'
                            : doc.category === 'Strategy'
                            ? 'bg-amber-950/40 text-amber-400'
                            : doc.category === 'PM Framework'
                            ? 'bg-purple-950/40 text-purple-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {doc.type || doc.category || 'DOC'}
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#666]">
                        {doc.lastEdited}
                      </span>
                    </div>

                    <h3
                      className={`text-xs font-sans font-medium line-clamp-2 leading-snug transition-colors ${
                        isSelected ? 'text-white font-semibold' : 'text-[#CCC] group-hover:text-white'
                      }`}
                    >
                      {doc.title}
                    </h3>

                    <p className="text-[11px] text-[#777] line-clamp-2 mt-1 leading-relaxed">
                      {doc.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#181818] text-[10px] font-mono-tech text-[#666]">
                      <span className="truncate max-w-[120px]">{doc.author.split(' ')[0]}</span>
                      {doc.status && (
                        <span
                          className={`px-1.5 py-0.2 rounded-[2px] ${
                            doc.status === 'Approved'
                              ? 'text-emerald-400 bg-emerald-950/30'
                              : 'text-amber-400 bg-amber-950/30'
                          }`}
                        >
                          {doc.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Full Notion Reading & Interactive Spec Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-6 sm:p-8 space-y-6">
          {/* Canvas Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A]">
              <span>Docs</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#444]" />
              <span className="text-[#CCC]">{selectedDoc.category || 'PRD'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#444]" />
              <span className="text-white font-medium truncate max-w-[200px]">
                {selectedDoc.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#CCC] hover:text-white rounded-[2px] transition-colors"
                title="Copy entire document as Markdown"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied MD' : 'Copy MD'}</span>
              </button>

              <button
                onClick={() => {
                  onShowToast('Exporting PRD requirements to Sprint Backlog...');
                  onNavigateTab('sprints');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] rounded-[2px] transition-colors"
                title="Convert PRD requirements into Jira/Linear engineering tickets"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Export to Sprints</span>
              </button>

              <button
                onClick={() => onShowToast('Document link copied to clipboard.')}
                className="p-1 hover:bg-[#1D1D1D] text-[#8A8A8A] hover:text-white rounded-[2px]"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[2px] bg-[#141414] border border-[#262626] flex items-center justify-center text-[#0066FF]">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono-tech text-[#8A8A8A]">
                v{selectedDoc.version || '1.0'} · Updated {selectedDoc.lastEdited}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight">
              {selectedDoc.title}
            </h1>

            {/* Properties Bar (Notion Style Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 bg-[#111] rounded-[2px] border border-[#1A1A1A] text-xs font-mono-tech">
              <div>
                <span className="text-[10px] text-[#666] block">Status</span>
                <span className="font-medium text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  {selectedDoc.status || 'Approved'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#666] block">Author</span>
                <span className="text-[#CCC] truncate block mt-0.5">
                  {selectedDoc.author}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#666] block">Target Release</span>
                <span className="text-[#0066FF] block mt-0.5">
                  {selectedDoc.targetSprint || 'Sprint 42 (Active)'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#666] block">Read Time</span>
                <span className="text-[#888] block mt-0.5">
                  {selectedDoc.readTime || '6 min read'}
                </span>
              </div>
            </div>

            {/* Tags strip */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedDoc.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono-tech text-[#8A8A8A] bg-[#141414] border border-[#222] px-2 py-0.5 rounded-[2px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Table of Contents Pill Bar */}
          {selectedDoc.tableOfContents && selectedDoc.tableOfContents.length > 0 && (
            <div className="p-3 bg-[#0E0E0E] rounded-[2px] border border-[#181818] space-y-1.5">
              <span className="text-[10px] font-mono-tech uppercase font-bold text-[#666] block">
                Table of Contents
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono-tech">
                {selectedDoc.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[#8A8A8A] hover:text-[#0066FF] transition-colors flex items-center gap-1 bg-[#141414] px-2 py-0.5 rounded-[2px]"
                  >
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Document Content Sections */}
          <div className="space-y-6 pt-2">
            {selectedDoc.sections && selectedDoc.sections.length > 0 ? (
              selectedDoc.sections.map((section) => (
                <div key={section.id} id={section.id} className="space-y-3 pt-2">
                  <h3 className="text-base font-bold font-display text-white border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                    {section.title}
                  </h3>

                  {/* Callout Block */}
                  {section.type === 'callout' && (
                    <div className="p-4 bg-[#0066FF]/8 border-l-2 border-[#0066FF] rounded-[2px] text-xs font-sans text-[#E0E0E0] leading-relaxed space-y-2">
                      <p className="whitespace-pre-line">{section.content}</p>
                    </div>
                  )}

                  {/* Quote Block */}
                  {section.type === 'quote' && (
                    <div className="p-4 bg-[#141414] border-l-2 border-[#8A8A8A] rounded-[2px] text-xs font-sans italic text-[#CCC] leading-relaxed flex items-start gap-3">
                      <Quote className="w-5 h-5 text-[#666] flex-shrink-0 mt-0.5" />
                      <p className="whitespace-pre-line">{section.content}</p>
                    </div>
                  )}

                  {/* Code Block */}
                  {section.type === 'code' && (
                    <div className="bg-[#050505] border border-[#1D1D1D] rounded-[2px] overflow-hidden">
                      <div className="bg-[#0D0D0D] px-3 py-1.5 border-b border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono-tech text-[#777]">
                        <span>{section.codeLanguage || 'code'}</span>
                        <Terminal className="w-3 h-3 text-[#555]" />
                      </div>
                      <pre className="p-4 text-xs font-mono-tech text-emerald-400 overflow-x-auto leading-relaxed">
                        <code>{section.content}</code>
                      </pre>
                    </div>
                  )}

                  {/* Table Block */}
                  {section.type === 'table' && (
                    <div className="overflow-x-auto border border-[#1D1D1D] rounded-[2px]">
                      <div className="p-3 bg-[#0D0D0D] text-xs font-mono-tech text-[#CCC] whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  )}

                  {/* Prose Block */}
                  {(section.type === 'prose' || !section.type) && (
                    <div className="text-xs font-sans text-[#CCC] leading-relaxed whitespace-pre-line space-y-2">
                      <p>{section.content}</p>
                    </div>
                  )}

                  {/* Checklist Items */}
                  {section.items && section.items.length > 0 && (
                    <div className="space-y-1.5 bg-[#0E0E0E] p-3 rounded-[2px] border border-[#181818]">
                      {section.items.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-2.5 p-1 hover:bg-[#141414] rounded-[2px] cursor-pointer text-xs font-mono-tech transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleItem(section.id, item.id)}
                            className="mt-0.5 accent-[#0066FF]"
                          />
                          <span
                            className={`leading-relaxed ${
                              item.done ? 'line-through text-[#666]' : 'text-[#CCC]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-xs font-sans text-[#AAA] leading-relaxed whitespace-pre-line">
                {selectedDoc.content}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. New Document from Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] w-full max-w-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-sm font-bold font-display text-white">
                  Create Document from PM Industry Template
                </h3>
              </div>
              <button onClick={() => setIsTemplateModalOpen(false)} className="text-[#888] hover:text-white">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto">
              {[
                {
                  type: 'amazon_prfaq',
                  title: 'Amazon PR/FAQ Spec',
                  category: 'PRD',
                  desc: 'Working backwards press release, customer quotes, and operational FAQ. Best for bold new zero-to-one product initiatives.',
                },
                {
                  type: 'stripe_prd',
                  title: 'Stripe Engineering PRD',
                  category: 'PRD',
                  desc: 'Crisp, API-first technical PRD with state machine transitions, idempotency contracts, and error code taxonomy.',
                },
                {
                  type: 'strategy_1pager',
                  title: 'Product Strategy 1-Pager',
                  category: 'Strategy',
                  desc: 'Executive-level strategic alignment memo with core thesis, competitive moats, strategic pillars, and explicit non-goals.',
                },
                {
                  type: 'customer_discovery',
                  title: 'Customer Discovery Synthesis',
                  category: 'User Research',
                  desc: 'Structured Jobs-To-Be-Done (JTBD) synthesis template with pain frequency, verbatim customer quotes, and opportunity sizing.',
                },
                {
                  type: 'incident_postmortem',
                  title: 'Severity-1 Incident Post-Mortem',
                  category: 'Post-Mortem',
                  desc: 'Blameless root cause analysis (5 Whys), outage timeline, customer blast radius, and preventative engineering action items.',
                },
                {
                  type: 'pm_framework',
                  title: 'PM Operating Playbook & Frameworks',
                  category: 'PM Framework',
                  desc: 'Hands-on guide covering RICE prioritization, Kano classification, CIRCLES interview design, and daily operating rituals.',
                },
              ].map((template) => (
                <div
                  key={template.type}
                  onClick={() =>
                    handleCreateFromTemplate(
                      template.type,
                      `${template.title}: Untitled Initiative`,
                      template.category
                    )
                  }
                  className="p-3.5 bg-[#111] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF] rounded-[2px] transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-display text-white group-hover:text-[#0066FF] transition-colors">
                      {template.title}
                    </span>
                    <span className="text-[9px] font-mono-tech text-[#888] bg-[#1A1A1A] px-1.5 py-0.2 rounded-[2px]">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777] leading-relaxed">
                    {template.desc}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] font-mono-tech text-[#0066FF] group-hover:underline">
                    <span>Use Template</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#1D1D1D]">
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="px-3 py-1.5 text-xs font-mono-tech text-[#888] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
