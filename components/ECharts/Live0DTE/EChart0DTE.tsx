import React from "react";
import { Grid } from "@mantine/core";
import { combineESOptionData } from "../DataEChart";
import { EChart0DTE_Opts } from "./EChart0DTE_Opts";
import { EChartThemed } from "../EChartThemed";

const EChart0DTE = ({ data }) => {
  let ecOptions;
  if (data) {
    ecOptions = EChart0DTE_Opts(data);
  }

  return <EChartThemed option={{ ...ecOptions }} style={{ height: "650px" }} />;
};
export default EChart0DTE;
