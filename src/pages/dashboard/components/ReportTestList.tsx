import { useState } from "react";
import { CardList } from "../../../components/cards/CardList";
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
      className={`${testDetail.id ? "flex gap-3" : ""} mt-3 transition-all duration-300 items-stretch`}
    >
      <div
        className={`${testDetail.id ? "w-1/4" : "w-full mt-3"} transition-all duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
      >
        <CardList items={items} onLoadTest={setTestDetail}></CardList>
      </div>
      {testDetail.id && (
        <div
          className={`${testDetail.id ? "w-3/4" : "w-full"} transition-all duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
        >
          <TestDetail test={testDetail} />
        </div>
      )}
    </div>
  );
};
