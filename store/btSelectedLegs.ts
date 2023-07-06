import { create } from "zustand";
// type State = {
//   BackTestDate: Date[];
// };
// type Action = {
//   updateBackTestDate: (BackTestDate: State["BackTestDate"]) => void;
// };
type StateData = {
  buy_type: string;
  option_type: string;
  price: number;
  expiration: string;
  strike: number;
};

type State = {
  legs: StateData[];
  legsPriceSum: number;
};

type Actions = {
  addLegs: (addedLeg: StateData) => void;
  removeAllLegs: () => void;
  setOrder: () => void;
};

export const useBTSelectedLegsStore = create<State & Actions>((set) => ({
  legs: [],
  legsPriceSum: 0,
  addLegs: (addedLeg) => {
    set((state) => {
      if (state.legs.length < 4) {
        const newLegs = [...state.legs, addedLeg];
        const newSum = newLegs.reduce((acc, leg) => acc + leg.price, 0);
        return { legs: newLegs, legsPriceSum: newSum };
      } else {
        return { legs: state.legs, legsPriceSum: state.legsPriceSum };
      }
    });
  },
  removeAllLegs: () => {
    set({ legs: [], legsPriceSum: 0 });
  },
  setOrder: () => {
    const allLegs = useBTSelectedLegsStore.getState().legs;
    const sum = useBTSelectedLegsStore.getState().legsPriceSum;
    useBTOrderStore.setState({
      order: { legs: allLegs, total: Number(sum.toFixed(2)) },
    });
  },
}));

type OrderData = {
  order: { legs: StateData[]; total: number };
};

export const useBTOrderStore = create<OrderData>((set) => ({
  order: { legs: [], total: 0 },
}));
