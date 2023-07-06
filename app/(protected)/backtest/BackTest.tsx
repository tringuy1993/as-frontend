"use client";
import { Grid, Tabs } from "@mantine/core";
import { BTDatePicker, TimeSlider } from "@/components";
import { IconGraph, IconTable } from "@tabler/icons-react";
import { useBTTimePickerStore } from "@/store";
import { BackTestCharts } from "./components/BackTestCharts";
import { OptionChain } from "./components/OptionChain";

const BackTest = () => {
  const { BackTestTime } = useBTTimePickerStore();

  return (
    <>
      <Grid justify="center">
        <Grid.Col>
          <BTDatePicker />
          <TimeSlider />
          <p>Selected time: {BackTestTime}</p>
        </Grid.Col>
      </Grid>

      <Grid justify="center">
        <Grid.Col>
          <Tabs defaultValue="graphs">
            <Tabs.List>
              <Tabs.Tab value="graphs" icon={<IconGraph size="0.8rem" />}>
                Graphs Gallery
              </Tabs.Tab>
              <Tabs.Tab value="option-chain" icon={<IconTable size="0.8rem" />}>
                Option Chain
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="graphs" pt="xs">
              <BackTestCharts />
            </Tabs.Panel>

            <Tabs.Panel value="option-chain" pt="xs">
              <OptionChain />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default BackTest;
