import { Play } from "lucide-react";
import { UiNavHorizontal } from "../../../components/ui";

interface NavTestsProps {
  isFinished: boolean;
  showButton: boolean;
  onRunTests: () => void;
}
const NavTests = (props: NavTestsProps) => {
  const { isFinished, showButton, onRunTests } = props;
  console.log("isFinished", isFinished);
  return (
    <UiNavHorizontal>
      <div className="flex w-full justify-end items-center">
        <button
          className="flex items-center gap-3 dark:bg-teal-500 text-white dark:text-white rounded-md py-1 px-3 dark:disabled:bg-slate-500 disabled:bg-slate-500"
          onClick={onRunTests}
          disabled={!showButton}
        >
          <Play size={20} />
          Ejecutar pruebas
        </button>
      </div>
    </UiNavHorizontal>
  );
};

export default NavTests;
