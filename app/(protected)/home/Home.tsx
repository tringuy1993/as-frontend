"use client";
import {
  ES_URL,
  GREEK_EXPO_URL,
  THEO_URL,
  THEOVANNA_URL,
} from "@/app/api/apiURLs";
import useFetch from "@/app/api/useFetch";
import { useEffect, useState } from "react";
import {
  GetModifiedToSTheoData,
  TheoDataProps,
} from "@/components/ECharts/DataEChart";
import { getNextFriday2, req_params } from "../utilitiesProtected";
import {
  EChartES,
  DatePicker,
  SelectGreek,
  EChartToS,
  GreekControl,
  EChartToS_Theo,
} from "@/components";
import { Box } from "@mantine/core";
import { DateRange } from "@/components/datepicker/types";
import { useLocalStorage } from "@mantine/hooks";

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

export default function Home() {
  //Select Date
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

  // const greekControl = !value ? "NonTheo" : value;
  // console.log(greekControl);
  const update_param = [finalDate, selectedGreek];
  //Request Parameters
  //Request ES Data
  const updateInterval = 30000;
  const esParams = req_params("ES", selectedGreek, finalDate);
  const { data: ESData } = useFetch(
    esParams,
    ES_URL,
    update_param,
    updateInterval
  );

  //Request ToS Data
  // const tickers = ["$SPX.X"]
  const tickers = ["$SPX.X", "SPY", "QQQ", "$NDX.X", "$RUT.X"];
  const tosParams = req_params(tickers, selectedGreek, finalDate);
  const { data: ToSData } = useFetch(
    tosParams,
    GREEK_EXPO_URL,
    update_param,
    updateInterval
  );

  const theoParams = req_params("$SPX.X", "gamma", finalDate);
  const { data: ToSTheoData } = useFetch(
    theoParams,
    THEO_URL,
    update_param,
    updateInterval
  );

  const ToSTheoData_SPX: TheoDataProps = ToSTheoData?.map(
    (data: TheoDataProps) => GetModifiedToSTheoData(data)
  );

  const chartDataList = getChartDataList(ToSData?.data, ToSTheoData_SPX);

  const theoGreek = ["vanna", "gamma"].includes(selectedGreek)
    ? selectedGreek
    : "vanna";

  const theoSPYVannaParams = req_params("SPY", theoGreek, finalDate);
  const { data: ToSSPYVannaTheoData } = useFetch(
    theoSPYVannaParams,
    THEOVANNA_URL,
    update_param,
    0
  );

  const theoSPXVannaParams = req_params("$SPX.X", theoGreek, finalDate);
  const { data: ToSSPXVannaTheoData } = useFetch(
    theoSPXVannaParams,
    THEOVANNA_URL,
    update_param,
    0
  );
  const theoNDXVannaParams = req_params("$NDX.X", theoGreek, finalDate);
  const { data: ToSNDXVannaTheoData } = useFetch(
    theoNDXVannaParams,
    THEOVANNA_URL,
    update_param,
    0
  );

  return (
    <Box style={{ textAlign: "center", margin: "auto" }}>
      <DatePicker dateRange={selectedDateRange} onSubmit={handleSubmit} />
      <SelectGreek value={selectedGreek} onChange={handleGreekChange} />
      <GreekControl />
      {greekControl == "NonTheo" && (
        <>
          <EChartES symbol={"ES"} data={ESData} greek={selectedGreek} />
          {chartDataList.map(({ symbol, data, theoData }) => (
            <EChartToS
              key={symbol}
              symbol={symbol}
              data={data}
              theoData={theoData}
              greek={selectedGreek}
            />
          ))}
        </>
      )}
      {greekControl == "Theo" && (
        <>
          <EChartToS_Theo
            symbol={"$SPX.X"}
            data={ToSSPXVannaTheoData}
            greek={theoGreek}
          />
          <EChartToS_Theo
            symbol={"SPY"}
            data={ToSSPYVannaTheoData}
            greek={theoGreek}
          />
          <EChartToS_Theo
            symbol={"$NDX.X"}
            data={ToSNDXVannaTheoData}
            greek={theoGreek}
          />
        </>
      )}
    </Box>
  );
}
