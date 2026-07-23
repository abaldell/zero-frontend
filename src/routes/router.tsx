import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
]);
