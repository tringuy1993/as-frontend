"use client";

import EChart0DTE from "@/components/ECharts/Live0DTE/EChart0DTE";
// import { LIVE_OTM_URL } from "../api/apiURLs";
import SelectDate from "@/components/selections/SelectDate";
import useSelectedDateStore from "@/store/Live0DTE/live0DTEStore";
import SelectUTicker from "@/components/selections/SelectUTicker";
import useSelectedUTickerStore from "@/store/Live0DTE/live0DTEUTickerStore";
import { useCallback, useEffect, useState } from "react";
import AxiosPrivate from "./axios";

const Live0DTE = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const selectedTicker = useSelectedUTickerStore(
    (state) => state.selectedUTicker
  );

  // https://www.alpha-seekers.com/api/data/LiveOTMData/?und_symbol=$SPX.X&date=2023-10-31

  // const PARAMS = { und_symbol: selectedTicker, date: selectedDate };
  // const { data, loading, error } = useFetch(LIVE_OTM_URL, PARAMS);

  const [newData, setNewData] = useState();

  const axiosFetch = AxiosPrivate();

  const fetchData = useCallback(async () => {
    const endpoint =
      "https://www.alpha-seekers.com/api/data/theoGreek/?und_symbol=$NDX.X&greek=gamma&startDate=2023-11-08&endDate=2023-11-10";
    const response = await axiosFetch.get(endpoint);
    // console.log(response?.data);
    return response?.data;
  }, []);

  useEffect(() => {
    let isCanceled = false;
    console.log("Inside UseEffect");
    const fetchNewData = async () => {
      const data = await fetchData();
      console.log(data);
      if (!isCanceled) {
        setNewData(data ? data : "unknown :(");
      }
    };

    fetchNewData();
    const intervalId = setInterval(fetchNewData, 1000 * 60 * 2);
    return () => {
      isCanceled = true;
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div>
      <SelectDate und_symbol={selectedTicker} />
      <SelectUTicker />
      {newData && <EChart0DTE data={newData?.data} />}
    </div>
  );
};

export default Live0DTE;
