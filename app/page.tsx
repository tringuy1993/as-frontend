"use client";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { getNextFriday2, req_params } from "./(protected)/utilitiesProtected";
import {
  EChartES,
  DatePicker,
  SelectGreek,
  EChartToS,
  GreekControl,
  EChartToS_Theo,
} from "@/components";
import useFetch from "./api/useFetch";
import { DateRange } from "@/components/datepicker/types";
import { useLocalStorage } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { TheoDataProps } from "@/components/ECharts/DataEChart";
import { GREEK_EXPO_URL, THEO_URL } from "./api/apiURLs";

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
const HomePage = () => {
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

  const theoGreek = ["vanna", "gamma"].includes(selectedGreek)
    ? selectedGreek
    : "vanna";

  const [greekControl] = useLocalStorage({ key: "greek-control" });
  const tickers = ["$SPX", "SPY", "QQQ", "$NDX.X", "RUT.X"];
  const params = useMemo(() => {
    return req_params(tickers, selectedGreek, finalDate);
  }, []);

  const { data: greek_data } = useFetch(GREEK_EXPO_URL, params, true);

  const theoParams = useMemo(() => {
    return req_params("$SPX.X", "gamma", finalDate);
  }, []);
  const { data: ToSTheoData } = useFetch(THEO_URL, theoParams, true);
  // console.log(new Date(), dataState);
  return (
    <Box style={{ textAlign: "center", margin: "auto" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <>/HomePage</>
      {greekControl == "NonTheo" && <></>}
    </Box>
  );
};

export default HomePage;
