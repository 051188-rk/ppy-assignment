"use client";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import ChartSkeleton from "./ChartSkeleton";
ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

export default function ClientsBubbleChart({ data, loading }) {
  if (loading) return <ChartSkeleton />;

  const cfg = {
    datasets: [
      {
        label: "Online",
        data: [{ x: 5, y: 5, r: 30 }],
        backgroundColor: "rgba(16, 185, 129, 0.5)", // green
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
      {
        label: "New",
        data: [{ x: 5.5, y: 5, r: 28 }],
        backgroundColor: "rgba(59, 130, 246, 0.5)", // blue
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Active",
        data: [{ x: 5.2, y: 5.3, r: 26 }],
        backgroundColor: "rgba(234, 179, 8, 0.5)", // yellow
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 1,
      },
      {
        label: "Inactive",
        data: [{ x: 4.8, y: 5.1, r: 22 }],
        backgroundColor: "rgba(239, 68, 68, 0.5)", // red
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
        min: 4,
        max: 6,
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        min: 4,
        max: 6,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64 chart-container">
      <Bubble data={cfg} options={options} />
    </div>
  );
}
