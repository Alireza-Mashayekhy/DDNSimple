import { SFC } from "@/types";
import MainContent from "./MainContent";
import PageTemplate from "@/components/PageTemplate";
import TopBar from "@/components/TopBar";

const FundsCashFlow: SFC = () => {
  return <PageTemplate TopBar={TopBar} MainContent={MainContent} />;
};

export default FundsCashFlow;
