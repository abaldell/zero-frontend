import { Check, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { stripAnsi } from "../../utils/Utils";
import type { TestResult } from "../../types/test.type";

export interface UiAccordionProps {
  step: TestResult;
  level: number;
}

export const UiAccordion = (props: UiAccordionProps) => {
  const { step, level } = props;
  const [open, setOpen] = useState(false);

  const hasChildren = step.children?.length || step.details;
  const errorStep = step.error ? true : step.status === "failed" ? true : false;

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between p-3 gap-3 my-3 rounded-sm border ${
          !errorStep
            ? "border-green-600 bg-green-600/20"
            : "border-red-800 bg-red-800/20"
        }`}
      >
        <div className={`flex items-center gap-2 rounded-l-sm rounded-r-sm`}>
          {hasChildren ? (
            <ChevronRight
              size={14}
              className={`transition-transform ${open ? "rotate-90" : ""}`}
            />
          ) : (
            <div className="w-3.5" />
          )}

          {!errorStep ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <X size={16} className="text-red-500" />
          )}

          <span>{step.title}</span>
        </div>

        <span className="text-slate-400">
          {(step.duration / 1000).toFixed(1)}s
        </span>
      </div>

      {open && (
        <>
          {step.details && (
            <div
              className="mx-4 my-2 rounded-md bg-slate-900 p-4"
              style={{ marginLeft: `${level * 24 + 40}px` }}
            >
              {step.details}
            </div>
          )}

          {step.children?.map((child) => (
            <div className="ml-7">
              <UiAccordion key={child.id} step={child} level={level + 1} />
            </div>
          ))}

          {step.error && (
            <div
              className="mx-4 rounded-md bg-gray-950 p-4 scroll overflow-auto"
              style={{ marginLeft: `${level * 24 + 40}px` }}
            >
              <pre className="w-full mt-3 text-white/50">
                {stripAnsi(step.error.stack)}
              </pre>
              <pre className="w-full mt-3 text-white/50">
                {stripAnsi(step.error.snippet)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};
