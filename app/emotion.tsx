// "use client";

import { CacheProvider } from "@emotion/react";
import { useEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import ThemeProvider from "@/theme/ThemeProvider";

type ChildrenProps = {
  children: React.ReactNode;
};
export default function RootStyleRegistry({ children }: ChildrenProps) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ThemeProvider>{children}</ThemeProvider>
    </CacheProvider>
  );
}
