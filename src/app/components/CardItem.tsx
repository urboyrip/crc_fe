"use client"

import Image from "next/image";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CardItemProps {
  title: string;
  iconSrc: string;
  targetLabel: string;
  targetAmount: string;
  achievedLabel: string;
  achievedAmount: string;
}

export default function CardItem({
  title,
  iconSrc,
  targetLabel,
  targetAmount,
  achievedLabel,
  achievedAmount,
}: CardItemProps) {
  // Parsing string to number
  const target = parseFloat(targetAmount.replace(/[^0-9]/g, ""));
  const achieved = parseFloat(achievedAmount.replace(/[^0-9]/g, ""));
  const percentage = achieved && target ? Math.min((achieved / target) * 100, 100) : 0;

  // Data donut chart
  const data = useMemo(() => ({
    labels: ["Tercapai", "Belum"],
    datasets: [
      {
        data: [achieved, Math.max(target - achieved, 0)],
        backgroundColor: ["#14b8a6", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  }), [achieved, target]);

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="border border-teal-500 rounded-xl p-5 shadow-sm w-full">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>

      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className="w-20 h-20 relative">
          <Image src={iconSrc} alt="Icon" layout="fill" objectFit="contain" />
        </div>

        {/* Target & Tercapai */}
        <div className="text-sm text-left space-y-1 mr-1">
          <div>
            <p className="text-gray-600">{targetLabel}</p>
            <p className="font-bold text-gray-800">{targetAmount}</p>
          </div>
          <div>
            <p className="text-gray-600">{achievedLabel}</p>
            <p className="font-bold text-teal-600">{achievedAmount}</p>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="w-20 h-20 flex items-center justify-center relative">
          <Doughnut data={data} options={options} />
          <div className="absolute text-xs font-bold text-gray-700">
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
