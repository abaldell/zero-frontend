interface UiProcessBarProps {
  progress: number;
  message?: string;
}

export const UiProcessBar = (props: UiProcessBarProps) => {
  const { progress } = props;
  return (
    <div className="w-full">
      <div className=" w-full rounded-full bg-slate-300 dark:bg-slate-900">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <span className="ml-3 text-white dark:text-slate-950 font-bold">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
