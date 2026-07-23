import { ChevronRightIcon, CircleIcon } from "lucide-react";
import type { TestResult } from "../../types/test.type";

export interface CardListProps {
  items: TestResult[];
  onLoadTest?: (test: TestResult) => void;
}
export const CardList = (props: CardListProps) => {
  const { items, onLoadTest } = props;
  return (
    <section className="shadow-panel">
      <div className="overflow-hidden rounded-md bg-slate-100 dark:bg-slate-900 shadow ring-1 ring-inset ring-slate-300/30 dark:ring-slate-700/50">
        <ul role="list" className="divide-y divide-slate-700/50">
          {items.map((item) => (
            <li
              key={item.id}
              className="text-black/70 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-white"
              onClick={onLoadTest ? () => onLoadTest(item) : undefined}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-3 justify-between p-3">
                  <div className="flex flex-row items-center gap-x-3">
                    {item.status === "running" && (
                      <CircleIcon
                        size={18}
                        className="bg-sky-600 text-sky-600 ring-1 ring-inset ring-sky-600/20 rounded-2xl"
                      />
                    )}
                    {item.status === "failed" && (
                      <CircleIcon
                        size={18}
                        className="bg-red-600 text-red-700 ring-1 ring-inset ring-red-500/20 rounded-2xl"
                      />
                    )}
                    {item.status === "passed" && (
                      <CircleIcon
                        size={18}
                        className="bg-green-600 text-green-700 ring-1 ring-inset ring-green-500/20 rounded-2xl"
                      />
                    )}
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <div className="flex">
                    <h3 className="text-sm font-semibold">
                      {item.duration
                        ? `${(item.duration / 1000).toFixed(1)}s`
                        : ""}
                    </h3>
                    <ChevronRightIcon
                      className="ml-4 h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
