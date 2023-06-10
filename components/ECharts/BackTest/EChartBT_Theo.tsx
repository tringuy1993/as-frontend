import ReactEcharts from "echarts-for-react";
import { ECOpts_BT, ECOpts_Theo_BT } from "./EChartBT_Opts";

const EChartBT_Theo = ({ data, greek }) => {
  let ecOptions;
  if (data) {
    console.log("Theo");
    console.log(data);
    ecOptions = ECOpts_Theo_BT(data?.greek_theo, greek);
    console.log(ecOptions);
  }
  return (
    <>
      {
        <ReactEcharts
          option={{ ...ecOptions }}
          style={{ height: "650px" }}
          //   theme={theme}
        />
      }
    </>
  );
};

export default EChartBT_Theo;
