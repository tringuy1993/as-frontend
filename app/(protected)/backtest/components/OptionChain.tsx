"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Box } from "@mantine/core";
import { useBTDatePickerStore } from "@/store/btDatePickerStore";
import { useBTTimePickerStore } from "@/store";
import { format } from "date-fns";
import { BACKTEST_OPT_CHAIN } from "@/app/api/apiURLs";
import useAxiosPrivate from "@/app/api/useAxiosPrivate";
import { useBTSelectedLegsStore } from "@/store/BTOrders/btSelectedLegStore";
import { OrderEntry } from "./OrderEntry";
import type { OrderState } from "@/store/BTOrders/types";

type PutCallData = {
  put: OrderState;
  call: OrderState;
};

const renderCallITM = ({ cell, row }) => (
  <Box
    sx={(theme) => ({
      backgroundColor:
        row.original.call.delta > 0.5
          ? theme.colorScheme === "dark"
            ? "lightblue"
            : "lightblue"
          : "inherit",
      color:
        row.original.call.delta > 0.5
          ? theme.colorScheme === "dark"
            ? theme.black
            : theme.black
          : "inherit",
    })}
  >
    {cell.getValue()}
  </Box>
);
const renderPutITM = ({ cell, row }) => (
  <Box
    sx={(theme) => ({
      backgroundOrigin: "inherit",
      background:
        row.original.put.delta <= -0.5
          ? theme.colorScheme === "dark"
            ? "lightblue"
            : "lightblue"
          : "inherit",
      color:
        row.original.put.delta <= -0.5
          ? theme.colorScheme === "dark"
            ? theme.black
            : theme.black
          : "inherit",
    })}
  >
    {cell.getValue()}
  </Box>
);

// Styling: https://www.mantine-react-table.com/docs/examples/advanced

export const OptionChain = () => {
  const { BackTestDate } = useBTDatePickerStore();
  const { BackTestTime } = useBTTimePickerStore();
  const [data, setData] = useState<PutCallData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const { addLegs, removeAllLegs } = useBTSelectedLegsStore();

  const params = {
    trade_date: format(BackTestDate[0], "yyyy-MM-dd"),
    expiration: format(BackTestDate[1], "yyyy-MM-dd"),
    trade_time: BackTestTime,
    all_greeks: true,
  };

  const axiosPrivate = useAxiosPrivate();
  const fetchData = async () => {
    try {
      const response = await axiosPrivate(BACKTEST_OPT_CHAIN, { params });
      const data = await response?.data.data;
      const mergedData = [];

      //Need to modify data layout
      for (let i = 0; i < data["call"].length; i++) {
        mergedData.push({ put: data["put"][i], call: data["call"][i] });
      }
      setData(mergedData);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };
  useEffect(() => {
    fetchData();
  }, [BackTestDate, BackTestTime]);

  //Handling update Legs:
  function handleUpdateLegs(event, cell, row) {
    const buy_type = cell.id.includes("bid") ? "bid" : "ask";
    const option_type = cell.id.includes("call") ? "call" : "put";

    if (event.ctrlKey) {
      if (cell.id.includes("bid") || cell.id.includes("ask")) {
        addLegs({
          buy_type: buy_type,
          option_type: option_type === "call" ? true : false,
          price:
            buy_type === "bid"
              ? -1 * row.original[option_type][buy_type]
              : row.original[option_type][buy_type],
          strike: row.original[option_type]["strike"],
          quote_datetime: row.original[option_type]["quote_datetime"],
          expiration: row.original[option_type]["expiration"],
        });
      }
    } else if (cell.id.includes("bid") || cell.id.includes("ask")) {
      removeAllLegs();
      addLegs({
        buy_type: buy_type,
        option_type: option_type === "call" ? true : false,
        price:
          buy_type === "bid"
            ? -1 * row.original[option_type][buy_type]
            : row.original[option_type][buy_type],
        strike: row.original[option_type]["strike"],
        quote_datetime: row.original[option_type]["quote_datetime"],
        expiration: row.original[option_type]["expiration"],
      });
    }
  }

  const columns = useMemo<MRT_ColumnDef<PutCallData>[]>(
    () => [
      {
        header: "Expiration",
        accessorKey: "call.expiration",
        //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
        GroupedCell: ({ cell, row }) => (
          <Box sx={{ color: "blue" }}>
            <strong>{cell.getValue<string>()} </strong> [{row.subRows?.length}]
          </Box>
        ),
        minSize: 200, //max size enforced during resizing
      },
      {
        header: "CALL",
        columns: [
          {
            accessorKey: "call.gamma",
            header: "Gamma",
            maxSize: 400, //max size enforced during resizing
            Cell: renderCallITM,
          },
          {
            accessorKey: "call.delta",
            header: "Delta",
            Cell: renderCallITM,
          },
          {
            accessorKey: "call.bid",
            header: "Bid",
            Cell: renderCallITM,
          },
          {
            accessorKey: "call.ask",
            header: "Ask",
            Cell: renderCallITM,
          },
        ],
      },
      {
        accessorKey: "call.strike", //access nested data with dot notation
        header: "Strike Price",
        filterVariant: "range-slider",
        mantineFilterRangeSliderProps: {
          color: "indigo",
          label: (value) =>
            value?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
        },
      },
      {
        header: "PUT",
        columns: [
          {
            accessorKey: "put.bid",
            header: "Bid",
            Cell: renderPutITM,
          },
          {
            accessorKey: "put.ask",
            header: "Ask",
            Cell: renderPutITM,
          },
          {
            accessorKey: "put.delta",
            header: "Delta",
            Cell: renderPutITM,
          },
          {
            accessorKey: "put.gamma",
            header: "Gamma",
            Cell: renderPutITM,
          },
        ],
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: false,
    enableStickyHeader: true,
    mantineTableContainerProps: { sx: { maxHeight: "600px" } },
    mantineTableHeadCellProps: { align: "center" },
    mantineTableBodyCellProps: ({ cell, row }) => ({
      //implement row selection click events manually
      onClick: (event) => handleUpdateLegs(event, cell, row),
      sx: {
        cursor: "pointer",
        textAlign: "center",
      },
    }),
    enableGrouping: true,
    enableColumnResizing: true,

    initialState: {
      density: "xs",
      expanded: true,
      grouping: ["call.expiration"],
    },
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    mantineToolbarAlertBannerProps: isError
      ? { color: "red", children: "Error loading data" }
      : undefined,
  });

  return (
    <Box>
      <h1>Option Chain</h1>
      <MantineReactTable table={table} />
      <OrderEntry />
    </Box>
  );
};
