import type { Metadata } from "next";
import "./globals.scss";
import { Figtree } from "next/font/google";
import {
  getInitialNews,
  getInitialTeam,
} from "@/components/features/getInitialData";
import { StoreProvider } from "@/components/components/StoreProvider/StoreProvider";
import { MenuClient } from "@/components/components/MenuManager/MenuClient";

export const metadata: Metadata = {
  title: "Civil Defense Ukraine",
  description:
    "Civil Defense Ukraine is a charitable organization that raises funds for the people of Ukraine who are defending our country",
};

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data server-side
  const [news, team] = await Promise.all([getInitialNews(), getInitialTeam()]);

  // Passing fetched data to be preloaded in store
  const preloadedState = {
    news: { loading: false, error: "", news: news },
    team: { loading: false, error: "", team: team },
  };

  return (
    <html
      lang="en"
      className={figtree.className}
    >
      <body className="page">
        <MenuClient>
          <StoreProvider preloadedState={preloadedState}>
            <main>{children}</main>
          </StoreProvider>
        </MenuClient>
      </body>
    </html>
  );
}
