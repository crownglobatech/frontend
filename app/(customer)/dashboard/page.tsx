import Loader from "@/app/components/general/Loader";
import DashboardComponent from "./components/DashboardComoponent";
import { Suspense } from "react";
export default function CustomerDashboard() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <DashboardComponent />
      </Suspense>
    </div>
  );
}
