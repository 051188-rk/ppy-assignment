"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip,
} from "chart.js";
import ChartSkeleton from "./ChartSkeleton";
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip);

export default function SipBusinessChart({ data, loading }) {
  if (loading) return <ChartSkeleton />;

  const labels = data?.labels ?? ["Mar", "Apr", "May", "Jun"];
  const bars = data?.bars ?? [1.6, 0.4, 1.1, 1.6];
  const line = data?.line ?? [120, 100, 98, 110];

  return (
    <div className="h-80 p-4 bg-white dark:bg-gray-800 rounded-lg shadow relative chart-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">SIP Business</h3>
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
          View Trend →
        </button>
      </div>
      <div className="h-64">
        <Bar
          data={{
            labels,
            datasets: [
              { 
                type: "bar", 
                label: "SIP Volume", 
                data: bars,
                backgroundColor: '#3B82F6', // Blue
                borderColor: '#1D4ED8',
                borderWidth: 1,
                borderRadius: 4,
              },
              { 
                type: "line", 
                label: "Index", 
                data: line,
                borderColor: '#10B981', // Green
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#10B981',
                pointBorderWidth: 2,
                tension: 0.3,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  padding: 20,
                }
              } 
            },
            scales: { 
              y: { 
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                }
              },
              x: {
                grid: {
                  display: false,
                }
              }
            },
          }}
        />
      </div>
    </div>
  );
}
