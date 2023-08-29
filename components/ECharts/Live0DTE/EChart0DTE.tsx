import React from "react";
import { Grid } from "@mantine/core";
import { combineESOptionData } from "../DataEChart";
import { EChart0DTE_Opts } from "./EChart0DTE_Opts";
import { EChartThemed } from "../EChartThemed";

const EChart0DTE = ({ data }) => {
  let ecOptions, ecVoloptions;
  if (data) {
    ecOptions = EChart0DTE_Opts(data);
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
export default EChart0DTE;
