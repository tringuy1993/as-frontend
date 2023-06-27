import { EChartThemed } from "../EChartThemed";
import { EChartToS_Theo_Opts } from "./EChartToS_Opts";

const EChartToS_Theo = ({ symbol, data, greek }) => {
  let ecOptions;
  if (data) {
    ecOptions = EChartToS_Theo_Opts(symbol, data, greek);
  }
  return <EChartThemed option={{ ...ecOptions }} style={{ height: "650px" }} />;
};

export default EChartToS_Theo;
