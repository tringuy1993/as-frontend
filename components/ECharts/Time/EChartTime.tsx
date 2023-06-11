import React from "react";
import { EChartTime_Opts } from "./EChartTime_Opts";
import { EChartThemed } from "../EChartThemed";

const EChartTime = ({ data }) => {
  let option, chartHeight, chartOptions;
  if (data) {
    option = EChartTime_Opts(data);
    chartOptions = option.option;
    chartHeight = option.chartHeight;
  }
  return (
    <>
      <EChartThemed
        option={{ ...chartOptions }}
        style={{ height: chartHeight }}
        notMerge={true}
      ></EChartThemed>
    </>
  );
};

export default EChartTime;
