import { BACKTEST_URL } from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";
import { EChartBT } from "@/components";
import EChartBT_Theo from "@/components/ECharts/BackTest/EChartBT_Theo";
import { useBTDatePickerStore, useBTTimePickerStore } from "@/store";
import { Card, Grid } from "@mantine/core";
import { format } from "date-fns";

export const BackTestCharts = () => {
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();
  const update_param = [BackTestDate, BackTestTime];
  const updateInterval = 0;
  const params = {
    trade_date: format(BackTestDate[0], "yyyy-MM-dd"),
    expiration: format(BackTestDate[1], "yyyy-MM-dd"),
    trade_time: BackTestTime,
    all_greeks: true,
  };

  const { data } = useFetch(params, BACKTEST_URL, update_param, updateInterval);

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        <Card bg="transparent">
          <EChartBT_Theo data={data} greek={"gamma"} />
        </Card>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Card bg="transparent">
          <EChartBT data={data} greek={"gamma"} />
        </Card>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Card bg="transparent">
          <EChartBT data={data} greek={"vanna"} />
        </Card>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Card bg="transparent">
          <EChartBT data={data} greek={"delta"} />
        </Card>
      </Grid.Col>
    </Grid>
  );
};
