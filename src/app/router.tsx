import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../features/dashboard";
import { TestsPage } from "../features/executions";
import MainLayout from "./layouts/MainLayout";
import { SpiraTestPage } from "../features/spiratest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/tests",
        element: <TestsPage />,
      },
      {
        path: "/testset",
        element: <SpiraTestPage />,
      },
      {
        path: "/tests/execution",
        element: <TestsPage isExecution={true} />,
      },
    ],
  },
]);
