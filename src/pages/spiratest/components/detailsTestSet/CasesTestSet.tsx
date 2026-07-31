import type { CaseTestSet } from "../../../../types/spiratest.types";
import { formatDate } from "../../../../utils/Utils";
import { UiCard } from "../../../../components/ui";
import { CircleIcon } from "lucide-react";

interface CasesTestSetProps {
  casesTest: CaseTestSet[];
}
export const CasesTestSet = (props: CasesTestSetProps) => {
  const { casesTest } = props;

  console.log("cases", casesTest);
  return (
    <div className="my-5">
      <div className="flex w-full gap-3 items-center">
        <h3 className="w-full p-3 text-sm font-semibold rounded-t-md bg-teal-500 text-white dark:bg-teal-500/30  dark:text-white ring-1 ring-inset ring-teal-200/30">
          Casos de prueba
        </h3>
      </div>
      <ul role="list" className="divide-y divide-slate-700/50">
        {casesTest.map((item: CaseTestSet) => {
          const lastDate = formatDate(item.LastUpdateDate);
          return (
            <>
              <li
                key={`case-${item.TestCaseId}`}
                className={`text-black/70 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-white`}
              >
                <UiCard>
                  <div className={`flex flex-row  items-center gap-x-3`}>
                    <div className="flex gap-3 items-center w-24">
                      <CircleIcon
                        size={18}
                        className={`ring-1 ring-inset rounded-2xl 
                          ${
                            item.ExecutionStatusName === "Not Run"
                              ? "bg-slate-600 text-slate-600 ring-slate-600/20"
                              : item.ExecutionStatusName === "Failed"
                                ? "bg-red-600 text-red-700 ring-red-500/20"
                                : item.ExecutionStatusName === "Caution"
                                  ? "bg-orange-600 text-orange-700 ring-orange-500/20"
                                  : item.ExecutionStatusName === "Blocked"
                                    ? "bg-yellow-600 text-yellow-700 ring-yellow-500/20"
                                    : "bg-green-600 text-green-700 ring-green-500/20"
                          }
                        `}
                      />
                      <span
                        className={`
                          ${
                            item.ExecutionStatusName === "Not Run"
                              ? " text-slate-600"
                              : item.ExecutionStatusName === "Failed"
                                ? "text-red-700"
                                : item.ExecutionStatusName === "Caution"
                                  ? "text-orange-700"
                                  : item.ExecutionStatusName === "Blocked"
                                    ? "text-yellow-700"
                                    : "text-green-700"
                          }
                        `}
                      >
                        {item.ExecutionStatusName}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold">
                      [TC:{item.TestCaseId}] {item.Name}
                    </h3>
                  </div>
                  <div className="flex">
                    <h3 className="text-sm font-semibold">
                      Ultima ejecución: {lastDate}
                    </h3>
                    {/* <ChevronRightIcon
                      className="ml-4 h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </div>
                </UiCard>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};
