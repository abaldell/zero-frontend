import { Play } from "lucide-react";
import { UiNavHorizontal } from "../../../components/ui";

interface NavTestsProps {
  isFinished: boolean;
  isLoading: boolean;
  totalTests: number;
  numTest: number;
  isExecution: boolean;
}
const NavTests = (props: NavTestsProps) => {
  const { isFinished, isLoading, totalTests, numTest, isExecution } = props;
  const runExecuteTestSet = () => {
    console.log("run");
  };
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
              <button
                className="flex items-center gap-3 dark:bg-teal-500 dark:text-white rounded-md py-1 px-3 dark:disabled:bg-slate-500 disabled:bg-slate-500"
                onClick={runExecuteTestSet}
              >
                <Play size={20} />
                Reportar pruebas
              </button>
            )}
          </div>
        )}
      </div>
    </UiNavHorizontal>
  );
};

export default NavTests;
