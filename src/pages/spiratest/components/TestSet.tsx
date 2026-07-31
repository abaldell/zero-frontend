import { UiProcessBarMultiple } from "../../../components/processBar/UiProcessBarMultiple";
import type { SpiraTestSet } from "../../../types/spiratest.types";
import { formatDate } from "../../../utils/Utils";

interface TestSetProps {
  data: SpiraTestSet[];
  onSetId: (id: number) => void;
}
export const TestSet = (props: TestSetProps) => {
  const { data, onSetId } = props;

  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
      <table className="min-w-full divide-y divide-table-line">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase"
            >
              Estado ejecución
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase"
            >
              Lanzamiento
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-end text-xs font-medium text-muted-foreground-1 uppercase"
            >
              Última ejecución
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-table-line">
          {data.map((testSet: SpiraTestSet) => {
            const counts = [
              { label: "passed", count: testSet.CountPassed },
              { label: "failed", count: testSet.CountFailed },
              { label: "empty", count: testSet.CountNotRun },
              { label: "blocked", count: testSet.CountBlocked },
            ];

            const lastDate = formatDate(testSet.LastUpdateDate);
            return (
              <tr
                key={testSet.TestSetId}
                className="hover:bg-muted-hover"
                onClick={() => onSetId(testSet.TestSetId)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {testSet.TestSetId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {testSet.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <UiProcessBarMultiple
                    key={`bar-${testSet.TestSetId}`}
                    groupCount={counts}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {testSet.ReleaseVersionNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {testSet.TestSetStatusName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground text-end">
                  {lastDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
