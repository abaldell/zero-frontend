import { UiNavHorizontal } from "../../../components/ui";

interface NavTestsProps {
  isFinished: boolean;
  isLoading: boolean;
  totalTests: number;
  numTest: number;
}
const NavTests = (props: NavTestsProps) => {
  const { isFinished, isLoading, totalTests, numTest } = props;
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
          </div>
        )}
      </div>
    </UiNavHorizontal>
  );
};

export default NavTests;
