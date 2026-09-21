import { useEffect, useMemo, useState } from "react";
import { DrawerRelative } from "../../../../components/drawers/DrawerRelative";
import { ActionsSelectedTest } from "./ActionsSelectedTest";
import type { ScriptSet, TestFileNode } from "../../../../types/playwright";
import { TestFieldList } from "./TestFieldList";
import { TestScriptsList } from "./TestScriptsList";
import { getApiTestSuite } from "../../../../utils/Utils";
import { useNavStore } from "../../../../store/navStore";

const API_SUITES = getApiTestSuite();

interface SelectTestsProps {
  isLoading: boolean;
  onRun: () => void;
  onSelectPath: (path: string[]) => void;
  onSelectScript: (script: string[]) => void;
}
export const SelectTests = (props: SelectTestsProps) => {
  const { onRun, isLoading, onSelectPath, onSelectScript } = props;
  const setOpenDrawer = useNavStore((state) => state.setOpenDrawer);
  const [scriptSets, setScriptSets] = useState<ScriptSet[]>([]);
  const [testTree, setTestTree] = useState<TestFileNode[]>([]);
  const [selectedScriptKeys, setSelectedScriptKeys] = useState<string[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  const fetchSuites = async () => {
    try {
      const response = await fetch(API_SUITES);
      if (!response.ok) {
        throw new Error("No se pudo cargar la información de suites");
      }
      const payload = await response.json();
      setScriptSets(payload.scriptSets ?? []);
      setTestTree(payload.testTree ?? []);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  useEffect(() => {
    const suites = async () => {
      await fetchSuites();
    };
    suites();
  }, []);

  const selectedCount = useMemo(
    () => selectedScriptKeys.length + selectedPaths.length,
    [selectedScriptKeys, selectedPaths],
  );

  const toggleScriptKey = (key: string) => {
    const newScript = selectedScriptKeys.includes(key)
      ? selectedScriptKeys.filter((item) => item !== key)
      : [...selectedScriptKeys, key];
    setSelectedScriptKeys(newScript);
    onSelectScript(newScript);
  };

  const togglePath = (path: string) => {
    const newPaths = selectedPaths.includes(path)
      ? selectedPaths.filter((item) => item !== path)
      : [...selectedPaths, path];
    setSelectedPaths(newPaths);
    onSelectPath(newPaths);
  };

  const handleRun = async () => {
    setOpenDrawer(false);
    onRun();
  };

  return (
    <DrawerRelative>
      <ActionsSelectedTest
        fetchSuites={fetchSuites}
        selectedCount={selectedCount}
        isLoading={isLoading}
        handleRun={handleRun}
      />

      <div className="flex-1 min-h-0 p-3 rounded-md border border-slate-100/90 bg-slate-100 dark:border-slate-800/90 dark:bg-slate-900/80 shadow-panel">
        <div className="h-full custom-scroll overflow-y-auto pr-3 dark:scrollbar-thumb-teal-500 dark:scrollbar-track-slate-900">
          <TestFieldList
            testTree={testTree}
            selectedPaths={selectedPaths}
            togglePath={togglePath}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 p-3 rounded-md border border-slate-100/90 bg-slate-100 dark:border-slate-800/90 dark:bg-slate-900/80 shadow-panel">
        <div className="h-full custom-scroll overflow-y-auto pr-3 dark:scrollbar-thumb-teal-500 dark:scrollbar-track-slate-900">
          <TestScriptsList
            scriptSets={scriptSets}
            selectedScriptKeys={selectedScriptKeys}
            toggleScriptKey={toggleScriptKey}
          />
        </div>
      </div>
    </DrawerRelative>
  );
};
