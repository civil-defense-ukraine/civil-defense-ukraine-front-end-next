
import { NewsContainer } from "@/components/pages/NewsContainer";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

const NewsLayout = ({ children }: LayoutProps) => {
  return <NewsContainer>{children}</NewsContainer>;
};

export default NewsLayout;
