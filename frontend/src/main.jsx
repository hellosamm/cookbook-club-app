import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import Profile from "./components/Profile.jsx";

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
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </StrictMode>
);
