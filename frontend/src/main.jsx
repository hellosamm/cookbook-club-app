import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Profile from "./components/Profile.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Authentication pageType={PageType.LOGIN} />,
      },
      {
        path: "register",
        element: <Authentication pageType={PageType.REGISTER} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
