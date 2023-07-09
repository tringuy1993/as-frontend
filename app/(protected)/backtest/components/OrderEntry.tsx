import { Box, Button, Stack } from "@mantine/core";
import {
  type MRT_ColumnDef,
  MRT_Table,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Monitor } from "./Monitor";
import { useBTSelectedLegsStore } from "@/store";

type StateData = {
  quote_datetime: string;
  option_type: boolean;
  price: number;
  expiration: string;
  strike: number;
};
export const OrderEntry = () => {
  const { legs, legsPriceSum, setOrder } = useBTSelectedLegsStore();
  const [data, setData] = useState(legs);

  useEffect(() => {
    setData(legs);
  }, [legs]);

  const color = legsPriceSum >= 0 ? "green" : "red";
  const columns = useMemo<MRT_ColumnDef<StateData>[]>(
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
            <Box style={{ color: color }}>Total: {legsPriceSum.toFixed(2)}</Box>
            <Button onClick={setOrder}>Submit Order</Button>
          </Stack>
        ),
      },
    ],
    [legsPriceSum]
  );
  ("SELL -2 IRON CONDOR SPX 100 (Weeklys) 28 JUL 23 4450/4460/4450/4440 CALL/PUT @9.60 LMT");
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
      <h1> Enter Order </h1>
      <MRT_Table table={table} />
    </Box>
  );
};
