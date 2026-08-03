import { UiNavHorizontal } from "../../../components/ui";

interface NavTestsProps {
  isFinished: boolean;
}
const NavTests = (props: NavTestsProps) => {
  const { isFinished } = props;
  console.log("isFinished", isFinished);
  return (
    <UiNavHorizontal>
      <div className="flex w-full justify-end items-center">
        <button className="dark:bg-teal-500 dark:text-white rounded-md py-1 px-3">
          Ejecutar pruebas
        </button>
      </div>
    </UiNavHorizontal>
  );
};

export default NavTests;
