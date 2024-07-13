"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305},
  { month: "March", desktop: 237},
  { month: "April", desktop: 73},
  { month: "May", desktop: 209},
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  }
} satisfies ChartConfig;

const DashboardChart = () => {
  return (
      <div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[450px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
      </div>
  );
};

export default DashboardChart;
