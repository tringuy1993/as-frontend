"use client";
import BTFetch from "@/app/api/BTFetch";
import { BACKTEST_TRACK_ORDER } from "@/app/api/apiURLs";
import {
  useBTDatePickerStore,
  useBTTimePickerStore,
  useBTOrderStore,
} from "@/store";
import { Box, Stack } from "@mantine/core";
import { format } from "date-fns";
import {
  type MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { type OrderState } from "@/store/BTOrders/types";

export const Monitor = () => {
  const { order } = useBTOrderStore();
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();
  const [result, setResult] = useState([]);
  const [pnl, setPNL] = useState("");

  const params = {
    trade_date: format(BackTestDate[0], "yyyy-MM-dd"),
    expiration: format(BackTestDate[0], "yyyy-MM-dd"),
    trade_time: BackTestTime,
    option_legs: JSON.stringify(order.legs),
  };

  const { fetchData, data: BTData } = BTFetch(params, BACKTEST_TRACK_ORDER);

  useEffect(() => {
    order.legs.length === 0 ? null : fetchData();
  }, [order, BackTestDate, BackTestTime]);

  useEffect(() => {
    if (BTData && BTData?.data) {
      const result = BTData?.data.map((item) => {
        const {
          option_type,
          strike,
          expiration,
          quote_datetime,
          gamma,
          delta,
        } = item;
        const matchedItem = order.legs.find(
          (element) =>
            element.option_type === option_type &&
            element.strike === strike &&
            element.expiration === expiration
        );

        const buy_type = matchedItem?.buy_type;
        return {
          option_type,
          strike,
          expiration,
          quote_datetime,
          price:
            buy_type === "ask" ? item[`${buy_type}`] : -1 * item[`${buy_type}`],
          gamma,
          delta,
        };
      });
      setResult(result);
      const currentOrderPrice = result.reduce((acc, leg) => acc + leg.price, 0);
      const pnl =
        order.orderCost >= 0
          ? (currentOrderPrice - order.orderCost).toFixed(2)
          : (-1 * order.orderCost + currentOrderPrice).toFixed(2);

      setPNL(pnl);
    }
  }, [BTData]);

  const color = Number(pnl) >= 0 ? "green" : "red";
  const columns = useMemo<MRT_ColumnDef<OrderState>[]>(
    () => [
      {
        accessorKey: "quote_datetime",
        header: "Trade Time",
      },
      {
        accessorKey: "expiration",
        header: "Exp",
      },
      {
        accessorKey: "strike", //normal accessorKey
        header: "Strike",
      },
      {
        accessorFn: (row) => {
          return row.option_type === true ? "call" : "put";
        },
        header: "Option Type",
      },
      {
        accessorKey: "price",
        header: "Price",
        Footer: () => (
          <Stack>
            <Box style={{ color: color }}>
              Trade Price: {order.orderCost}
              <br />
              PNL: {pnl}
            </Box>
          </Stack>
        ),
      },
    ],
    [result]
  );
  ("SELL -2 IRON CONDOR SPX 100 (Weeklys) 28 JUL 23 4450/4460/4450/4440 CALL/PUT @9.60 LMT");
  const table = useMantineReactTable<OrderState>({
    columns,
    data: result,
    enablePagination: false,
    enableStickyHeader: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableTopToolbar: false,
    mantineTableContainerProps: { sx: { minHeight: "200px" } },
    enableTableFooter: true,
  });

  return (
    <Box>
      <h1> Monitor Order </h1>
      <MRT_Table table={table} />
    </Box>
  );
};
