import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TestResult } from "../types/test.type";
import { executionService } from "../services/execution.service";
import {
  buildResultsMap,
  loadPlaywrightResults,
} from "../utils/ReadReport";
import { useExecutionEvents } from "./useExecutionEvents";
import { useExecutionStore } from "../state/executionStore";
import type { TestRunSummary } from "../types/playwright";

export function useExecutionFlow() {
  const navigate = useNavigate();
  const testsStore = useExecutionStore((state) => state.testsStore);
  const isFinished = useExecutionStore((state) => state.isFinishedStore);
  const totalTests = useExecutionStore((state) => state.totalTestsStore);
  const spiraTestCases = useExecutionStore((state) => state.spiraTestCases);
  const setLoading = useExecutionStore((state) => state.setLoadingExecutions);
  const setFinished = useExecutionStore((state) => state.setFinishedExecutions);
  const setProgress = useExecutionStore((state) => state.setProgressExecutions);
  const setDuration = useExecutionStore((state) => state.setDurationExecutions);
  const setTotal = useExecutionStore((state) => state.setTotalExecutions);
  const setTestExecutions = useExecutionStore((state) => state.setTestExecutions);
  const setSummary = useExecutionStore((state) => state.setSummaryExecutions);
  const setResults = useExecutionStore((state) => state.setResultTestExecutions);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [selectedScriptKeys, setSelectedScriptKeys] = useState<string[]>([]);

  useExecutionEvents({
    onMessage: (message) => {
      if (message.type === "execution-started") {
        setTests([]);
        setTestExecutions([]);
        setFinished(false);
        setLoading(true);
      }

      if (message.totalTest) {
        setTotal(message.totalTest);
      }

      if (message.type === "test-started" || message.type === "test-finished") {
        setTests((currentTests) => {
          const nextTests = [...currentTests];
          const index = nextTests.findIndex((test) => test.id === message.id);

          if (index >= 0) {
            nextTests[index] = {
              ...nextTests[index],
              ...message,
            } as TestResult;
          } else {
            nextTests.push(message as unknown as TestResult);
          }
          return nextTests;
        });
      }

      if (message.type === "execution-finished") {
        if (message.result) setSummary(message.result);
        setFinished(true);
        setLoading(false);
      }

      if (message.type === "summary") {
        setSummary(message as unknown as TestRunSummary);
      }
    },
  });

  useEffect(() => {
    if (tests.length === 0) return;

    setTestExecutions(tests);
    setDuration(tests.reduce((duration, test) => duration + (test.duration ?? 0), 0));

    if (!totalTests) {
      setProgress(0);
      return;
    }

    const completed = tests.filter((test) =>
      ["passed", "failed", "skipped"].includes(test.status ?? ""),
    ).length;
    setProgress(Math.round((completed / totalTests) * 100));
  }, [tests, totalTests, setDuration, setProgress, setTestExecutions]);

  useEffect(() => {
    if (!isFinished) return;

    const readResults = async () => {
      const report = await loadPlaywrightResults();
      const selectedCaseIds = spiraTestCases.map((testCase) => testCase.id);
      const resultsMap = buildResultsMap(report, testsStore, selectedCaseIds);
      setResults(resultsMap);

      if (selectedCaseIds.length > 0) {
        const results = Object.values(resultsMap).flat();
        setTestExecutions(results);
        setTotal(results.length);
        setDuration(
          results.reduce((duration, result) => duration + (result.duration ?? 0), 0),
        );
      }
    };

    readResults().catch((error) =>
      console.error("Error al cargar el reporte:", error),
    );
  }, [
    isFinished,
    spiraTestCases,
    testsStore,
    setDuration,
    setResults,
    setTestExecutions,
    setTotal,
  ]);

  const runTests = async () => {
    setTests([]);
    navigate("/tests");

    try {
      await executionService.run({ selectedPaths, selectedScriptKeys });
    } catch (error) {
      setLoading(false);
      console.error("Error al iniciar la ejecución:", error);
    }
  };

  return {
    selectedPaths,
    setSelectedPaths,
    selectedScriptKeys,
    setSelectedScriptKeys,
    runTests,
  };
}
