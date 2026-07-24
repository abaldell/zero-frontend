import { useState } from "react";
import { CardTestList } from "../../../components/cards/CardTestList";
import TestDetail from "./TestDetails";
import type { TestResult } from "../../../types/test.type";

export interface ReportTestListProps {
  items: TestResult[];
}
export const ReportTestList = (props: ReportTestListProps) => {
  const { items } = props;
  const [testDetail, setTestDetail] = useState<TestResult>({} as TestResult);

  return (
    <div
      className={`${testDetail.id ? "flex gap-3" : ""} mt-3 transition-transform duration-300 items-stretch`}
    >
      {items.length > 0 && (
        <div
          className={`${testDetail.id ? "w-1/4" : "w-full mt-3"} transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
        >
          <CardTestList
            items={items}
            onLoadTest={setTestDetail}
            itemOpen={testDetail.id}
          ></CardTestList>
        </div>
      )}
      {testDetail.id && (
        <div
          className={`${testDetail.id ? "w-3/4" : "w-full"} transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
        >
          <TestDetail test={testDetail} />
        </div>
      )}
    </div>
  );
};
