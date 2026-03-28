import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { SchedulePage } from "./pages/schedule-page";
import { RevenuePage } from "./pages/revenue-page";
import { ProfilePage } from "./pages/profile-page";
import { AppointmentDetailPage } from "./pages/appointment-detail-page";
import { HistoryPage } from "./pages/history-page";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "schedule", Component: SchedulePage },
      { path: "revenue", Component: RevenuePage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  {
    path: "/appointment/:id",
    Component: AppointmentDetailPage,
  },
  {
    path: "/schedule/day/:day",
    Component: AppointmentDetailPage,
  },
  {
    path: "/history",
    Component: HistoryPage,
  },
]);