"use client";
import { useCallback, useEffect, useState } from "react";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { DatePicker, SelectGreek, SelectTicker } from "@/components";
import { Box } from "@mantine/core";
import FullPageLoader from "@/components/FullPageLoader";
import Loading from "./loading";
import AxiosPrivate from "./axios";

function GreekTime() {
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

  const axiosFetch = AxiosPrivate();
  // async function GetCurrentToken() {
  //   const fetchcurrentToken = await fetch("/api/tokens");
  //   const currentToken = await fetchcurrentToken.json().then((token) => {
  //     return token?.tokens.token;
  //   });
  //   return currentToken;
  // }

  const params = req_params(selectTicker, selectedGreek, finalDate);
  const fetchData = useCallback(async () => {
    // const endpoint = getAbsoluteURL('/api/example')
    // const token = GetCurrentToken();
    const endpoint =
      "https://www.alpha-seekers.com/api/data/greeksexposure/?und_symbol=[%22$SPX.X%22,%22SPY%22,%22QQQ%22,%22$NDX.X%22,%22$RUT.X%22]&greek=gamma&startDate=2023-11-10&endDate=2023-11-11";
    const response = await axiosFetch.get(
      "https://www.alpha-seekers.com/api/data/greeksexposure/",
      {
        params: params,
      }
    );
    console.log(response?.data);
    return response?.data;
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const fetchFavoriteColor = async () => {
      const data = await fetchData();
      if (!isCancelled) {
        setData(data);
      }
    };
    fetchFavoriteColor();
  }, [fetchData]);

  return (
    <Box style={{ textAlign: "center" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <SelectTicker value={selectTicker} onChange={handleTickerChange} />
      {/* <EChartTime data={modified_data} /> */}
    </Box>
  );
}

export default GreekTime;
