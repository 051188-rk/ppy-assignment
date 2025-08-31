"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
} from "chart.js";
import ChartSkeleton from "./ChartSkeleton";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip, Filler);

export default function MonthlyMisChart({ data, loading }) {
  if (loading) return <ChartSkeleton />;

  const labels = data?.labels ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const d1 = data?.d1 ?? [0.1, 0.25, 0.18, 0.22, 0.5, 0.3];
  const d2 = data?.d2 ?? [0.05, 0.2, 0.35, 0.28, 0.48, 0.18];
  const d3 = data?.d3 ?? [0.2, 0.15, 0.1, 0.18, 0.42, 0.26];
  const d4 = data?.d4 ?? [0.15, 0.12, 0.2, 0.3, 0.35, 0.22]; // New dataset

  return (
    <div className="h-64 chart-container">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Equity",
              data: d1,
              fill: true,
              borderColor: "rgba(239, 68, 68, 1)", // red-500
              backgroundColor: "rgba(239, 68, 68, 0.2)"
            },
            {
              label: "Debt",
              data: d2,
              fill: true,
              borderColor: "rgba(34, 197, 94, 1)", // green-500
              backgroundColor: "rgba(34, 197, 94, 0.2)"
            },
            {
              label: "Hybrid",
              data: d3,
              fill: true,
              borderColor: "rgba(59, 130, 246, 1)", // blue-500
              backgroundColor: "rgba(59, 130, 246, 0.2)"
            },
            {
              label: "Other",
              data: d4,
              fill: true,
              borderColor: "rgba(168, 85, 247, 1)", // purple-500
              backgroundColor: "rgba(168, 85, 247, 0.2)"
            }
          ]
        }}
        options={{
          plugins: { legend: { position: "bottom" } },
          maintainAspectRatio: false,
          responsive: true
        }}
      />
    </div>
  );
}
