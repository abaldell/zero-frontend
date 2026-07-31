import { useEffect, useState } from "react";
import { getAllTestTree } from "../../services/spiratest.service";
import { TestSet } from "./components/TestSet";
import type { SpiraTestSet } from "../../types/spiratest.types";
import { useNavStore } from "../../store/navStore";
import { SidebarProjectId } from "./components/SidebarProjectId";
import { DetailsTestSet } from "./components/detailsTestSet/DetailsTestSet";
import { Spinner } from "flowbite-react";

export default function SpiraTestPage() {
  const [testSets, setTestSets] = useState<SpiraTestSet[]>([]);
  const [testSetId, setTestSetId] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllTestTree(1);

        setTestSets(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div
      className={`flex  flex-col ${open ? "w-5/6" : "w-[94%]"} ${openDrawer ? "absolute top-0 right-0" : "relative"} transition-transform duration-300`}
    >
      <div
        className={`flex gap-3 p-3 transition-transform duration-300 ${loading ? "items-center justify-center" : "items-stretch"} h-screen`}
      >
        {loading ? (
          <Spinner
            color="info"
            aria-label="Extra large Info spinner"
            size="xl"
          />
        ) : (
          <>
            <div
              className={`${testSetId ? "w-1/4" : "hidden"} overflow-y-auto transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
            >
              <SidebarProjectId
                testSets={testSets}
                testSelected={testSetId}
                onSetOpen={setTestSetId}
              />
            </div>

            <div
              className={`${testSetId ? "w-3/4" : "w-full"} custom-scroll overflow-y-auto dark:scrollbar-thumb-teal-500 dark:scrollbar-track-slate-900 transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
            >
              {testSetId ? (
                <DetailsTestSet testSelected={testSetId} />
              ) : (
                <TestSet data={testSets} onSetId={setTestSetId} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
