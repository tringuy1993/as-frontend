"use client";
import { useEffect, useMemo, useState } from "react";
import { getNextFriday2, req_params } from "./(protected)/utilitiesProtected";
import {
  EChartES,
  DatePicker,
  SelectGreek,
  EChartToS,
  GreekControl,
  EChartToS_Theo,
} from "@/components";

import { DateRange } from "@/components/datepicker/types";
import { useLocalStorage } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { TheoDataProps } from "@/components/ECharts/DataEChart";
import { GREEK_EXPO_URL, THEOVANNA_URL, THEO_URL } from "./api/apiURLs";
import useCustomSWR from "./api/useCustomSWR";

// Get Chart Data List
function getChartDataList(
  data: Record<string, any> | undefined,
  tosTheoData_SPX: TheoDataProps
) {
  const chartDataList: { symbol: string; data: any[]; theoData: any }[] = [];
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value) && value.length > 0) {
        let theoData;
        if (key === "$SPX.X") {
          theoData = tosTheoData_SPX;
        } else {
          theoData = "";
        }
        chartDataList.push({
          symbol: key,
          data: value,
          theoData: theoData,
        });
      }
    }
  }

  return chartDataList;
}

function HomePage() {
  const [selectedDateRange] = useState<Date[]>([new Date(), getNextFriday2()]);
  const [finalDate, setFinalDate] = useState<Date[]>(selectedDateRange);
  const handleSubmit = (selectedDateRange: DateRange): void => {
    setFinalDate(selectedDateRange.dateRange);
  };
  //Select Greek
  const [selectedGreek, setSelectedGreek] = useState<string>("gamma");
  function handleGreekChange(event: string): void {
    setSelectedGreek(event);
  }

  const [greekControl] = useLocalStorage({ key: "greek-control" });
  const tickers = ["$SPX.X", "SPY", "QQQ", "$NDX.X", "$RUT.X"];
  const params = req_params(tickers, selectedGreek, finalDate);
  const theoGreek = ["vanna", "gamma"].includes(selectedGreek)
    ? selectedGreek
    : "vanna";

  // const update_param = [finalDate, selectedGreek];
  // const updateInterval = 61000;
  // // const { data, error, isLoading } = useFetcher(GREEK_EXPO_URL, params, 10000);
  // const { data: ToSData } = useFetch(
  //   params,
  //   GREEK_EXPO_URL,
  //   update_param,
  //   updateInterval
  // );
  // console.log(ToSData);

  // const axiosPrivate = axiosPrivateInstance();
  // const fetcher = (url, params) => {
  //   return axiosPrivate.get(url, { params: params });
  // };
  const { data, error, isLoading } = useCustomSWR(
    // GREEK_EXPO_URL,
    "http://localhost:3000/api/force-403",
    params,
    100000,
    true
  );

  const [nextChart, setNextChart] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (data && !error && !isLoading) {
      setNextChart(
        getChartDataList(data?.data.data, "").map(
          ({ symbol, data, theoData }) => (
            <EChartToS
              key={symbol}
              symbol={symbol}
              data={data}
              theoData={theoData}
              greek={selectedGreek}
            />
          )
        )
      );
    }
  }, [data, error, isLoading]);

  // const theoSPXVannaParams = req_params("$SPX.X", theoGreek, finalDate);
  // const { data: SPXVannaTheoData } = useFetcher(
  //   THEOVANNA_URL,
  //   theoSPXVannaParams,
  //   60500 * 10
  // );

  const theoSPXVannaParams = req_params("$SPX.X", theoGreek, finalDate);
  // const { data: ToSSPXVannaTheoData } = useFetch(
  //   theoSPXVannaParams,
  //   THEOVANNA_URL,
  //   update_param,
  //   10000
  // );

  return (
    <Box style={{ textAlign: "center", margin: "auto" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <>/HomePage</>
      <>{nextChart}</>
      {greekControl == "NonTheo" && <></>}
    </Box>
  );
}

export default HomePage;
