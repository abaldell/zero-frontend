import type { TestSetNodeInterface } from "../../../types/spiratest.types";
import { TestSetNode } from "./TestSetNode";

interface Props {
  testSets: TestSetNodeInterface[];
}

export function TestTree({ testSets }: Props) {
  return (
    <div>
      {testSets.map((testSet) => (
        <TestSetNode key={testSet.id} testSet={testSet} />
      ))}
    </div>
  );
}
