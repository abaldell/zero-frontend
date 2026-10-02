import type { SpiraTestSet } from "../../../types/spiratest.types";
import { UiCard } from "../../../components/ui";

interface SidebarProjectIdProps {
  testSets: SpiraTestSet[];
  testSelected: number;
  onSetOpen: (setId: number) => void;
}
export const SidebarProjectId = (props: SidebarProjectIdProps) => {
  const { testSets, testSelected, onSetOpen } = props;

  return (
    <section className="shadow-panel">
      <div className="overflow-hidden rounded-b-md bg-slate-100 dark:bg-slate-900 shadow ring-1 ring-inset ring-slate-300/30 dark:ring-slate-700/50">
        <ul role="list" className="divide-y divide-slate-700/50">
          {testSets.map((item: SpiraTestSet) => (
            <li
              key={item.TestSetId}
              className={`${item.TestSetId === testSelected && "dark:bg-slate-800 bg-slate-200"} text-black/70 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-white`}
              onClick={() => onSetOpen(item.TestSetId)}
            >
              <UiCard>
                <div
                  className={`flex flex-row ${testSelected ? "items-stretch" : "items-center"}  gap-x-3`}
                >
                  <div
                    className={`min-w-1.25 ring-1 ring-inset rounded-md
                          ${
                            item.TestSetStatusId === 2
                              ? "bg-sky-600 text-sky-600 ring-sky-600/20"
                              : item.TestSetStatusId === 3
                                ? "bg-green-600 text-green-700 ring-green-500/20"
                                : item.TestSetStatusId === 5
                                  ? "bg-orange-600 text-orange-700 ring-orange-500/20"
                                  : "bg-slate-500 text-slate-600 ring-slate-400/20"
                          }
                        `}
                  ></div>
                  <h3 className="text-sm font-semibold">{item.Name}</h3>
                </div>
              </UiCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
