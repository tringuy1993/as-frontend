import {
  useBTOrderStore,
  useBTSelectedLegsStore,
} from "@/store/btSelectedLegs";
import { Box, Button, Stack } from "@mantine/core";
import {
  type MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

type StateData = {
  buy_type: string;
  option_type: string;
  price: number;
  expiration: string;
  strike: number;
};
export const Monitor = () => {
  const { order } = useBTOrderStore();
  const [data, setData] = useState(order);
  console.log("savedLegs", data);

  useEffect(() => {
    setData(order);
  }, [order]);

  ("SELL -2 IRON CONDOR SPX 100 (Weeklys) 28 JUL 23 4450/4460/4450/4440 CALL/PUT @9.60 LMT");

  return <>{data && <>{JSON.stringify(data.legs)}</>}</>;
};
