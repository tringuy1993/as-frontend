import ReactEcharts from "echarts-for-react";
import { useMantineColorScheme } from "@mantine/core";
import { EChartsOption } from "echarts-for-react";

type EChartThemedProps = {
  option: EChartsOption;
  style?: React.CSSProperties;
  notMerge?: EChartsOption;
  // Add other prop types as needed
};
export const EChartThemed: React.FC<EChartThemedProps> = ({
  option,
  style,
  ...props
}) => {
  const theme = useMantineColorScheme();

  return (
    <ReactEcharts
      option={option}
      style={style}
      theme={theme.colorScheme}
      {...props}
    />
  );
};
