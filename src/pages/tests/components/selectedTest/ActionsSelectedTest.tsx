import { Play, RefreshCw } from "lucide-react";
import { useExecutionStore } from "../../../../store/executionStore";

interface ActionsTestProps {
  fetchSuites: () => void;
  selectedCount: number;
  isLoading: boolean;
  handleRun: () => void;
}

export const ActionsSelectedTest = (props: ActionsTestProps) => {
  const { fetchSuites, isLoading, handleRun } = props;
  const resetExecutions = useExecutionStore((state) => state.reset);

  const runTest = () => {
    resetExecutions();
    handleRun();
  };

  return (
    <div className="">
      <div className="flex gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={fetchSuites}
          className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
        >
          <RefreshCw size={18} />
          Recargar suites
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={runTest}
          className="inline-flex items-center gap-3 rounded-md bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play size={18} />
          {isLoading ? "Ejecutando..." : "Ejecutar selección"}
        </button>
      </div>
    </div>
  );
};
