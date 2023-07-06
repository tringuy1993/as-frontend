import { create } from "zustand";
type State = {
  BackTestDate: Date[];
};
type Action = {
  updateBackTestDate: (BackTestDate: State["BackTestDate"]) => void;
};

export const useBTDatePickerStore = create<State & Action>((set) => ({
  BackTestDate: [new Date("2018-06-05"), new Date("2018-06-05")],
  updateBackTestDate: (dateRange) => set({ BackTestDate: dateRange }),
}));
