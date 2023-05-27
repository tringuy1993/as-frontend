"use client";
import { ES_URL, GREEK_EXPO_URL, THEO_URL } from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";
import { useState } from "react";
import { GetModifiedToSTheoData } from "@/components/ECharts/DataEChart";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { EChartES, DatePicker, SelectGreek, EChartToS } from "@/components";
import { privatefetchData } from "@/lib/api";

export default function Home() {
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

  const update_param = [finalDate, selectedGreek];
  //Request Parameters
  //Request ES Data
  const updateInterval = 30000;
  const params = req_params("ES", selectedGreek, finalDate);
  const { data: ESData } = useFetch(
    params,
    ES_URL,
    update_param,
    updateInterval
  );

  //Request ToS Data
  // const tickers = ["$SPX.X"]
  const tickers = ["$SPX.X", "SPY", "QQQ", "$NDX.X", "$RUT.X"];
  const params2 = req_params(tickers, selectedGreek, finalDate);
  const { data: ToSData } = useFetch(
    params2,
    GREEK_EXPO_URL,
    update_param,
    updateInterval
  );

  // const test = privatefetchData(GREEK_EXPO_URL, params2);
  // test.then((result) => {
  //   // console.log(result);
  // });
  const params3 = req_params("$SPX.X", "gamma", finalDate);
  const { data: ToSTheoData } = useFetch(
    params3,
    THEO_URL,
    update_param,
    updateInterval
  );

  const ToSTheoData_SPX = ToSTheoData?.map((data) =>
    GetModifiedToSTheoData(data, selectedGreek)
  );

  let EChartToSList;
  const tickersGraphs2 = [];
  if (ToSData?.data) {
    const keys = Object.keys(ToSData?.data).filter(
      (key) => ToSData.data[key].length > 0
    );
    for (const [key, value] of Object.entries(ToSData?.data)) {
      if (Array.isArray(value) && value.length > 0) {
        let theoData;
        if (key === "$SPX.X") {
          theoData = ToSTheoData_SPX;
        } else {
          theoData = "";
        }
        tickersGraphs2.push({
          symbol: key,
          data: value,
          theoData: theoData,
        });
      }
    }

    EChartToSList = tickersGraphs2.map(({ symbol, data, theoData }) => (
      <EChartToS
        key={symbol}
        symbol={symbol}
        data={data}
        theoData={theoData}
        greek={selectedGreek}
      />
    ));
  }

  return (
    <>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <EChartES symbol={"ES"} data={ESData} greek={selectedGreek} />
      {EChartToSList}
    </>
  );
}
