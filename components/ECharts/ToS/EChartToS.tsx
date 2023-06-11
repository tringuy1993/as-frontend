import React, { useState, useEffect } from "react";
import { EChartToS_Opts } from "./EChartToS_Opts";
import { Grid } from "@mantine/core";
import { EChart_Opts_VolOI } from "../EChart_Opts_VolOI";
import { modify_data } from "../UtilECharts";
import { EChartThemed } from "../EChartThemed";

export default function EChartToS({ symbol, data, theoData, greek }) {
  let ecOptions, ecVoloptions;
  if (data) {
    const { modified_data, nonzero_data } = modify_data(data, greek);
    if (theoData) {
      for (let i = 0; i < theoData.length; i++) {
        theoData[i].index = i;
      }
    }
    ecOptions = EChartToS_Opts(symbol, nonzero_data, theoData, greek);
    ecVoloptions = EChart_Opts_VolOI(symbol, modified_data);
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
}
