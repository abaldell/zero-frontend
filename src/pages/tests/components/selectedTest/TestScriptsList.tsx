import { SkeletonTestSuite } from "../../../../components/skeleton/SkeletonTestSuite";

export interface TestListProps {
  scriptSets: { key: string; description: string }[];
  selectedScriptKeys: string[];
  toggleScriptKey: (key: string) => void;
}

export const TestScriptsList = (props: TestListProps) => {
  const { scriptSets, selectedScriptKeys, toggleScriptKey } = props;

  return (
    <section className="p-1">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase font-semibold tracking-widest text-teal-500">
            Scripts disponibles
          </p>
        </div>
        <span className="rounded-2xl px-4 py-2 text-sm text-slate-500">
          {scriptSets.length} scripts
        </span>
      </div>

      <div className="space-y-3">
        {scriptSets.length === 0 ? (
          <SkeletonTestSuite type={"script"} />
        ) : (
          scriptSets.map((script) => {
            const checked = selectedScriptKeys.includes(script.key);
            return (
              <label
                key={script.key}
                className="flex cursor-pointer items-center justify-between rounded-md border border-slate-200/90 bg-slate-100 dark:border-slate-800/90 dark:bg-slate-950/80 px-4 py-4 transition hover:border-teal-400/40"
              >
                <div className="space-y-1">
                  <p className="text-base text-black/70 dark:text-slate-100">
                    {script.key}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleScriptKey(script.key)}
                  className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-teal-400"
                />
              </label>
            );
          })
        )}
      </div>
    </section>
  );
};
