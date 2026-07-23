interface ProcessBarProps {
  progress: number;
  message: string;
}

export const ProcessBar = (props: ProcessBarProps) => {
  const { progress, message } = props;
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
