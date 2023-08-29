import { formatNumbers, datasets, commonOptions } from "../UtilECharts";

export function EChart0DTE_Opts(chartData) {
  // Setting dimensions and get 'dataset' for Echarts
  const SGdimensions = [
    "otm_market_premium",
    "saved_datetime",
    "uticker_last_price",
    "uticker",
  ];
  const dataset = datasets(chartData, [], SGdimensions, []);
  const legends = ["$Call", "$Put", "$Total"];
  const colors = ["#e01f54", "#0098d9", "#001852", "#e6b600"];
  // Creating Series that an array of length 4 (put, call, totalgamma, theogamma)
  let series = [
    {
      datasetIndex: 0,
      xAxisIndex: 0,
      type: "line",
      barGap: "-100%",
      itemStyle: { color: colors[0] },
      name: legends[0],
    },
    {
      datasetIndex: 0,
      xAxisIndex: 0,
      type: "line",
      barGap: "-100%",
      itemStyle: { color: colors[1] },
      name: legends[1],
    },
    {
      datasetIndex: 0,
      xAxisIndex: 0,
      type: "line",
      barGap: "-100%",
      itemStyle: { color: colors[2] },
      name: legends[2],
    },
  ];

  const option = {
    title: [
      // {
      //   text: `${symbol} Sum: ${SumTotalGEX}`,
      //   left: "center",
      //   textStyle: { fontSize: 30 },
      // },
    ],
    ...commonOptions,
    grid: [{ left: 30, right: 30, bottom: 30 }],
    dataset: dataset,
    series: series,
    xAxis: [
      {
        xAxisIndex: 0,
        type: "category",
        axisLabel: {
          frontWeight: "bold",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: function (value) {
            return formatNumbers(value);
          },
          fontWeight: "bold",
          rotate: 90,
        },
        max: function (value) {
          return value.max;
        },
        min: function (value) {
          return value.min;
        },
      },
    ],
  };

  return option;
}
