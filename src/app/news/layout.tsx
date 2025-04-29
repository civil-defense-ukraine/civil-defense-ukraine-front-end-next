
import { NewsContainer } from "@/components/pages/NewsContainer";
import { LayoutProps } from "../../../.next/types/app/layout";

const NewsLayout = ({ children }: LayoutProps) => {
  return <NewsContainer>{children}</NewsContainer>;
};

export default NewsLayout;
