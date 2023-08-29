"use client";

// import { req_params } from "../(protected)/utilitiesProtected";
import { LIVE_OTM_URL } from "../api/apiURLs";
import useFetch from "../api/useFetch";

const Live0DTE = () => {
  //   const [finalDate, setFinalDate] = useState<Date[]>(selectedDateRange);

  const updateInterval = 30000;
  //   const esParams = req_params("$SPX.X", selectedGreek, finalDate);

  const date = "20230829";
  const PARAMS = { und_symbol: "$SPX.X", date: date };
  const { data: ESData } = useFetch(
    PARAMS,
    LIVE_OTM_URL,
    [date],
    updateInterval
  );

  ESData ?? console.log(ESData);

  return <>Hello</>;
};

export default Live0DTE;
