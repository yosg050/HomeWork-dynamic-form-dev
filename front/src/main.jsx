import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App";
import Providers from "./app/providers";
import { router } from "./app/routes";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
