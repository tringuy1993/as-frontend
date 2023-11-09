"use client";
import { useCallback, useEffect, useState } from "react";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import { DatePicker, SelectGreek, SelectTicker } from "@/components";
import { Box } from "@mantine/core";
import { AuthAction, useUser, withUser } from "next-firebase-auth";
import FullPageLoader from "@/components/FullPageLoader";
import initAuth from "@/auth/initAuth";
import Loading from "./loading";

initAuth();
function GreekTime() {
  const AuthUser = useUser();
  const [data2, setData] = useState();

  const fetchData = useCallback(async () => {
    const token = await AuthUser.getIdToken();
    // const endpoint = getAbsoluteURL('/api/example')
    const endpoint =
      "https://www.alpha-seekers.com/api/data/theoGreek/?und_symbol=$NDX.X&greek=gamma&startDate=2023-11-08&endDate=2023-11-10";
    console.log(token);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    console.log("RESPONSE:", response);
    const data = await response.json();
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        `Data fetching failed with status ${response.status}: ${JSON.stringify(
          data
        )}`
      );
      return null;
    }
    console.log(data);
    return data;
  }, [AuthUser]);

  useEffect(() => {
    let isCancelled = false;
    const fetchFavoriteColor = async () => {
      const data = await fetchData();
      if (!isCancelled) {
        setData(data ? data?.data : "unknown :(");
      }
    };
    fetchFavoriteColor();
    const intervalId = setInterval(fetchFavoriteColor, 600000);
    return () => {
      // A quick but not ideal way to avoid state updates after unmount.
      // In your app, prefer aborting fetches:
      // https://developers.google.com/web/updates/2017/09/abortable-fetch
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [fetchData]);

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

  return (
    <Box style={{ textAlign: "center" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <SelectTicker value={selectTicker} onChange={handleTickerChange} />
      {/* <EChartTime data={modified_data} /> */}
    </Box>
  );
}

export default withUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loading,
})(GreekTime);
