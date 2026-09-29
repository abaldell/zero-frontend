import { Check, LoaderCircle, Upload } from "lucide-react";
import { UiNavHorizontal } from "../../../components/ui";

type ReportState = "idle" | "loading" | "success" | "error";

interface NavTestsProps {
  isFinished: boolean;
  isLoading: boolean;
  totalTests: number;
  numTest: number;
  isExecution: boolean;
  onReportTests: () => void;
  reportState: ReportState;
  reportError: string;
}
const NavTests = (props: NavTestsProps) => {
  const {
    isFinished,
    isLoading,
    totalTests,
    numTest,
    isExecution,
    onReportTests,
    reportState,
    reportError,
  } = props;
  return (
    <UiNavHorizontal>
      <div className="flex w-full justify-end items-center">
        {(isLoading || isFinished) && (
          <div className="flex gap-3">
            <span className="rounded-md bg-slate-800/90 px-4 py-2 text-sm text-slate-300">
              {numTest}/{totalTests} tests
            </span>
            <span
              className={`text-sm font-medium rounded-md px-4 py-2 ${isFinished ? "bg-green-400 text-green-800" : "bg-teal-500 text-teal-800"}`}
            >
              {isFinished ? "Finalizado" : "Ejecutando..."}
            </span>
            {isExecution && isFinished && (
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-3 dark:bg-teal-500 dark:text-white rounded-md py-1 px-3 dark:disabled:bg-slate-500 disabled:bg-slate-500"
                  onClick={onReportTests}
                  disabled={
                    reportState === "loading" || reportState === "success"
                  }
                >
                  {reportState === "loading" ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : reportState === "success" ? (
                    <Check size={20} />
                  ) : (
                    <Upload size={20} />
                  )}
                  {reportState === "loading"
                    ? "Reportando..."
                    : reportState === "success"
                      ? "Reportado"
                      : "Reportar pruebas"}
                </button>
                {reportState === "error" && (
                  <span role="alert" className="max-w-sm text-xs text-red-600">
                    {reportError}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </UiNavHorizontal>
  );
};

export default NavTests;
