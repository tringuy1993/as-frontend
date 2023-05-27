import React from "react";

import { EChartTime_Opts } from "./EChartTime_Opts";
import ReactEcharts from "echarts-for-react";

const EChartTime = ({ data, theme }) => {
  let option, chartHeight, chartOptions;
  if (data) {
    option = EChartTime_Opts(data);
    chartOptions = option.option;
    chartHeight = option.chartHeight;
  }
  return (
    <>
      <ReactEcharts
        option={{ ...chartOptions }}
        style={{ height: chartHeight }}
        theme={theme}
        notMerge={true}
      ></ReactEcharts>
    </>
  );
};

export default EChartTime;
