import { format } from "date-fns";

export function getNextFriday2(date = new Date()) {
  const dateCopy = new Date(date.getTime());
  if (dateCopy.getDay() === 5) {
    return dateCopy;
  } else {
    const nextFriday = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)
      )
    );
    return nextFriday;
  }
}

export function formatDate(dateobj: Date): string {
  return format(dateobj, "yyyy-MM-dd");
}

export type resultparamsProps = {
  und_symbol: string[] | string;
  greek: string;
  startDate: string;
  endDate: string;
};

export function req_params(
  symbol: string[] | string,
  selectedGreek: string,
  finalDate: Date[]
): resultparamsProps {
  symbol = typeof symbol === "object" ? JSON.stringify(symbol) : symbol;

  return {
    und_symbol: symbol,
    greek: selectedGreek,
    startDate: formatDate(finalDate[0]),
    endDate: formatDate(finalDate[1]),
  };
}

// Get Chart Data List
export function getChartDataList(
  data: Record<string, any> | undefined,
  tosTheoData_SPX: any[]
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
