"use client";

import EChart0DTE from "@/components/ECharts/Live0DTE/EChart0DTE";
// import { req_params } from "../(protected)/utilitiesProtected";
import { LIVE_OTM_URL } from "../api/apiURLs";
import useFetch from "../api/useFetch";
import { Container, Grid } from "@mantine/core";

const Live0DTE = () => {
  //   const [finalDate, setFinalDate] = useState<Date[]>(selectedDateRange);

  const updateInterval = 30000;
  //   const esParams = req_params("$SPX.X", selectedGreek, finalDate);

  const date = "2023-08-29";
  const PARAMS = { und_symbol: "$SPX.X", date: date };
  const { data: ESData } = useFetch(
    PARAMS,
    LIVE_OTM_URL,
    [date],
    updateInterval
  );

  ESData ?? console.log(ESData);

  return (
    <div>
      <EChart0DTE data={ESData?.data} />
    </div>
  );
};

export default Live0DTE;
