import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard/Dashboard";
import TestsPage from "../pages/tests/Tests";
import MainLayout from "../layouts/MainLayout";

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
    ],
  },
]);
