import { ECOpts_BT, ECOpts_Theo_BT } from "./EChartBT_Opts";
import { EChartThemed } from "../EChartThemed";

const EChartBT_Theo = ({ data, greek }) => {
  let ecOptions;
  if (data) {
    ecOptions = ECOpts_Theo_BT(data?.greek_theo, greek);
  }
  return <EChartThemed option={{ ...ecOptions }} style={{ height: "650px" }} />;
};

export default EChartBT_Theo;
