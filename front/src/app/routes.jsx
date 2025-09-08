import { createBrowserRouter } from "react-router-dom";
import DynamicFormPage from "../pages/DynamicFormPage.jsx";
// import NotFound from "../pages/NotFound.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <DynamicFormPage /> },
  // { path: "*", element: <NotFound /> },
]);
