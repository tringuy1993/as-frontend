import React from "react";
import { Grid } from "@mantine/core";
import { combineESOptionData } from "../DataEChart";
import { ECOpts_ES_VolOI, EChartES_Opts } from "./EChartES_Opts";
import { EChartThemed } from "../EChartThemed";

const EChartES = ({ symbol, data, greek }) => {
  let ecOptions, ecVoloptions;
  if (data) {
    const modified_data = combineESOptionData(data, greek);
    ecOptions = EChartES_Opts(symbol, modified_data);
    ecVoloptions = ECOpts_ES_VolOI(symbol, modified_data);
  }

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        <EChartThemed option={{ ...ecOptions }} style={{ height: "650px" }} />
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <EChartThemed
          option={{ ...ecVoloptions }}
          style={{ height: "650px" }}
        />
      </Grid.Col>
    </Grid>
  );
};
export default EChartES;
