import { FileSearch } from "lucide-react";
import { getApiFiles } from "../../utils/Utils";

interface TraceCardProps {
  traceUrl: string;
}
export const TraceCard = (props: TraceCardProps) => {
  const { traceUrl } = props;
  if (!traceUrl) return null;

  const tracePath = new URL(traceUrl).pathname;
  const resultsPathIndex = tracePath.lastIndexOf("/test-results/");
  if (resultsPathIndex === -1) return null;

  const relativeTracePath = decodeURIComponent(
    tracePath.slice(resultsPathIndex + "/test-results/".length),
  );
  const traceViewerUrl = `${getApiFiles()}/trace-viewer?path=${encodeURIComponent(relativeTracePath)}`;
  return (
    <a
      href={traceViewerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-teal-500 hover:bg-teal-500/50 text-white dark:bg-teal-500/30 dark:hover:bg-teal-500/50 dark:text-white ring-1 ring-inset ring-teal-200/30 rounded-md flex gap-1 items-center p-2 transition-all duration-300"
    >
      <FileSearch size={20} />
      Ver trazada
    </a>
  );
};

export default TraceCard;
