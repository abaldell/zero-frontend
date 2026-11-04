import { useEffect, useState } from "react";
import {
  getCasesTestSet,
  getDetailTestSet,
} from "../../services/spiratest.service";
import type { CaseTestSet, TestSet } from "../../types/spiratest.types";
import { StatsTestSet, type Stats } from "./StatsTestSet";
import { CasesTestSet } from "./CasesTestSet";
import { CircleIcon } from "lucide-react";
import { Spinner } from "flowbite-react";
import { getTestPW } from "../../../executions/services/playwright.service";
import type { TestPW } from "../../../executions/types/playwright";

interface DetailsTestSetProps {
  testSelected: number;
  onSelectTestCase: (testCases: TestPW[]) => void;
  onSelectPaths: (paths: string[]) => void;
}

export const DetailsTestSet = (props: DetailsTestSetProps) => {
  const { testSelected, onSelectTestCase, onSelectPaths } = props;
  const [details, setDetails] = useState<TestSet>({} as TestSet);
  const [casesTest, setCasesTest] = useState<CaseTestSet[]>([]);
  const [statsDetails, setStatsDetails] = useState<Stats>({} as Stats);
  const [testPW, setTestPw] = useState<TestPW[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testSelected) {
      let cancelled = false;
      const loadData = async () => {
        setLoading(true);
        try {
          const [data, dataCases, dataTestPW] = await Promise.all([
            getDetailTestSet(import.meta.env.VITE_API_PROYECT, testSelected),
            getCasesTestSet(import.meta.env.VITE_API_PROYECT, testSelected),
            getTestPW(),
          ]);
          if (cancelled) return;

          setDetails(data);
          setCasesTest(dataCases);
          setTestPw(dataTestPW);
          setStatsDetails({
            categories: [
              "Pasaron",
              "Fallaron",
              "Bloqueados",
              "Precaución",
              "No ejecutados",
              "No aplican",
            ],
            values: [
              data.CountPassed,
              data.CountFailed,
              data.CountBlocked,
              data.CountCaution,
              data.CountNotRun,
              data.CountNotApplicable,
            ],
            colors: [
              "#00a63e",
              "#fb2c36",
              "#d08700",
              "#f54900",
              "#45556c",
              "#aeaeae",
            ],
          });
        } finally {
          if (!cancelled) setLoading(false);
        }
      };
      loadData();
      return () => {
        cancelled = true;
      };
    }
  }, [testSelected]);
  return (
    <div
      className={`${loading ? "flex items-center justify-center min-h-[calc(100vh-7rem)]" : ""}`}
    >
      {loading ? (
        <Spinner color="info" aria-label="Extra large Info spinner" size="xl" />
      ) : (
        <>
          <div className="sticky top-0 left-0 flex items-center justify-between bg-slate-100 dark:bg-slate-900 z-40 p-3">
            <div>
              <h1 className="text-xl font-bold">{details.Name}</h1>
            </div>

            <div className="flex flex-row items-center gap-x-3">
              {details.TestSetStatusName === "In Progress" && (
                <CircleIcon
                  size={18}
                  className="bg-sky-600 text-sky-600 ring-1 ring-inset ring-sky-600/20 rounded-2xl"
                />
              )}
              {details.TestSetStatusName === "Blocked" && (
                <CircleIcon
                  size={18}
                  className="bg-red-600 text-red-700 ring-1 ring-inset ring-red-500/20 rounded-2xl"
                />
              )}
              {details.TestSetStatusName === "Deferred" && (
                <CircleIcon
                  size={18}
                  className="bg-orange-600 text-orange-700 ring-1 ring-inset ring-orange-500/20 rounded-2xl"
                />
              )}
              {details.TestSetStatusName === "Completed" && (
                <CircleIcon
                  size={18}
                  className="bg-green-600 text-green-700 ring-1 ring-inset ring-green-500/20 rounded-2xl"
                />
              )}
              {details.TestSetStatusName?.toUpperCase()}
            </div>
          </div>
          <StatsTestSet stats={statsDetails} />
          <CasesTestSet
            key={testSelected}
            casesTest={casesTest}
            testPW={testPW}
            onSelectTestCase={onSelectTestCase}
            onSelectPaths={onSelectPaths}
          />
        </>
      )}
    </div>
  );
};
