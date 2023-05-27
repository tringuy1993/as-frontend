"use client";
import { useState } from "react";
import { Grid, Card, useMantineColorScheme } from "@mantine/core";

import { format } from "date-fns";
import useFetch from "@/app/api/useFetch";
import { BACKTEST_AVAIL_DATE, BACKTEST_URL } from "@/app/api/apiURLs";
import { DatePicker, TimePicker, EChartBT } from "@/components";
import TimeSlider from "@/components/timepicker/TimeSlider";

function getMarkedRanges(data) {
  const markedRanges = [];
  if (data?.data) {
    data?.forEach((item) => {
      const date = new Date(
        item.partioned_name.slice(0, 4), // year
        item.partioned_name.slice(4, 6) - 1, // month (0-based)
        item.partioned_name.slice(6)
      ); // day
      [...markedRanges].push({
        from: date,
        to: date,
        color: "blue",
      });
    });
  }

  return { markedRanges };
}

const BackTest = () => {
  // const theme = useMantineColorScheme().colorScheme;

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
  console.log(data);
  const { available_dates } = useFetch(
    "",
    BACKTEST_AVAIL_DATE,
    update_param,
    updateInterval
  );
  // const markedRanges = getMarkedRanges(available_dates);
  // console.log(markedRanges)

  return (
    <>
      <Grid justify="center">
        <Grid.Col>
          <DatePicker onSubmit={handleSubmit} BackTest={true} />
          <TimePicker onTimeChange={handleTimeChange} />
          <p>
            Selected time: {selectedTime && selectedTime.toLocaleTimeString()}
          </p>
          <TimeSlider onTimeChange={handleTimeChange2} />
          <p>Selected time: {currentTime}</p>
        </Grid.Col>
      </Grid>

      <Grid>
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
      </Grid>
      <Grid>
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
      </Grid>
    </>
  );
};

export default BackTest;
