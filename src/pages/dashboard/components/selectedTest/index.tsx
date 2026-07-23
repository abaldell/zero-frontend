import { useEffect, useMemo, useState } from "react";
import { DrawerRelative } from "../../../../components/drawers/DrawerRelative";
import { ActionsSelectedTest } from "./ActionsSelectedTest";
import type { ScriptSet, TestFileNode } from "../../../../types/playwright";
import { TestFieldList } from "./TestFieldList";
import { TestScriptsList } from "./TestScriptsList";

const API_SUITES = "http://localhost:3001/api/test-suite";

interface SelectTestsProps {
  isLoading: boolean;
  onOpenDrawer: (open: boolean) => void;
  onRun: () => void;
  onError: (error: string | null) => void;
  onSelectPath?: (path: string[]) => void;
  onSelectScript?: (script: string[]) => void;
}
export const SelectTests = (props: SelectTestsProps) => {
  const {
    onOpenDrawer,
    onRun,
    onError,
    isLoading,
    onSelectPath,
    onSelectScript,
  } = props;
  const [scriptSets, setScriptSets] = useState<ScriptSet[]>([]);
  const [testTree, setTestTree] = useState<TestFileNode[]>([]);
  const [selectedScriptKeys, setSelectedScriptKeys] = useState<string[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  useEffect(() => {
    fetchSuites();
  }, []);

  const selectedCount = useMemo(
    () => selectedScriptKeys.length + selectedPaths.length,
    [selectedScriptKeys, selectedPaths],
  );

  const fetchSuites = async () => {
    onError(null);
    try {
      const response = await fetch(API_SUITES);
      if (!response.ok) {
        throw new Error("No se pudo cargar la información de suites");
      }
      const payload = await response.json();
      setScriptSets(payload.scriptSets ?? []);
      setTestTree(payload.testTree ?? []);
    } catch (err) {
      onError((err as Error).message);
    }
  };

  const toggleScriptKey = (key: string) => {
    setSelectedScriptKeys((current) => {
      const newScript = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key];
      onSelectScript?.(newScript);
      return newScript;
    });
  };

  const togglePath = (path: string) => {
    setSelectedPaths((current) => {
      const newPaths = current.includes(path)
        ? current.filter((item) => item !== path)
        : [...current, path];
      onSelectPath?.(newPaths);
      return newPaths;
    });
  };

  const handleRun = async () => {
    onOpenDrawer(false);
    onRun();
  };

  return (
    <DrawerRelative setOpenDrawer={(open) => onOpenDrawer(open)}>
      <ActionsSelectedTest
        fetchSuites={fetchSuites}
        selectedCount={selectedCount}
        isLoading={isLoading}
        handleRun={handleRun}
      />

      <div className="flex-1 min-h-0 p-3 rounded-md border border-slate-100/90 bg-slate-100 dark:border-slate-800/90 dark:bg-slate-900/80 shadow-panel">
        <div className="h-full custom-scroll overflow-y-auto  pr-3">
          <TestFieldList
            testTree={testTree}
            selectedPaths={selectedPaths}
            togglePath={togglePath}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 p-3 rounded-md border border-slate-100/90 bg-slate-100 dark:border-slate-800/90 dark:bg-slate-900/80 shadow-panel">
        <div className="h-full custom-scroll overflow-y-auto pr-3">
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
