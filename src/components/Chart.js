import React from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ data, firstDataKey, secondDataKey }) {
  return (
    <ResponsiveContainer width={"95%"} height={250}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 0, left: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id={"sold"} x1="0" y1="0" x2="0" y2="1">
            <stop offset={"5%"} stopColor={"#2dff19"} stopOpacity={0.8} />
            <stop offset={"95%"} stopColor={"#2dff19"} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={"bought"} x1="0" y1="0" x2="0" y2="1">
            <stop offset={"5%"} stopColor={"#ff1919"} stopOpacity={0.8} />
            <stop offset={"95%"} stopColor={"#ff1919"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={"date"} />
        <YAxis />

        <Tooltip />
        <Legend />
        <Area
          type={"monotone"}
          stroke={"#ff1919"}
          dataKey={firstDataKey}
          fill={"url(#bought)"}
        />
        <Area
          type={"monotone"}
          stroke={"#2dff19"}
          dataKey={secondDataKey}
          fill={"url(#sold)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
