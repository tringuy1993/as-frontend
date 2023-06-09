import { Inter } from "next/font/google";
import AllProviders from "./AllProviders";
// import { ServerAuthProvider } from "@/auth/server-auth-provider";
import { FBAuthProvider } from "@/auth/FBAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alpha-Seekers",
  description: "Generated by create next app",
};

type ChildrenProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FBAuthProvider>
          <AllProviders>{children}</AllProviders>
        </FBAuthProvider>
      </body>
    </html>
  );
}
