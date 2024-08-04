"use client";

import { brdata } from "@/app/dummydata";
import { Bar, BarChart ,ResponsiveContainer, XAxis, YAxis} from "recharts";


const DashboardChart = () => {


  return (
    <ResponsiveContainer width={'100%'} height={450}>
    <BarChart data={brdata}>
        <XAxis
        dataKey={'month'}
        tickLine={false}
        axisLine={false}
        stroke="bg-bank-gradient"
        fontSize={12}/>
        <YAxis
        tickLine={false}
        axisLine={false}
        stroke="bg-bank-gradient"
        fontSize={12}
        tickFormatter={(value)=> `PKR${value}`}
        />
        <Bar dataKey={'donation'}
        fill="bg-bank-gradient"
        radius={[4,4,0,0]}/>
    </BarChart>

</ResponsiveContainer>
  );
};

export default DashboardChart;
