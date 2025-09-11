import { createBrowserRouter } from "react-router-dom";
import DynamicFormPage from "../pages/DynamicFormPage.jsx";
import App from "./../App.jsx";
import { lazy } from "react";
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DynamicFormPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
    ],
  },
]);