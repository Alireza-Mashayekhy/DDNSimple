import { SFC } from "@/types";
import MainContent from "./MainContent";
import PageTemplate from "@/components/PageTemplate";
import TopBar from "@/components/TopBar";

const FundsYieldRate: SFC = () => {
  return <PageTemplate TopBar={TopBar} MainContent={MainContent} />;
};

export default FundsYieldRate;
