"use client";

import EChart0DTE from "@/components/ECharts/Live0DTE/EChart0DTE";
import { LIVE_OTM_URL } from "../api/apiURLs";
import SelectDate from "@/components/selections/SelectDate";
import useSelectedDateStore from "@/store/Live0DTE/live0DTEStore";
import SelectUTicker from "@/components/selections/SelectUTicker";
import useSelectedUTickerStore from "@/store/Live0DTE/live0DTEUTickerStore";
import useFetch from "./useFetch";

const Live0DTE = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const selectedTicker = useSelectedUTickerStore(
    (state) => state.selectedUTicker
  );

  // https://www.alpha-seekers.com/api/data/LiveOTMData/?und_symbol=$SPX.X&date=2023-10-31

  const PARAMS = { und_symbol: selectedTicker, date: selectedDate };
  const { data, loading, error } = useFetch(LIVE_OTM_URL, PARAMS);

  return (
    <div>
      <SelectDate und_symbol={selectedTicker} />
      <SelectUTicker />
      {!loading && data && <EChart0DTE data={data?.data} />}
    </div>
  );
};

export default Live0DTE;
