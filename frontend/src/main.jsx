import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import Profile from "./components/Profile.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ViewSingleEvent from "./pages/ViewSingleEvent.jsx";
import UserCreatedEvents from "./pages/UserCreatedEvents.jsx";
import ViewUpcomingEvents from "./pages/ViewUpcomingEvents.jsx";
import ManageAccount from "./pages/ManageAccount.jsx";

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
      {
        path: "allEvents",
        element: <AllEvents />,
      },
      {
        path: "createEvent",
        element: <CreateEvent />,
      },
      {
        path: "/:title/event/:id",
        element: <ViewSingleEvent />,
      },
      {
        path: "manageEvents",
        element: <UserCreatedEvents />,
      },
      {
        path: "upcomingEvents",
        element: <ViewUpcomingEvents />,
      },
      {
        path: "manageAccount",
        element: <ManageAccount />,
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
