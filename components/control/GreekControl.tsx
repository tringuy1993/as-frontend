import { SegmentedControl } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState, FC } from "react";

const GreekControl: FC = () => {
  // const [value] = useLocalStorage({ key: "greek-control" });
  const [greekControl, setGreekControl] = useLocalStorage({
    key: "greek-control",
    defaultValue: "NonTheo",
    getInitialValueInEffect: true,
  });

  function handleGreekControl(value: "NonTheo" | "Theo"): void {
    setGreekControl(value);
  }

  useEffect(() => {
    localStorage.getItem("greek-control") ??
      localStorage.setItem("greek-control", "NonTheo");
  }, []);

  return (
    <SegmentedControl
      radius={15}
      transitionDuration={500}
      data={["NonTheo", "Theo"]}
      onChange={handleGreekControl}
      value={greekControl}
    />
  );
};

export default GreekControl;
