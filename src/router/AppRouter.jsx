import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayOut from "../layOut/AppLayOut";
import DashBoard from "../pages/DashBoard";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Booking from "../pages/Booking";
import CheckIn from "../pages/CheckIn";
import Login from "../pages/Login";
import Account from "../pages/Account";
import ProtectedRoute from "./ProtectedRoute";
const routes = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayOut />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "bookings/:bookingId",
        element: <Booking />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "checkIn/:bookingId",
        element: <CheckIn />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function AppRouter() {
  return <RouterProvider router={routes} />;
}
export default AppRouter;
