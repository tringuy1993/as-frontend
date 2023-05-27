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

export function formatDate(dateobj) {
  return format(dateobj, "yyyy-MM-dd");
}

export function req_params(symbol, selectedGreek, finalDate) {
  symbol = typeof symbol === "object" ? JSON.stringify(symbol) : symbol;

  return {
    und_symbol: symbol,
    greek: selectedGreek,
    startDate: formatDate(finalDate[0]),
    endDate: formatDate(finalDate[1]),
  };
}
