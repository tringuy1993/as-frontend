import React from "react";
import ReactEcharts from "echarts-for-react";
import { Grid } from "@mantine/core";
import { combineESOptionData } from "../DataEChart";
import { ECOpts_ES_VolOI, EChartES_Opts } from "./EChartES_Opts";

const EChartES = ({ symbol, data, greek, theme }) => {
  let ecOptions, ecVoloptions;
  if (data) {
    const modified_data = combineESOptionData(data, greek);
    ecOptions = EChartES_Opts(symbol, modified_data);
    ecVoloptions = ECOpts_ES_VolOI(symbol, data);
  }

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        <ReactEcharts
          option={{ ...ecOptions }}
          style={{ height: "650px" }}
          theme={theme}
        />
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <ReactEcharts
          option={{ ...ecVoloptions }}
          style={{ height: "650px" }}
          theme={theme}
        />
      </Grid.Col>
    </Grid>
  );
};
export default EChartES;
