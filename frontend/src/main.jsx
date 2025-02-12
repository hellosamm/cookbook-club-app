import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import Profile from "./components/Profile.jsx";
import AllEvents from "./pages/events/AllEvents.jsx";
import CreateEvent from "./pages/events/CreateEvent.jsx";
import ViewSingleEvent from "./pages/events/ViewSingleEvent.jsx";
import UserCreatedEvents from "./pages/events/UserCreatedEvents.jsx";
import ViewUpcomingEvents from "./pages/events/ViewUpcomingEvents.jsx";
import ManageAccount from "./pages/profile/ManageAccount.jsx";
import UpdateEvent from "./pages/events/UpdateEvent.jsx";

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
      {
        path: "update/:title/event/:id",
        element: <UpdateEvent />,
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
