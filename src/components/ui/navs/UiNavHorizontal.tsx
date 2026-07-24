import { Sparkles } from "lucide-react";

interface UiNavHorizontalProps {
  isFinished: boolean;
  isLoading: boolean;
  totalTests: number;
  numTest: number;
}
const UiNavHorizontal = (props: UiNavHorizontalProps) => {
  const { isFinished, isLoading, totalTests, numTest } = props;
  return (
    <div className="w-full dark:bg-slate-900 bg-slate-100 p-3 h-[8.8%] transition-all duration-300 border-black/10 border-b">
      <div className="flex w-full justify-end items-center">
        {/* <div className="flex items-center gap-3">
          <Sparkles size={22} className="text-sky-400" />
          <h2 className="text-xl font-semibold text-black/70 dark:text-white tracking-widest">
            Reporte test automáticos
          </h2>
        </div> */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UiNavHorizontal;
