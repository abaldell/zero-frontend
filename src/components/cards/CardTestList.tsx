import { ChevronRightIcon, CircleIcon } from "lucide-react";
import type { TestResult } from "../../types/test.type";
import UiCard from "../ui/cards/UiCard";
import { useExecutionStore } from "../../store/executionStore";

export interface CardListProps {
  items: TestResult[];
  onLoadTest?: (test: TestResult) => void;
  itemOpen: string;
}
export const CardTestList = (props: CardListProps) => {
  const { items, onLoadTest, itemOpen } = props;
  const isFinishedStore = useExecutionStore((state) => state.isFinishedStore);
  return (
    <section className="shadow-panel">
      <div className="overflow-hidden rounded-b-md bg-slate-100 dark:bg-slate-900 shadow ring-1 ring-inset ring-slate-300/30 dark:ring-slate-700/50">
        <ul role="list" className="divide-y divide-slate-700/50">
          {items.map((item) => (
            <li
              key={item.id}
              className={`${item.id === itemOpen && "dark:bg-slate-800 bg-slate-200"} text-black/70 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-white`}
              onClick={
                isFinishedStore && onLoadTest
                  ? () => onLoadTest(item)
                  : undefined
              }
            >
              <UiCard>
                <div
                  className={`flex flex-row ${itemOpen ? "items-stretch" : "items-center"}  gap-x-3`}
                >
                  {!itemOpen ? (
                    <CircleIcon
                      size={18}
                      className={`ring-1 ring-inset rounded-2xl 
                          ${
                            item.status === "running" ||
                            item.status === "skipped"
                              ? "bg-sky-600 text-sky-600 ring-sky-600/20"
                              : item.status === "failed"
                                ? "bg-red-600 text-red-700 ring-red-500/20"
                                : "bg-green-600 text-green-700 ring-green-500/20"
                          }
                        `}
                    />
                  ) : (
                    <div
                      className={`min-w-1.25 ring-1 ring-inset rounded-md
                          ${
                            item.status === "running" ||
                            item.status === "skipped"
                              ? "bg-sky-600 text-sky-600 ring-sky-600/20"
                              : item.status === "failed"
                                ? "bg-red-600 text-red-700 ring-red-500/20"
                                : "bg-green-600 text-green-700 ring-green-500/20"
                          }
                        `}
                    ></div>
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
              </UiCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
