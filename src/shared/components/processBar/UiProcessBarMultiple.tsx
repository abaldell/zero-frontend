interface UiProcessBarProps {
  groupCount: GroupCount[];
}

interface GroupCount {
  label: string;
  count: number;
}

interface GroupCountWithPercentage extends GroupCount {
  percentage: number;
}

export const UiProcessBarMultiple = (props: UiProcessBarProps) => {
  const { groupCount } = props;
  const addPercentage = (
    groupCount: GroupCount[],
  ): GroupCountWithPercentage[] => {
    const maxCount = Math.max(...groupCount.map((item) => item.count));

    return groupCount.map((item) => ({
      ...item,
      percentage: maxCount > 0 ? (item.count / maxCount) * 100 : 0,
    }));
  };
  const processMulti = addPercentage(groupCount);

  return (
    <div className="flex items-stretch w-28 h-5 rounded-md bg-slate-300 dark:bg-slate-900 overflow-auto">
      {processMulti.map((item: GroupCountWithPercentage) => (
        <div
          key={item.label}
          className={`h-full ${item.label === "passed" ? "bg-green-500" : item.label === "failed" ? "bg-red-500" : item.label === "empty" ? "bg-slate-500" : item.label === "blocked" ? "bg-orange-500" : ""} transition-all duration-500`}
          style={{ width: `${item.percentage}%` }}
        ></div>
      ))}
    </div>
  );
};
