import { Fragment, useState } from "react";
import { CircleIcon, Clock, FolderOpen } from "lucide-react";
import { today } from "../../../utils/Utils";
import Popup from "../../../components/ui/UiPopup";
import type { TestResult } from "../../../types/test.type";
import { UiAccordion } from "../../../components/ui";
import TraceCard from "../../../components/cards/TraceCard";
import { useExecutionStore } from "../../../store/executionStore";
// import type { PwExecution } from "../../../types/playwright";

interface TestDetailProps {
  test: TestResult;
}
const TestDetail = (props: TestDetailProps) => {
  const { test } = props;
  const updateExecuteSpiraStep = useExecutionStore(
    (state) => state.updateExecuteSpiraStep,
  );
  const updateExecuteSpiraStatusStep = useExecutionStore(
    (state) => state.updateExecuteSpiraStatusStep,
  );
  const executeSpira = useExecutionStore((state) => state.executeSpira);
  const testSpira = executeSpira.find(
    (spira) => spira.playwrightTestId === test.id,
  );
  const traceTest = test.attachments.find((a) => a.name === "trace");
  const screenShot = test.attachments.find((a) => a.name === "screenshot");
  const video = test.attachments.find((a) => a.name === "video");
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const changeExecuteSpira = (value: string, stepIndex: number) => {
    updateExecuteSpiraStep(testSpira?.spiraTestCaseId || "", stepIndex, value);
  };

  const changeStatusStep = (newValue: string, stepIndex: number) => {
    updateExecuteSpiraStatusStep(
      testSpira?.spiraTestCaseId || "",
      stepIndex,
      newValue,
    );
  };

  return (
    <div className=" text-black/70 dark:text-white">
      <div className="mx-auto  space-y-6 p-6">
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

        <div className="flex w-full justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500 mb-1">
              Project: <span className="mt-2 font-medium">{test.project}</span>
            </p>
            <p className="text-xs uppercase text-slate-500">
              Test ID: <span className="mt-2 font-medium">{test.id}</span>
            </p>
          </div>
          {traceTest && <TraceCard traceUrl={traceTest.path} />}
        </div>

        <div className="my-3">
          {test.steps &&
            test.steps.map((step, i) => {
              const executeDetail = testSpira?.steps?.find(
                (spira) => spira.name === step.title,
              );
              return (
                <Fragment key={`${test.id}-${i}`}>
                  <UiAccordion step={step} level={0} />
                  {testSpira && (
                    <div className="rounded-md shadow ring-1 ring-inset ring-slate-200 dark:ring-slate-700 bg-slate-200 dark:bg-slate-800 p-3">
                      <div className="flex justify-between">
                        <h3>Reporte step</h3>
                        <select
                          id={`step-${i}`}
                          value={
                            executeDetail?.status ??
                            (step.error ? "failed" : "passed")
                          }
                          onChange={(e) => changeStatusStep(e.target.value, i)}
                          className={`rounded-md p-2 capitalize ${executeDetail?.status === "passed" ? "bg-green-600/20" : executeDetail?.status === "failed" ? "bg-red-600/20" : executeDetail?.status === "blocked" ? "bg-orange-600/20" : "bg-yellow-600/20"}`}
                        >
                          <option className="bg-green-600/30">passed</option>
                          <option className="bg-red-600/30">failed</option>
                          <option className="bg-orange-500/30">blocked</option>
                          <option className="bg-yellow-300/30">caution</option>
                        </select>
                      </div>
                      <textarea
                        className="w-full min-h-36 rounded-md mt-3 shadow ring-1 ring-inset ring-slate-200 focus-visible:ring-slate-700 dark:ring-slate-700 bg-slate-200 dark:bg-slate-800 p-3"
                        id={`${test.id}-${i.toString()}`}
                        placeholder="Breve descripción del resultado"
                        value={executeDetail?.actualResult ?? ""}
                        onChange={(text) =>
                          changeExecuteSpira(text.target.value, i)
                        }
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
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
                  <Popup open={openImage} onClose={setOpenImage}>
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
              {screenShot ? (
                <div className="overflow-hidden rounded-md w-full max-h-52">
                  <img
                    src={screenShot.path}
                    alt="screenshot"
                    width={1920}
                    height={1080}
                    className="w-full h-full rounded-md"
                    onClick={() => setOpenVideo(true)}
                  />
                  <Popup open={openVideo} onClose={setOpenVideo}>
                    <video
                      controls
                      width="100%"
                      className="w-full h-full rounded-md"
                    >
                      <source src={video?.path} type={video?.contentType} />
                    </video>
                  </Popup>
                </div>
              ) : (
                <span className="text-slate-500">No screenshot available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
