"use client";
import { useState } from "react";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { DatePicker, SelectGreek, SelectTicker } from "@/components";
import { ALL_URL, ES_URL } from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";
import EChartTime from "@/components/ECharts/Time/EChartTime";
import { modify_time_data } from "@/components/ECharts/UtilECharts";
import { combineESOptionData } from "@/components/ECharts/DataEChart";

export default function GreekTime() {
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
  const key_params = {
    ES: ES_URL,
    "$SPX.X": ALL_URL,
    SPY: ALL_URL,
    "$VIX.X": ALL_URL,
    "$NDX.X": ALL_URL,
    QQQ: ALL_URL,
  };
  const { data } = useFetch(
    params,
    `${key_params[selectTicker]}`,
    update_param,
    updateInterval
  );

  let modified_data;
  if (data) {
    if (selectTicker === "ES") {
      modified_data = combineESOptionData(data, selectedGreek);
    } else {
      modified_data = modify_time_data(data, selectedGreek).modified_data;
    }
  }

  return (
    <main className="">
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <SelectTicker value={selectTicker} onChange={handleTickerChange} />
      <EChartTime
        symbol={selectTicker}
        data={modified_data}
        greek={selectedGreek}
      />
    </main>
  );
}
