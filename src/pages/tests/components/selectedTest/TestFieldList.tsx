import TestSuiteTree from "../TestSuiteTree";
import { SkeletonTestSuite } from "../../../../components/skeleton/SkeletonTestSuite";
import type { TestFileNode } from "../../../../types/playwright";

export interface TestFieldProps {
  testTree: TestFileNode[];
  selectedPaths: string[];
  togglePath: (path: string) => void;
}

export const TestFieldList = (props: TestFieldProps) => {
  const { testTree, selectedPaths, togglePath } = props;

  return (
    <section className="p-1">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm uppercase font-semibold tracking-widest text-teal-500">
          Jerarquía de test
        </p>
        {/* <span className="rounded-2xl bg-slate-600/90 dark:bg-slate-800/90 px-4 py-2 text-sm text-white dark:text-slate-300">
          {selectedPaths.length} nodos seleccionados
        </span> */}
      </div>

      <div className="space-y-4">
        {testTree.length === 0 ? (
          <SkeletonTestSuite type={"test"} />
        ) : (
          <TestSuiteTree
            nodes={testTree}
            selectedPaths={selectedPaths}
            onToggle={togglePath}
          />
        )}
      </div>
    </section>
  );
};
