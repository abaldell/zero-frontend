import { X } from "lucide-react";

export interface UiAlertProps {
  title: string;
  status: string;
  onClose: (close: boolean) => void;
}
const UiAlert = (props: UiAlertProps) => {
  const { title, status, onClose } = props;
  return (
    <div
      className={`absolute flex gap-3 items-center bottom-3 right-7 rounded-md p-3 w-fit ring-1 text-white ${status === "error" ? "bg-red-500/60 ring-red-300" : status === "success" ? "bg-green-500/60 ring-green-300" : "bg-green-500/60 ring-green-300"}`}
    >
      <p className="p-0">{title || "error de a saber"}</p>
      <X
        className={`rounded-2xl mt-0.5 ring-1 text-white ${status === "error" ? "bg-red-500/60 ring-red-300" : status === "success" ? "bg-green-500/60 ring-green-300" : "bg-green-500/60 ring-green-300"}`}
        size={15}
        onClick={() => onClose(false)}
      />
    </div>
  );
};

export default UiAlert;
