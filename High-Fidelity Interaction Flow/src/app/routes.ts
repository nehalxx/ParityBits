import { createBrowserRouter } from "react-router";
import Dashboard from "./screens/Dashboard";
import Calibration from "./screens/Calibration";
import ChaosEngine from "./screens/ChaosEngine";
import StatusReport from "./screens/StatusReport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/calibration",
    Component: Calibration,
  },
  {
    path: "/chaos-engine",
    Component: ChaosEngine,
  },
  {
    path: "/status",
    Component: StatusReport,
  },
]);
