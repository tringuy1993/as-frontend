"use client";
import { useState } from "react";
import { Grid, Card, useMantineColorScheme } from "@mantine/core";
import { format } from "date-fns";
import useFetch from "@/app/api/useFetch";
import { BACKTEST_AVAIL_DATE, BACKTEST_URL } from "@/app/api/apiURLs";
import { TimePicker, EChartBT, BTDatePicker } from "@/components";
import TimeSlider from "@/components/timepicker/TimeSlider";
import EChartBT_Theo from "@/components/ECharts/BackTest/EChartBT_Theo";

const BackTest = () => {
  // const { data: available_dates } = useFetch("", BACKTEST_AVAIL_DATE, "", "");

  // if (available_dates) {
  //   console.log(new Date(available_dates?.data[0]["partioned_name"]));
  // }

  const [selectedDateRange] = useState([
    new Date("2018-08-04"),
    new Date("2018-08-04"),
  ]);
  const [finalDate, setFinalDate] = useState(selectedDateRange);
  const handleSubmit = (selectedDateRange) => {
    setFinalDate(() => selectedDateRange.dateRange);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const handleTimeChange = (time) => {
    // Set the selected time in state
    setSelectedTime(time);
  };

  const [currentTime, setCurrentTime] = useState("09:31:00");
  const handleTimeChange2 = (time) => {
    setCurrentTime(time);
  };

  const update_param = [finalDate, currentTime];
  const updateInterval = 0;
  const params = {
    trade_date: format(finalDate[0], "yyyy-MM-dd"),
    expiration: format(finalDate[1], "yyyy-MM-dd"),
    trade_time: currentTime,
    all_greeks: true,
  };

  const { data } = useFetch(params, BACKTEST_URL, update_param, updateInterval);

  return (
    <>
      <Grid justify="center">
        <Grid.Col>
          <BTDatePicker onSubmit={handleSubmit} BackTest={true} />
          <TimeSlider onTimeChange={handleTimeChange2} />
          <p>Selected time: {currentTime}</p>
        </Grid.Col>
      </Grid>

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
      {/* <Grid>
        <Grid.Col sm={12} md={6}>
          <Card bg="transparent">
            <EChartBT data={data} greek={"theta"} />
          </Card>
        </Grid.Col>

        <Grid.Col sm={12} md={6}>
          <Card bg="transparent">
            <EChartBT data={data} greek={"vanna"} />
          </Card>
        </Grid.Col>
      </Grid> */}
    </>
  );
};

export default BackTest;
