import DashboardLayout from "../components/layout/DashboardLayout";
import Content from "./Content";

export default function Dashboard() {
  return (
    <div>
      <DashboardLayout>
        <Content />
      </DashboardLayout>
    </div>
  );
}