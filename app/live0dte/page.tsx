"use client";

import EChart0DTE from "@/components/ECharts/Live0DTE/EChart0DTE";
import { LIVE_OTM_URL } from "../api/apiURLs";
import useFetch from "../api/useFetch";
import SelectDate from "@/components/selections/SelectDate";
import useSelectedDateStore from "@/store/Live0DTE/live0DTEStore";
import SelectUTicker from "@/components/selections/SelectUTicker";
import useSelectedUTickerStore from "@/store/Live0DTE/live0DTEUTickerStore";

const Live0DTE = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const selectedTicker = useSelectedUTickerStore(
    (state) => state.selectedUTicker
  );

  const updateInterval = 30000;
  //   const esParams = req_params("$SPX.X", selectedGreek, finalDate);

  //   const date = "2023-08-29";
  const PARAMS = { und_symbol: selectedTicker, date: selectedDate };
  const { data: ESData } = useFetch(
    PARAMS,
    LIVE_OTM_URL,
    [selectedDate, selectedTicker],
    updateInterval
  );

  return (
    <div>
      <SelectDate und_symbol={selectedTicker} />
      <SelectUTicker />
      <EChart0DTE data={ESData?.data} />
    </div>
  );
};

export default Live0DTE;
