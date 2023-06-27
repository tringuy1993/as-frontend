import { SegmentedControl } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const GreekControl: React.FC = () => {
  const [value] = useLocalStorage({ key: "greek-control" });
  const greekControlValue = !value ? "NonTheo" : value;
  // console.log("LocalStorage", !test);
  const [greekControl, setGreekControl] = useLocalStorage({
    key: "greek-control",
    defaultValue: greekControlValue,
    getInitialValueInEffect: true,
  });

  function handleGreekControl(value: "NonTheo" | "Theo"): void {
    setGreekControl(value);
  }
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
