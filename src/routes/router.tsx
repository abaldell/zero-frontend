import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard/Dashboard";
import TestsPage from "../pages/tests/Tests";
import MainLayout from "../layouts/MainLayout";
import SpiraTestPage from "../pages/spiratest/SpiraTest";

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
