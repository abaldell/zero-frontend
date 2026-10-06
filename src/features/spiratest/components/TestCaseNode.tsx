import type { TestCase } from "../types/spiratest.types";

interface Props {
  testCase: TestCase;
}

export function TestCaseNode({ testCase }: Props) {
  return <div className="ml-8 py-1">✅ {testCase.name}</div>;
}
