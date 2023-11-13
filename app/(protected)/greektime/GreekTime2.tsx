"use client";
import { useCallback, useEffect, useState } from "react";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { DatePicker, SelectGreek, SelectTicker } from "@/components";
import { ALL_URL, ES_URL } from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";
import EChartTime from "@/components/ECharts/Time/EChartTime";
import { modify_time_data } from "@/components/ECharts/UtilECharts";
import { combineESOptionData } from "@/components/ECharts/DataEChart";
import { Box } from "@mantine/core";

export default function GreekTime() {
  const [data2, setData] = useState();
  //Select Date
  const [selectedDateRange] = useState([new Date(), getNextFriday2()]);
  const [finalDate, setFinalDate] = useState(selectedDateRange);
  const handleSubmit = (selectedDateRange) => {
    setFinalDate(() => selectedDateRange.dateRange);
  };
  //Select Greek
  const [selectedGreek, setSelectedGreek] = useState("gamma");
  function handleGreekChange(event) {
    setSelectedGreek(event);
  }

  //Select Ticker
  const [selectTicker, setSelectTicker] = useState("$SPX.X");
  function handleTickerChange(event) {
    setSelectTicker(event);
  }

  const update_param = [finalDate, selectedGreek, selectTicker];
  //Request Parameters
  //Request ES Data
  const updateInterval = 0;
  let params = req_params(selectTicker, selectedGreek, finalDate);
  params["all"] = false;
  const { data, isLoading } = useFetch(
    params,
    ALL_URL,
    update_param,
    updateInterval
  );

  let modified_data;
  // console.log("DATA Outside", data, isLoading)
  if (data) {
    // console.log(isLoading, data)
    // if (selectTicker === "ES") {
    // modified_data = combineESOptionData(data, selectedGreek);
    // } else {
    modified_data = modify_time_data(data?.data, selectedGreek).modified_data;
    // }
    console.log(modified_data);
  }

  return (
    <Box style={{ textAlign: "center" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <SelectTicker value={selectTicker} onChange={handleTickerChange} />
      {/* <EChartTime data={modified_data} /> */}
    </Box>
  );
}
