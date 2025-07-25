import { BarChart } from "@mui/x-charts";
import React from "react";
const BarChartComp = ({ lensesData, data }) => {
  //   console.log(lensesData);
  const colors = [
    getComputedStyle(document.documentElement).getPropertyValue(
      "--themeColor--"
    ),
  ];

  return (
    <div>
      <BarChart
        loading={!data ? true : false}
        xAxis={[
          { scaleType: "band", data: lensesData.map((lens) => lens.name) },
        ]}
        series={[
          {
            data: lensesData.map((lens) => lens.fetch_count),
            color: colors, // Apply colors dynamically
          },
        ]}
        // width={100}
        // width={100}
        borderRadius={5}
        barLabel="value"
        height={300}
      />
    </div>
  );
};

export default BarChartComp;
