import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from 'lucide-react';
import { ArgusCard } from './ArgusCard';
import { ArgusButton } from './ArgusButton';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface ArgusDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  searchableKey?: keyof T;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
  density?: 'compact' | 'comfortable';
}

export function ArgusDataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  searchableKey,
  searchPlaceholder = 'Filter records...',
  onRowClick,
  actions,
  density = 'compact',
}: ArgusDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredData = useMemo(() => {
    if (!searchTerm || !searchableKey) return data;
    return data.filter((row) =>
      String(row[searchableKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm, searchableKey]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return sortDirection === 'asc' ? -1 : 1;
    });
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map((row) => keyExtractor(row))));
    }
  };

  const toggleSelectRow = (id: string, e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const rowPadding = density === 'compact' ? 'py-2 px-3' : 'py-3.5 px-4';

  return (
    <ArgusCard density="compact" spotlight={false} className="w-full p-0 overflow-hidden">
      {/* Controls Bar */}
      <div className="p-3 border-b border-[rgba(255,255,255,0.06)] bg-[#060606] flex flex-wrap items-center justify-between gap-3">
        {searchableKey && (
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#666666] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-[#0E0E0E] border border-[rgba(255,255,255,0.08)] rounded-[4px] pl-8 pr-3 py-1 text-xs text-[#EDEDED] outline-none focus:border-[#0066FF]"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <span className="text-xs font-mono-tech text-[#0066FF] px-2 py-0.5 rounded bg-[#0066FF]/10">
              {selectedIds.size} selected
            </span>
          )}
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] text-[#8A8A8A] font-mono-tech text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                  onChange={toggleSelectAll}
                  className="rounded border-[rgba(255,255,255,0.2)] bg-[#121212] accent-[#0066FF] cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`${rowPadding} ${col.width || ''} ${
                    col.sortable ? 'cursor-pointer hover:text-[#EDEDED] select-none' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[#555]">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3 h-3 text-[#0066FF]" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-[#0066FF]" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3 h-3" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-xs text-[#666666]">
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const id = keyExtractor(row);
                const isSelected = selectedIds.has(id);
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors duration-150 ${
                      isSelected ? 'bg-[#0066FF]/5' : 'hover:bg-[#0E0E0E]'
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    <td className="py-2 px-3 w-8" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => toggleSelectRow(id, e)}
                        className="rounded border-[rgba(255,255,255,0.2)] bg-[#121212] accent-[#0066FF] cursor-pointer"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className={`${rowPadding} text-[#EDEDED]`}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-2.5 border-t border-[rgba(255,255,255,0.06)] bg-[#060606] flex items-center justify-between text-xs text-[#666666]">
          <span>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="flex items-center gap-1">
            <ArgusButton
              variant="outline"
              size="xs"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </ArgusButton>
            <span className="text-xs font-mono-tech px-2 text-[#8A8A8A]">
              {page} / {totalPages}
            </span>
            <ArgusButton
              variant="outline"
              size="xs"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </ArgusButton>
          </div>
        </div>
      )}
    </ArgusCard>
  );
}
