import { useState } from "react";

import type { TestSetNodeInterface } from "../../../types/spiratest.types";
import { TestCaseNode } from "./TestCaseNode";

interface Props {
  testSet: TestSetNodeInterface;
}

export function TestSetNode({ testSet }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-2 font-medium"
      >
        {expanded ? "▼" : "▶"} {testSet.name}
      </button>

      {expanded &&
        testSet.testCases.map((testCase) => (
          <TestCaseNode key={testCase.id} testCase={testCase} />
        ))}
    </div>
  );
}
