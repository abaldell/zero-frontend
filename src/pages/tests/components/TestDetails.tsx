import { useEffect, useState } from "react";
import { CircleIcon, Clock, FolderOpen } from "lucide-react";
import { today } from "../../../utils/Utils";
import Popup from "../../../components/ui/UiPopup";
import type { TestAttachment, TestResult } from "../../../types/test.type";
import { UiAccordion } from "../../../components/ui";

interface TestDetailProps {
  test: TestResult;
}
const TestDetail = (props: TestDetailProps) => {
  const { test } = props;
  const [traceTest, setTraceTest] = useState<TestAttachment>();
  const [screenShot, setScreenShot] = useState<TestAttachment>();
  const [openImage, setOpenImage] = useState(false);

  useEffect(() => {
    if (test.attachments) {
      getTestTrace();
      getTestScreen();
    }
  }, [test]);

  const getTestTrace = () => {
    const trace = test.attachments.find((a) => a.name === "trace");
    setTraceTest(trace);
  };

  const getTestScreen = () => {
    const screen = test.attachments.find((a) => a.name === "screenshot");
    setScreenShot(screen);
  };

  return (
    <div className="min-h-screen text-black/70 dark:text-white">
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-md font-bold">{test.title}</h1>
            </div>

            <div className="flex flex-row items-center gap-x-3">
              {test.status === "running" && (
                <CircleIcon
                  size={18}
                  className="bg-sky-600 text-sky-600 ring-1 ring-inset ring-sky-600/20 rounded-2xl"
                />
              )}
              {test.status === "failed" && (
                <CircleIcon
                  size={18}
                  className="bg-red-600 text-red-700 ring-1 ring-inset ring-red-500/20 rounded-2xl"
                />
              )}
              {test.status === "passed" && (
                <CircleIcon
                  size={18}
                  className="bg-green-600 text-green-700 ring-1 ring-inset ring-green-500/20 rounded-2xl"
                />
              )}
              {test.status?.toUpperCase()}
            </div>
          </div>
          <div className="mt-3">
            <code className="rounded bg-slate-300 dark:bg-slate-800 flex px-3 py-2 text-sm text-black/70 dark:text-teal-500">
              <div className="flex items-center gap-1">
                <Clock size={15} />
                <span className="">{today()}</span>
              </div>
              <div className="mx-3"> | </div>
              <div className="flex items-center gap-1">
                <FolderOpen size={15} />
                {test.file}
              </div>
            </code>
          </div>
        </div>

        <div className="my-3">
          {test.steps &&
            test.steps.map((step, index) => (
              <UiAccordion key={index} step={step} level={0} />
            ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30 dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-6">
            <h3 className="mb-3 font-semibold">Screenshot</h3>

            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-700">
              {screenShot ? (
                <div className="overflow-hidden rounded-md w-full max-h-52">
                  <img
                    src={screenShot.path}
                    alt="screenshot"
                    width={1920}
                    height={1080}
                    className="w-full h-full rounded-md"
                    onClick={() => setOpenImage(true)}
                  />
                  <Popup openImage={openImage} onCloseImage={setOpenImage}>
                    <img
                      src={screenShot.path}
                      alt="screenshot"
                      width={1920}
                      height={1080}
                      className="w-full h-full rounded-md"
                    />
                  </Popup>
                </div>
              ) : (
                <span className="text-slate-500">No screenshot available</span>
              )}
            </div>
          </div>

          <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30 dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-6">
            <h3 className="mb-3 font-semibold">Video / Trace</h3>

            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-700">
              {traceTest ? (
                <span className="text-slate-500">
                  {traceTest.name}: {traceTest.path}
                </span>
              ) : (
                <span className="text-slate-500">No trace available</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="p-4">
            <p className="text-xs uppercase text-slate-500">Project</p>
            <p className="mt-2 font-medium">{test.project}</p>
          </div>

          <div className="p-4">
            <p className="text-xs uppercase text-slate-500">Retries</p>
            <p className="mt-2 font-medium">{test.retries}</p>
          </div>

          <div className=" p-4">
            <p className="text-xs uppercase text-slate-500">Test ID</p>
            <p className="mt-2 truncate font-mono text-sm">{test.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
