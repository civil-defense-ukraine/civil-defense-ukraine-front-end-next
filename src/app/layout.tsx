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
    "Civil Defense Ukraine is a charitable organization supporting Ukraine’s defenders by raising essential funds to aid those protecting the nation.",
  openGraph: {
    title: "Civil Defense Ukraine",
    description:
      "Civil Defense Ukraine is a charitable organization supporting Ukraine’s defenders by raising essential funds to aid those protecting the nation.",
    url: "https://www.civil-defense-ukraine.com/",
    siteName: "Civil Defense Ukraine",
    images: [
      {
        url: "/imgs/main-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Main banner for Civil Defense Ukraine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon-96x96.png",  
    shortcut: "/favicon.ico",
  },
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
