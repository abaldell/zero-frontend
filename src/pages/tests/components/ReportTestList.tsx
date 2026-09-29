import { useState } from "react";
import { CardTestList } from "../../../components/cards/CardTestList";
import TestDetail from "./TestDetails";
import type { TestResult } from "../../../types/test.type";
import { FolderOpen } from "lucide-react";

export interface ReportTestListProps {
  items: TestResult[];
  itemsResult: Record<string, TestResult[]>;
}
export const ReportTestList = (props: ReportTestListProps) => {
  const { items, itemsResult } = props;
  const [testDetail, setTestDetail] = useState<TestResult>({} as TestResult);
  const hasResults = items.length > 0 || Object.keys(itemsResult).length > 0;

  return (
    <div
      className={`${testDetail.id ? "flex gap-3" : ""} mt-3 transition-transform duration-300 items-stretch h-screen`}
    >
      {hasResults && (
        <div
          className={`${testDetail.id ? "w-1/4" : "w-full mt-3"} overflow-y-auto transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
        >
          {Object.keys(itemsResult).length > 0 ? (
            <>
              {Object.entries(itemsResult).map(([file, tests]) => (
                <div key={file} className="mb-6 ">
                  <h3 className="flex gap-3 items-center p-3 text-sm font-semibold rounded-t-md bg-teal-500 text-white dark:bg-teal-500/30  dark:text-white ring-1 ring-inset ring-teal-200/30">
                    <FolderOpen size={20} /> {file.split("/").pop()}
                  </h3>

                  <div className="space-y-2">
                    <CardTestList
                      items={tests}
                      onLoadTest={setTestDetail}
                      itemOpen={testDetail.id}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <CardTestList
              items={items}
              onLoadTest={setTestDetail}
              itemOpen={testDetail.id}
            ></CardTestList>
          )}
        </div>
      )}

      {testDetail.id && (
        <div
          className={`${testDetail.id ? "w-3/4" : "w-full"} overflow-y-auto transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
        >
          <TestDetail test={testDetail} />
        </div>
      )}
    </div>
  );
};
