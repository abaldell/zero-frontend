interface SkeletonTestSuiteProps {
  type: "test" | "script";
}
export const SkeletonTestSuite = (props: SkeletonTestSuiteProps) => {
  const { type } = props;
  return (
    <>
      {type === "test" ? (
        <li className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-10 w-10 animate-pulse rounded-md bg-slate-300 dark:bg-slate-700" />
            <div className="h-10 flex-1 animate-pulse rounded-md bg-slate-300 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-10 w-10 animate-pulse rounded-md bg-slate-300 dark:bg-slate-700" />
            <div className="h-10 flex-1 animate-pulse rounded-md bg-slate-300 dark:bg-slate-700" />
          </div>
        </li>
      ) : (
        <li className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-10 w-full flex pe-3 justify-end items-center animate-pulse rounded-md bg-slate-300 dark:bg-slate-700">
              <div className="h-5 w-5 animate-pulse rounded-md bg-slate-100 dark:bg-slate-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-10 w-full flex pe-3 justify-end items-center animate-pulse rounded-md bg-slate-300 dark:bg-slate-700">
              <div className="h-5 w-5 animate-pulse rounded-md bg-slate-100 dark:bg-slate-500" />
            </div>
          </div>
        </li>
      )}
    </>
  );
};
