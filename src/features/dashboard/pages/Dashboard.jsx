import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Preloader from "../../../shared/components/Preloader";
import Content from "./Content";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 simula carga inicial (luego lo conectas a tu API)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <Preloader text="Cargando..." />
      ) : (
        <Content />
      )}
    </DashboardLayout>
  );
}