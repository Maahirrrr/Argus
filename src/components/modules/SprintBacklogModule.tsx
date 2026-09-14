import React, { useState, useMemo } from 'react';
import {
  Columns,
  List,
  Plus,
  Search,
  CheckCircle2,
  Bookmark,
  Bug,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  X,
  ExternalLink,
  FileText,
  GitPullRequest,
} from 'lucide-react';
import type { SprintIssue, Sprint, NavigationTab } from '../../types/argus';
import { DEMO_SPRINT_ISSUES, DEMO_SPRINTS } from '../../data/demoData';

interface SprintBacklogModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

const COLUMNS: { id: SprintIssue['status']; label: string; dotColor: string }[] = [
  { id: 'backlog', label: 'Backlog', dotColor: 'bg-zinc-500' },
  { id: 'todo', label: 'To Do', dotColor: 'bg-[#0066FF]' },
  { id: 'in_progress', label: 'In Progress', dotColor: 'bg-amber-500' },
  { id: 'in_review', label: 'In Review', dotColor: 'bg-purple-500' },
  { id: 'done', label: 'Done', dotColor: 'bg-emerald-500' },
];

const ASSIGNEES = [
  { name: 'Vikram Seth', avatar: 'VS', role: 'Staff Backend Eng' },
  { name: 'Priya Kulkarni', avatar: 'PK', role: 'Senior Systems Eng' },
  { name: 'Aman Ray', avatar: 'AR', role: 'Payment Platform Lead' },
  { name: 'Sneha Mohan', avatar: 'SM', role: 'Frontend & SDK Eng' },
];

export const SprintBacklogModule: React.FC<SprintBacklogModuleProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [issues, setIssues] = useState<SprintIssue[]>(DEMO_SPRINT_ISSUES);
  const [sprints] = useState<Sprint[]>(DEMO_SPRINTS);
  const [viewMode, setViewMode] = useState<'board' | 'backlog'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'P0' | 'P1' | 'P2'>('ALL');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('ALL');
  const [selectedIssue, setSelectedIssue] = useState<SprintIssue | null>(null);
  const [isPrdImportModalOpen, setIsPrdImportModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Issue Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<SprintIssue['type']>('story');
  const [newPriority, setNewPriority] = useState<SprintIssue['priority']>('P1');
  const [newPoints, setNewPoints] = useState<number>(3);
  const [newSprint, setNewSprint] = useState<string>('Sprint 42 (Active)');
  const [newAssigneeName, setNewAssigneeName] = useState('Vikram Seth');

  // Active Sprint Stats
  const activeSprint = sprints.find((s) => s.status === 'active') || sprints[0];
  const activeIssues = issues.filter((i) => i.sprint === activeSprint.name);
  const completedPoints = activeIssues
    .filter((i) => i.status === 'done')
    .reduce((sum, i) => sum + i.points, 0);
  const totalPoints = activeIssues.reduce((sum, i) => sum + i.points, 0);
  const completionPercent = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  // Filtered Issues
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchSearch =
        issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (issue.epicTitle && issue.epicTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPriority = priorityFilter === 'ALL' || issue.priority === priorityFilter;
      const matchAssignee = assigneeFilter === 'ALL' || issue.assignee.name === assigneeFilter;
      return matchSearch && matchPriority && matchAssignee;
    });
  }, [issues, searchQuery, priorityFilter, assigneeFilter]);

  // Status transitions
  const moveIssueStatus = (issueId: string, direction: 'forward' | 'backward') => {
    const statusOrder: SprintIssue['status'][] = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== issueId) return item;
        const currentIndex = statusOrder.indexOf(item.status);
        const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < statusOrder.length) {
          const nextStatus = statusOrder[nextIndex];
          onShowToast(`${item.id} moved to ${nextStatus.replace('_', ' ').toUpperCase()}`);
          return { ...item, status: nextStatus, updatedAt: 'Just now' };
        }
        return item;
      })
    );
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue((prev) => {
        if (!prev) return null;
        const currentIndex = statusOrder.indexOf(prev.status);
        const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < statusOrder.length) {
          return { ...prev, status: statusOrder[nextIndex], updatedAt: 'Just now' };
        }
        return prev;
      });
    }
  };

  // Toggle Acceptance Criteria Checklist
  const toggleCriterion = (issueId: string, criterionId: string) => {
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== issueId) return item;
        const updatedCriteria = item.acceptanceCriteria.map((c) =>
          c.id === criterionId ? { ...c, completed: !c.completed } : c
        );
        return { ...item, acceptanceCriteria: updatedCriteria };
      })
    );
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          acceptanceCriteria: prev.acceptanceCriteria.map((c) =>
            c.id === criterionId ? { ...c, completed: !c.completed } : c
          ),
        };
      });
    }
  };

  // Quick Create Issue
  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assignee = ASSIGNEES.find((a) => a.name === newAssigneeName) || ASSIGNEES[0];
    const newId = `ARG-${100 + issues.length + 1}`;

    const newIssue: SprintIssue = {
      id: newId,
      title: newTitle.trim(),
      description: 'Created via Sprint Execution Workbench.',
      type: newType,
      status: 'todo',
      priority: newPriority,
      points: newPoints,
      assignee,
      sprint: newSprint,
      acceptanceCriteria: [
        { id: `ac-${Date.now()}`, text: 'Core functionality verified and unit tests passing', completed: false },
      ],
      createdAt: 'Today',
      updatedAt: 'Just now',
    };

    setIssues((prev) => [newIssue, ...prev]);
    setNewTitle('');
    setIsCreateModalOpen(false);
    onShowToast(`Ticket ${newId} created in ${newSprint}`);
  };

  // Import PRD Requirements to Tickets
  const handleImportPrdRequirements = () => {
    const prdTickets: SprintIssue[] = [
      {
        id: `ARG-${100 + issues.length + 1}`,
        title: 'PRD Spec: Autonomous HDFC circuit breaker with sub-450ms trigger',
        description: 'Automatic traffic rerouting to secondary ICICI switch when error rate exceeds 4.5% over 60s.',
        type: 'story',
        status: 'todo',
        priority: 'P0',
        points: 8,
        assignee: ASSIGNEES[1],
        epicId: 'EPIC-1',
        epicTitle: 'Gateway Resiliency',
        sprint: 'Sprint 42 (Active)',
        acceptanceCriteria: [
          { id: 'ac-p1', text: 'Circuit trips to open state when error threshold breached', completed: false },
          { id: 'ac-p2', text: 'Auto half-open recovery after 180s cooldown window', completed: false },
        ],
        linkedPrdId: 'PRD-2026-041',
        createdAt: 'Today',
        updatedAt: 'Just now',
      },
      {
        id: `ARG-${100 + issues.length + 2}`,
        title: 'PRD Spec: Redis cluster distributed lock for double-debit prevention',
        description: 'Acquire atomic Redis mutex with 120s TTL on checkout intent creation.',
        type: 'story',
        status: 'todo',
        priority: 'P0',
        points: 5,
        assignee: ASSIGNEES[0],
        epicId: 'EPIC-1',
        epicTitle: 'Gateway Resiliency',
        sprint: 'Sprint 42 (Active)',
        acceptanceCriteria: [
          { id: 'ac-p3', text: 'Return HTTP 409 Conflict with cached payload on duplicate key', completed: false },
          { id: 'ac-p4', text: 'Sustain 10,000 req/sec benchmark in load testing', completed: false },
        ],
        linkedPrdId: 'PRD-2026-041',
        createdAt: 'Today',
        updatedAt: 'Just now',
      },
      {
        id: `ARG-${100 + issues.length + 3}`,
        title: 'PRD Spec: Client SDK contextual retry drawer with backoff jitter',
        description: 'Provide 1-tap retry UI modal when gateway returns 504 timeout.',
        type: 'story',
        status: 'todo',
        priority: 'P1',
        points: 5,
        assignee: ASSIGNEES[3],
        epicId: 'EPIC-3',
        epicTitle: 'Checkout UX',
        sprint: 'Sprint 42 (Active)',
        acceptanceCriteria: [
          { id: 'ac-p5', text: 'Modal mounts within 100ms without discarding cart context', completed: false },
        ],
        linkedPrdId: 'PRD-2026-041',
        createdAt: 'Today',
        updatedAt: 'Just now',
      },
    ];

    setIssues((prev) => [...prdTickets, ...prev]);
    setIsPrdImportModalOpen(false);
    onShowToast('3 PRD specifications exported into Sprint 42 backlog!');
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* 1. Header & Sprint Status Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <Columns className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">
                Sprint Execution & Backlog
              </h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Jira & Linear execution layer · Active Sprint 42 (Sep 01 – Sep 14, 2026)
              </p>
            </div>
          </div>
        </div>

        {/* Sprint Summary KPI Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#0A0A0A] border border-[#1D1D1D] px-3.5 py-1.5 rounded-[2px] flex items-center gap-3">
            <div>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase tracking-wider block">
                Sprint Velocity
              </span>
              <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">
                {completedPoints} / {totalPoints} pts ({completionPercent}%)
              </span>
            </div>
            <div className="w-24 h-1.5 bg-[#141414] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0066FF] transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center bg-[#0A0A0A] p-0.5 rounded-[2px] border border-[#1D1D1D]">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech rounded-[2px] transition-colors ${
                viewMode === 'board'
                  ? 'bg-[#0066FF] text-white font-medium shadow-sm'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('backlog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech rounded-[2px] transition-colors ${
                viewMode === 'backlog'
                  ? 'bg-[#0066FF] text-white font-medium shadow-sm'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Backlog</span>
            </button>
          </div>

          <button
            onClick={() => setIsPrdImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#141414] hover:bg-[#1D1D1D] border border-[#262626] text-[#F5F5F0] rounded-[2px] transition-colors"
            title="Convert PRD requirements directly into engineering tickets"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Import from PRD</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#0A0A0A] p-2.5 rounded-[2px] border border-[#1D1D1D]">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder="Filter by issue key (ARG-101), title, or epic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-[#1D1D1D] focus:border-[#0066FF] pl-9 pr-3 py-1.5 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none placeholder:text-[#555]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {/* Priority filter */}
          <div className="flex items-center gap-1 text-xs font-mono-tech text-[#8A8A8A] flex-shrink-0">
            <span className="text-[11px]">Priority:</span>
            {(['ALL', 'P0', 'P1', 'P2'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono-tech transition-colors ${
                  priorityFilter === p
                    ? 'bg-[#1D1D1D] text-[#F5F5F0] border border-[#333]'
                    : 'text-[#666] hover:text-[#AAA]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#1D1D1D] hidden sm:block" />

          {/* Assignee filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono-tech flex-shrink-0">
            <span className="text-[11px] text-[#8A8A8A]">Assignee:</span>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="bg-[#111] border border-[#1D1D1D] text-[#F5F5F0] text-[11px] font-mono-tech rounded-[2px] px-2 py-1 outline-none"
            >
              <option value="ALL">All Engineers</option>
              {ASSIGNEES.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name} ({a.avatar})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Body: Kanban Board vs Backlog List */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-start">
          {COLUMNS.map((column) => {
            const colIssues = filteredIssues.filter((i) => i.status === column.id);
            const colPoints = colIssues.reduce((sum, i) => sum + i.points, 0);

            return (
              <div
                key={column.id}
                className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-2.5 min-h-[580px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#141414]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                    <span className="text-xs font-bold font-display text-[#F5F5F0]">
                      {column.label}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8A8A8A] bg-[#141414] px-1.5 py-0.2 rounded-[2px]">
                      {colIssues.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#666]">
                    {colPoints} pts
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[720px] pr-0.5 scrollbar-thin">
                  {colIssues.length === 0 ? (
                    <div className="h-32 border border-dashed border-[#1A1A1A] rounded-[2px] flex items-center justify-center text-[11px] font-mono-tech text-[#555]">
                      No issues
                    </div>
                  ) : (
                    colIssues.map((issue) => {
                      const completedCriteria = issue.acceptanceCriteria.filter((c) => c.completed).length;
                      const totalCriteria = issue.acceptanceCriteria.length;

                      return (
                        <div
                          key={issue.id}
                          onClick={() => setSelectedIssue(issue)}
                          className="group bg-[#111] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/60 rounded-[2px] p-3 transition-all cursor-pointer relative"
                        >
                          {/* Top Row: Type, Key, Priority, Points */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              {issue.type === 'bug' ? (
                                <Bug className="w-3.5 h-3.5 text-rose-400" />
                              ) : issue.type === 'story' ? (
                                <Bookmark className="w-3.5 h-3.5 text-[#0066FF]" />
                              ) : (
                                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                              )}
                              <span className="text-[11px] font-mono-tech font-bold text-[#AAA] group-hover:text-[#0066FF] transition-colors">
                                {issue.id}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[9px] font-mono-tech font-bold px-1.5 py-0.2 rounded-[2px] ${
                                  issue.priority === 'P0'
                                    ? 'bg-rose-950/40 text-rose-400 border border-rose-800/40'
                                    : issue.priority === 'P1'
                                    ? 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                                    : 'bg-zinc-800 text-zinc-400'
                                }`}
                              >
                                {issue.priority}
                              </span>
                              <span className="text-[10px] font-mono-tech bg-[#1D1D1D] text-[#AAA] px-1.5 py-0.2 rounded-[2px]">
                                {issue.points}pt
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-xs font-sans font-medium text-[#E0E0E0] line-clamp-2 leading-relaxed mb-2 group-hover:text-white">
                            {issue.title}
                          </h4>

                          {/* Epic Tag */}
                          {issue.epicTitle && (
                            <div className="mb-2">
                              <span className="text-[9px] font-mono-tech text-[#8A8A8A] bg-[#171717] px-1.5 py-0.5 rounded-[2px]">
                                {issue.epicTitle}
                              </span>
                            </div>
                          )}

                          {/* Criteria progress */}
                          {totalCriteria > 0 && (
                            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono-tech text-[#777]">
                              <CheckCircle2 className="w-3 h-3 text-[#555]" />
                              <span>
                                {completedCriteria}/{totalCriteria} criteria
                              </span>
                              <div className="flex-1 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500/80"
                                  style={{
                                    width: `${(completedCriteria / totalCriteria) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Bottom Row: Assignee & Quick Status Shift */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#181818] mt-1">
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-5 h-5 rounded-full bg-[#1D1D1D] border border-[#2D2D2D] flex items-center justify-center text-[9px] font-mono-tech font-bold text-[#CCC]"
                                title={issue.assignee.name}
                              >
                                {issue.assignee.avatar}
                              </div>
                              <span className="text-[10px] font-mono-tech text-[#777] hidden sm:inline truncate max-w-[80px]">
                                {issue.assignee.name.split(' ')[0]}
                              </span>
                            </div>

                            <div
                              className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {column.id !== 'backlog' && (
                                <button
                                  onClick={() => moveIssueStatus(issue.id, 'backward')}
                                  className="p-1 hover:bg-[#222] text-[#888] hover:text-[#FFF] rounded-[2px]"
                                  title="Move to previous status"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              )}
                              {column.id !== 'done' && (
                                <button
                                  onClick={() => moveIssueStatus(issue.id, 'forward')}
                                  className="p-1 hover:bg-[#222] text-[#888] hover:text-[#0066FF] rounded-[2px]"
                                  title="Move to next status"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 4. Backlog List View (Sprint Containers) */
        <div className="space-y-4">
          {sprints.map((sprint) => {
            const sprintIssues = filteredIssues.filter((i) => i.sprint.includes(sprint.name.split(' ')[1]));
            const sprintPoints = sprintIssues.reduce((sum, i) => sum + i.points, 0);
            const donePoints = sprintIssues
              .filter((i) => i.status === 'done')
              .reduce((sum, i) => sum + i.points, 0);

            return (
              <div
                key={sprint.id}
                className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] overflow-hidden"
              >
                {/* Sprint Container Header */}
                <div className="bg-[#111] p-3.5 border-b border-[#1D1D1D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-display text-[#F5F5F0]">
                        {sprint.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] ${
                          sprint.status === 'active'
                            ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 font-bold'
                            : sprint.status === 'planning'
                            ? 'bg-amber-950/30 text-amber-400 border border-amber-800/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {sprint.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono-tech text-[#8A8A8A]">
                        {sprint.startDate} – {sprint.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-[#777] font-mono-tech mt-1">
                      Goal: {sprint.goal}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-tech text-[#8A8A8A]">
                      <strong className="text-[#F5F5F0]">{donePoints}</strong> / {sprintPoints} pts completed
                    </span>
                    {sprint.status === 'active' && (
                      <button
                        onClick={() => onShowToast('Sprint 42 completed. Rolling over remaining to Sprint 43.')}
                        className="px-2.5 py-1 text-[11px] font-mono-tech bg-[#171717] hover:bg-[#222] border border-[#2D2D2D] text-[#CCC] rounded-[2px]"
                      >
                        Complete Sprint
                      </button>
                    )}
                  </div>
                </div>

                {/* Issues Table */}
                <div className="divide-y divide-[#141414]">
                  {sprintIssues.length === 0 ? (
                    <div className="p-6 text-center text-xs font-mono-tech text-[#666]">
                      No issues assigned to this sprint.
                    </div>
                  ) : (
                    sprintIssues.map((issue) => (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        className="p-3 hover:bg-[#111] flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {issue.type === 'bug' ? (
                              <Bug className="w-3.5 h-3.5 text-rose-400" />
                            ) : issue.type === 'story' ? (
                              <Bookmark className="w-3.5 h-3.5 text-[#0066FF]" />
                            ) : (
                              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span className="text-xs font-mono-tech font-bold text-[#888] group-hover:text-[#0066FF]">
                              {issue.id}
                            </span>
                          </div>

                          <span className="text-xs font-medium text-[#DDD] group-hover:text-white truncate">
                            {issue.title}
                          </span>

                          {issue.epicTitle && (
                            <span className="text-[10px] font-mono-tech text-[#666] bg-[#161616] px-1.5 py-0.5 rounded-[2px] hidden md:inline flex-shrink-0">
                              {issue.epicTitle}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span
                            className={`text-[10px] font-mono-tech px-1.5 py-0.5 rounded-[2px] ${
                              issue.priority === 'P0'
                                ? 'bg-rose-950/40 text-rose-400'
                                : issue.priority === 'P1'
                                ? 'bg-amber-950/40 text-amber-400'
                                : 'text-zinc-500'
                            }`}
                          >
                            {issue.priority}
                          </span>

                          <span className="text-xs font-mono-tech text-[#888] bg-[#141414] px-2 py-0.5 rounded-[2px]">
                            {issue.points} pts
                          </span>

                          <div
                            className="w-5 h-5 rounded-full bg-[#1D1D1D] flex items-center justify-center text-[9px] font-mono-tech text-[#AAA]"
                            title={issue.assignee.name}
                          >
                            {issue.assignee.avatar}
                          </div>

                          <span
                            className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] min-w-[80px] text-center ${
                              issue.status === 'done'
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                                : issue.status === 'in_progress'
                                ? 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                                : issue.status === 'in_review'
                                ? 'bg-purple-950/40 text-purple-400 border border-purple-800/40'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {issue.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Issue Detail Drawer */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl bg-[#0A0A0A] border-l border-[#1D1D1D] h-full overflow-y-auto p-6 flex flex-col justify-between space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1D1D1D]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-tech font-bold text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded-[2px]">
                    {selectedIssue.id}
                  </span>
                  <span className="text-xs font-mono-tech text-[#8A8A8A]">
                    {selectedIssue.sprint}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="p-1 hover:bg-[#1D1D1D] text-[#8A8A8A] hover:text-[#FFF] rounded-[2px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-lg font-bold font-display text-[#F5F5F0] leading-snug">
                  {selectedIssue.title}
                </h2>
                <p className="text-xs text-[#AAA] font-sans leading-relaxed mt-2 bg-[#111] p-3 rounded-[2px] border border-[#1A1A1A]">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-3 bg-[#111] p-3.5 rounded-[2px] border border-[#1D1D1D] text-xs font-mono-tech">
                <div>
                  <span className="text-[10px] text-[#777] block mb-1">Status</span>
                  <select
                    value={selectedIssue.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as SprintIssue['status'];
                      setIssues((prev) =>
                        prev.map((i) => (i.id === selectedIssue.id ? { ...i, status: newStatus } : i))
                      );
                      setSelectedIssue((prev) => (prev ? { ...prev, status: newStatus } : null));
                      onShowToast(`${selectedIssue.id} status updated to ${newStatus.toUpperCase()}`);
                    }}
                    className="bg-[#171717] border border-[#2D2D2D] text-[#F5F5F0] rounded-[2px] px-2 py-1 outline-none w-full"
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-[#777] block mb-1">Priority</span>
                  <select
                    value={selectedIssue.priority}
                    onChange={(e) => {
                      const newPri = e.target.value as SprintIssue['priority'];
                      setIssues((prev) =>
                        prev.map((i) => (i.id === selectedIssue.id ? { ...i, priority: newPri } : i))
                      );
                      setSelectedIssue((prev) => (prev ? { ...prev, priority: newPri } : null));
                    }}
                    className="bg-[#171717] border border-[#2D2D2D] text-[#F5F5F0] rounded-[2px] px-2 py-1 outline-none w-full"
                  >
                    <option value="P0">P0 - Blocker</option>
                    <option value="P1">P1 - High</option>
                    <option value="P2">P2 - Medium</option>
                    <option value="P3">P3 - Low</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-[#777] block mb-1">Story Points</span>
                  <select
                    value={selectedIssue.points}
                    onChange={(e) => {
                      const pts = Number(e.target.value);
                      setIssues((prev) =>
                        prev.map((i) => (i.id === selectedIssue.id ? { ...i, points: pts } : i))
                      );
                      setSelectedIssue((prev) => (prev ? { ...prev, points: pts } : null));
                    }}
                    className="bg-[#171717] border border-[#2D2D2D] text-[#F5F5F0] rounded-[2px] px-2 py-1 outline-none w-full"
                  >
                    {[1, 2, 3, 5, 8, 13].map((p) => (
                      <option key={p} value={p}>
                        {p} Story Points
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-[#777] block mb-1">Assignee</span>
                  <select
                    value={selectedIssue.assignee.name}
                    onChange={(e) => {
                      const ass = ASSIGNEES.find((a) => a.name === e.target.value) || ASSIGNEES[0];
                      setIssues((prev) =>
                        prev.map((i) => (i.id === selectedIssue.id ? { ...i, assignee: ass } : i))
                      );
                      setSelectedIssue((prev) => (prev ? { ...prev, assignee: ass } : null));
                    }}
                    className="bg-[#171717] border border-[#2D2D2D] text-[#F5F5F0] rounded-[2px] px-2 py-1 outline-none w-full"
                  >
                    {ASSIGNEES.map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Acceptance Criteria Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-display text-[#F5F5F0] flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#0066FF]" />
                    Acceptance Criteria Checklist
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
                    {selectedIssue.acceptanceCriteria.filter((c) => c.completed).length}/
                    {selectedIssue.acceptanceCriteria.length} Passed
                  </span>
                </div>

                <div className="space-y-1.5 bg-[#111] p-3 rounded-[2px] border border-[#1D1D1D]">
                  {selectedIssue.acceptanceCriteria.map((criterion) => (
                    <label
                      key={criterion.id}
                      className="flex items-start gap-2.5 p-1.5 hover:bg-[#181818] rounded-[2px] cursor-pointer text-xs font-mono-tech transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={criterion.completed}
                        onChange={() => toggleCriterion(selectedIssue.id, criterion.id)}
                        className="mt-0.5 accent-[#0066FF]"
                      />
                      <span
                        className={`leading-relaxed ${
                          criterion.completed ? 'line-through text-[#666]' : 'text-[#CCC]'
                        }`}
                      >
                        {criterion.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Linked PRD Section */}
              {selectedIssue.linkedPrdId && (
                <div className="bg-[#111] p-3.5 rounded-[2px] border border-[#1D1D1D] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    <div>
                      <span className="text-[10px] font-mono-tech text-[#8A8A8A] block">
                        Linked Product Requirement Document
                      </span>
                      <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">
                        {selectedIssue.linkedPrdId}: Dynamic Multi-Bank Gateway Routing Engine
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateTab('prds')}
                    className="flex items-center gap-1 text-[11px] font-mono-tech text-[#0066FF] hover:underline"
                  >
                    <span>Inspect PRD</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Git PR Preview */}
              {selectedIssue.prUrl && (
                <div className="bg-[#111] p-3.5 rounded-[2px] border border-[#1D1D1D] flex items-center justify-between text-xs font-mono-tech">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-emerald-400" />
                    <span className="text-[#CCC]">
                      Pull Request <strong className="text-white">{selectedIssue.prUrl}</strong> ready for review
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-[2px]">
                    Passing CI (14/14)
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#1D1D1D] flex items-center justify-between">
              <span className="text-[11px] font-mono-tech text-[#666]">
                Last updated {selectedIssue.updatedAt}
              </span>
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-4 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech rounded-[2px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Quick Create Issue Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <h3 className="text-sm font-bold font-display text-[#F5F5F0]">Create New Issue</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-[#888] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIssue} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Implement Redis distributed lock for checkout idempotency"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#111] border border-[#1D1D1D] focus:border-[#0066FF] px-3 py-2 text-xs font-mono-tech text-white rounded-[2px] outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                    Issue Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#111] border border-[#1D1D1D] text-xs font-mono-tech text-white rounded-[2px] p-2 outline-none"
                  >
                    <option value="story">Story</option>
                    <option value="bug">Bug</option>
                    <option value="task">Task</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#111] border border-[#1D1D1D] text-xs font-mono-tech text-white rounded-[2px] p-2 outline-none"
                  >
                    <option value="P0">P0 - Blocker</option>
                    <option value="P1">P1 - High</option>
                    <option value="P2">P2 - Medium</option>
                    <option value="P3">P3 - Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                    Story Points
                  </label>
                  <select
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="w-full bg-[#111] border border-[#1D1D1D] text-xs font-mono-tech text-white rounded-[2px] p-2 outline-none"
                  >
                    {[1, 2, 3, 5, 8, 13].map((p) => (
                      <option key={p} value={p}>
                        {p} pts
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                    Target Sprint
                  </label>
                  <select
                    value={newSprint}
                    onChange={(e) => setNewSprint(e.target.value)}
                    className="w-full bg-[#111] border border-[#1D1D1D] text-xs font-mono-tech text-white rounded-[2px] p-2 outline-none"
                  >
                    <option value="Sprint 42 (Active)">Sprint 42 (Active)</option>
                    <option value="Sprint 43 (Planning)">Sprint 43 (Planning)</option>
                    <option value="Backlog">Product Backlog</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono-tech text-[#8A8A8A] block mb-1">
                  Assignee
                </label>
                <select
                  value={newAssigneeName}
                  onChange={(e) => setNewAssigneeName(e.target.value)}
                  className="w-full bg-[#111] border border-[#1D1D1D] text-xs font-mono-tech text-white rounded-[2px] p-2 outline-none"
                >
                  {ASSIGNEES.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name} — {a.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1D1D1D]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-mono-tech text-[#8A8A8A] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-40 text-white text-xs font-mono-tech rounded-[2px]"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Import PRD Requirements Modal */}
      {isPrdImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-sm font-bold font-display text-[#F5F5F0]">
                  Import Requirements from PRD Studio
                </h3>
              </div>
              <button onClick={() => setIsPrdImportModalOpen(false)} className="text-[#888] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Detected 3 un-ticketed engineering specifications in <strong>PRD-2026-041</strong> (Dynamic Multi-Bank Gateway Routing Engine):
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[
                { title: 'Sub-450ms circuit breaker threshold trigger', priority: 'P0', pts: 8 },
                { title: 'Redis cluster distributed idempotency lock', priority: 'P0', pts: 5 },
                { title: 'Client SDK contextual retry drawer with backoff', priority: 'P1', pts: 5 },
              ].map((r, i) => (
                <div
                  key={i}
                  className="bg-[#111] p-2.5 rounded-[2px] border border-[#1A1A1A] flex items-center justify-between text-xs font-mono-tech"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span className="text-[#DDD]">{r.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded-[2px]">
                      {r.priority}
                    </span>
                    <span className="text-[10px] text-[#888]">{r.pts} pts</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1D1D1D] flex items-center justify-between">
              <span className="text-[11px] font-mono-tech text-[#666]">
                Target: Sprint 42 (Active)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPrdImportModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-mono-tech text-[#8A8A8A] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportPrdRequirements}
                  className="px-4 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech rounded-[2px] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Convert 3 Specs to Tickets</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
