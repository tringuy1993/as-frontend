import ReactEcharts from "echarts-for-react";
import { ECOpts_BT } from "./EChartBT_Opts";

const EChartBT = ({ data, greek }) => {
  let ecOptions;
  if (data) {
    ecOptions = ECOpts_BT(data, greek);
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

export default EChartBT;
