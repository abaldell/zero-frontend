"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react";
import type { TestFileNode } from "../types/playwright";

interface TestSuiteTreeProps {
  nodes: TestFileNode[];
  selectedPaths: string[];
  onToggle: (path: string) => void;
}

export default function TestSuiteTree({
  nodes,
  selectedPaths,
  onToggle,
}: TestSuiteTreeProps) {
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);

  const toggleExpanded = (path: string) => {
    setExpandedPaths((current) =>
      current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path],
    );
  };

  const renderNodes = (nodeList: TestFileNode[]) => {
    return nodeList.map((node) => {
      const isSelected = selectedPaths.includes(node.path);
      const isExpanded = expandedPaths.includes(node.path);
      const hasChildren =
        node.type === "directory" && (node.children?.length ?? 0) > 0;

      return (
        <li key={node.path} className="space-y-1">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-black/70 dark:text-white transition-transform duration-300">
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleExpanded(node.path)}
                className="inline-flex items-center justify-center rounded p-1 dark:text-slate-300"
                aria-label={isExpanded ? "Cerrar carpeta" : "Abrir carpeta"}
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            ) : (
              <span className="inline-flex w-6 items-center justify-center dark:text-slate-500" />
            )}

            <button
              type="button"
              onClick={() => onToggle(node.path)}
              className="flex min-w-0 flex-1 items-center gap-2 text-left"
            >
              <span className="inline-flex items-center gap-2 ">
                {node.type === "directory" ? (
                  <Folder size={18} />
                ) : (
                  <FileText size={18} />
                )}
                <span className="truncate">{node.name}</span>
              </span>
            </button>

            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-black/70 dark:text-slate-400">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(node.path)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-400 focus:ring-sky-400"
              />
              <span>Seleccionar</span>
            </label>
          </div>

          {hasChildren && isExpanded ? (
            <ul className="ml-7 border-l border-slate-800/70 pl-3">
              {renderNodes(node.children ?? [])}
            </ul>
          ) : null}
        </li>
      );
    });
  };

  return <ul className="space-y-2">{renderNodes(nodes)}</ul>;
}
