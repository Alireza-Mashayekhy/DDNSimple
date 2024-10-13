import * as S from "./Styles";
import DataTable from "@/components/DataTable";
import { useSelector } from "react-redux";
import { getCustomersData, getStockData } from "@/selectors/state";
import { useEffect, useState } from "react";
import { exportDdn, getDdnDetail, getDdnHistories } from "@/api/ddnHistories";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import LineChart from "@/components/chart";
import { getTheme } from "@/redux/selectors";
import { fetchCustomersData } from "@/dispatchers/customers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/types";

interface TickerItem {
  ticker: string;
}
interface Ticker {
  ticker: string;
}
interface DdnHistory {
  national_id: string;
  last_name: string;
  stock_id: string;
  date: string;
  total_count: number;
  freezed_count: number;
  unfreezed_count: number;
  ticker: string;
}
interface DDNHistoryChartData {
  [ticker: string]: {
    dates: string[];
    total_count: number[];
  };
}
interface DDNHistoryData {
  ticker: string;
  date: string;
  total_count: number;
  unfreezed_count: number;
  freezed_count: number;
}
interface CustomerDetails {
  first_name: string;
  last_name: string;
  national_id: string;
  tax_id: number;
  stock_id: string;
  brith_date: string;
  shsa_id: number;
  gender: "W" | "M";
  inv_type: "I" | "L";
  ddn_history: DDNHistoryData[];
  ddn_history_chart: DDNHistoryChartData[];
}
interface CustomerDetailTableData {
  date: string;
  ticker: string;
  total_count: number;
  freezed_count: number;
  unfreezed_count: number;
}

const columnFields = [
  {
    field: "full_name",
    header: "نام",
    width: "10%",
  },

  {
    field: "national_id",
    header: "کد ملی",
    width: "10%",
  },
  {
    field: "stock_id",
    header: "کد بورسی",
    width: "10%",
  },
  {
    field: "total_count",
    header: "سهام کل",
    width: "10%",
  },
  {
    field: "total_count",
    header: "ارزش (میلیارد ریال)",
    width: "10%",
  },
  {
    field: "details",
    header: "جزییات",
    width: "10%",
  },
];
const customerDetailColumnFields = [
  {
    field: "id",
    header: "",
    width: "5%",
  },
  // {
  //     field: 'ticker',
  //     header: 'نماد',
  //     width: '10%',
  // },
  {
    field: "date",
    header: "تاریخ گزارش",
    width: "10%",
  },
  {
    field: "total_count",
    header: "سهام کل",
    width: "10%",
  },
  {
    field: "freezed_count",
    header: "سهام سپرده",
    width: "10%",
  },
  {
    field: "unfreezed_count",
    header: "سهام غیر سپرده",
    width: "10%",
  },
];
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const dialogStyle = {
  maxWidth: "850px",
  width: "70vw",
  borderRadius: "15px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};

const MainContent = () => {
  const [selectedTicker, setSelectedTicker] = useState<Ticker | undefined>(
    undefined
  );
  const [filteredTickers, setFilteredTickers] = useState<TickerItem[]>([]);
  const [ddnHistoryLoading, setDdnHistoryLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedLastname, setSelectedLastname] = useState(null);
  const [filteredLastname, setFilteredLastname] = useState<string[]>([]);
  const [selectedNationalId, setSelectedNationalId] = useState(null);
  const [filteredNationalId, setFilteredNationalId] = useState<string[]>([]);
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [filteredStockId, setFilteredStockId] = useState<string[]>([]);
  const [ddnHistories, setDdnHistories] = useState<DdnHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerDetails | null>(null);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  }>({ labels: [], datasets: [] });
  const [customerDetailData, setCustomerDetailData] = useState<
    CustomerDetailTableData[]
  >([]);
  const [totalCustomerDetailRecords, setTotalCustomerDetailRecords] =
    useState(0);
  const [displayModal, setDisplayModal] = useState(false);

  const theme = useSelector(getTheme);

  const headerStyle = {
    background: theme === "dark" ? "#262626" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    padding: "1rem",
    borderBottom: "1px solid #e9ecef",
    fontWeight: "bold",
  };

  const contentStyle = {
    padding: "2rem",
    background: theme === "dark" ? "#262626" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  const footerContent = (
    <div>
      <Button
        label="بستن"
        icon="pi pi-times mr-2"
        iconPos="right"
        onClick={() => setDisplayModal(false)}
      />
    </div>
  );
  const headerContent = (
    <div className="text-center">
      {selectedCustomer?.first_name} {selectedCustomer?.last_name} -{" "}
      {customerDetailData[0]?.ticker}
    </div>
  );

  const dialogContent = () => {
    if (!selectedCustomer) return null;

    return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
            <span className="font-bold">کد سهامداری :</span>{" "}
            {selectedCustomer?.stock_id}
          </p>
          <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
            <span className="font-bold">کد ملی :</span>{" "}
            {selectedCustomer?.national_id}
          </p>
          <p className="w-[calc(33.33%-6px)] my-1 border-b border-b-slate-500 pb-2 text-center">
            <span className="font-bold">نوع سرمایه‌گذار: </span>{" "}
            {selectedCustomer?.inv_type === "I" ? "حقیقی" : "حقوقی"}
          </p>
        </div>
        <div className="flex justify-end my-5">
          <Button
            icon="pi pi-download text-2xl"
            onClick={() => exportCustomer(selectedCustomer?.national_id)}
            className={` rounded-lg aspect-square bg-inherit ${theme === "dark" ? "text-white" : "text-black"}`}
          />
        </div>
        <DataTable
          data={customerDetailData}
          loading={false}
          columnFields={customerDetailColumnFields}
          pagination={true}
          totalRecords={totalCustomerDetailRecords}
          selectedRows={10}
          rowsOption={10}
        />

        {/* <h3 className="font-bold">نمودار سرمایه‌گذاری</h3> */}
        <div className="flex justify-center mt-10">
          <LineChart datasets={chartData.datasets} labels={chartData.labels} />
        </div>
      </>
    );
  };
  const exportCustomer = async (nationalId: string) => {
    if (!selectedTicker) {
      console.error("selectedTicker is undefined");
      return;
    }
    const params = { ticker: selectedTicker.ticker };
    const response = await exportDdn(nationalId, params);
    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `customer_${nationalId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const tickerData = useSelector(getStockData)?.data;
  const customers = useSelector(getCustomersData)?.data;

  const dispatch = useDispatch<AppDispatch>();

  const getCustomerDataFunc = async () => {
    if (!customers.length) {
      setDdnHistoryLoading(true);
      await dispatch(fetchCustomersData());
      setDdnHistoryLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDataFunc();
  }, []);

  const searchTicker = (event: { query: string }) => {
    let query = event.query;
    let filtered = tickerData.filter((item) => item.ticker.includes(query));
    setFilteredTickers(filtered);
  };
  const searchLastname = (event: { query: string }) => {
    let query = event.query;
    let filtered = customers.last_names.filter((item) => item?.includes(query));
    setFilteredLastname(filtered);
  };

  const loadDdnHistories = async (ticker) => {
    setError(null);

    try {
      setDdnHistoryLoading(true);

      const params: { [key: string]: string } = {
        ticker: ticker.ticker,
      };
      if (selectedStockId) {
        params.customer_stock_id = selectedStockId;
      }
      if (selectedNationalId) {
        params.customer_national_id = selectedNationalId;
      }
      if (selectedLastname) {
        params.customer_name = selectedLastname;
      }
      const data = await getDdnHistories(params);
      setDdnHistories(data);
    } catch (error) {
      console.error("Error fetching DDN histories:", error);
      setError("لطفا دوباره تلاش کنید.");
    } finally {
      setDdnHistoryLoading(false);
    }
  };
  const searchNationalId = (event: { query: string }) => {
    let query = event.query;
    let filtered = customers.national_ids.filter((item) =>
      item?.includes(query)
    );
    setFilteredNationalId(filtered);
  };
  const searchStockId = (event: { query: string }) => {
    let query = event.query;
    let filtered = customers.stock_ids.filter((item) => item?.includes(query));
    setFilteredStockId(filtered);
  };

  const handleDetailsClick = async (detail) => {
    if (!selectedTicker) {
      console.error("selectedTicker is undefined");
      return;
    }
    const params = { ticker: selectedTicker.ticker };
    const response: CustomerDetails = await getDdnDetail(
      detail.national_id,
      params
    );
    setSelectedCustomer(response);
    if (response.ddn_history_chart && response.ddn_history_chart.length > 0) {
      const chartData = response.ddn_history_chart[0];
      const datasets = Object.entries(chartData)?.map(([ticker, data]) => {
        return {
          label: ticker,
          data: data?.total_count?.reverse(),
          borderColor: theme === "dark" ? "white" : "black",
          fill: false,
          tension: 0.1,
        };
      });

      const maxDatesDataset = datasets?.reduce((prev, current) =>
        prev.data.length > current.data.length ? prev : current
      );

      setChartData({
        labels: chartData[maxDatesDataset.label].dates.reverse(),
        datasets: datasets,
      });
    }

    if (response.ddn_history && response.ddn_history.length > 0) {
      setCustomerDetailData(response.ddn_history);
      setTotalCustomerDetailRecords(response.ddn_history.length);
    }

    setDisplayModal(true);
  };

  return (
    <S.Container>
      <div className="flex justify-center">
        <S.Input
          value={selectedTicker || ""}
          suggestions={filteredTickers}
          completeMethod={searchTicker}
          field="ticker"
          onChange={(e: { value: Ticker }) => {
            setSelectedTicker(e.value);
          }}
          onSelect={(e: { value: Ticker }) => {
            loadDdnHistories(e.value);
            setShowTable(true);
          }}
          panelStyle={{
            background: theme === "dark" ? "black" : "white",
            color: "red",
          }}
          placeholder="لطفاً یک نماد را انتخاب کنید."
        />
      </div>
      <div className="flex items-center justify-center py-5">
        {showTable && (
          <div className="items-center flex flex-wrap gap-5 justify-center">
            <S.Input
              value={selectedLastname}
              suggestions={filteredLastname}
              completeMethod={searchLastname}
              onChange={(e) => {
                setSelectedLastname(e.value);
              }}
              placeholder="نام سهامدار"
              panelStyle={{
                background: theme === "dark" ? "black" : "white",
                color: "red",
              }}
            />
            <S.Input
              value={selectedNationalId}
              suggestions={filteredNationalId}
              completeMethod={searchNationalId}
              onChange={(e) => {
                setSelectedNationalId(e.value);
              }}
              placeholder="کد ملی"
              panelStyle={{
                background: theme === "dark" ? "black" : "white",
                color: "red",
              }}
            />
            <S.Input
              value={selectedStockId}
              suggestions={filteredStockId}
              completeMethod={searchStockId}
              onChange={(e) => {
                setSelectedStockId(e.value);
              }}
              placeholder="کد بورسی"
              panelStyle={{
                background: theme === "dark" ? "black" : "white",
                color: "red",
              }}
            />
            <Button
              label="جستجو"
              className={` rounded-lg py-2 text-sm ${theme === "dark" ? "text-white" : "text-black"}`}
              outlined
              icon="pi pi-search mx-2 text-sm"
              onClick={() => loadDdnHistories(selectedTicker)}
            />
          </div>
        )}
      </div>
      {!showTable ? (
        <div style={{ textAlign: "center", color: "gray" }}>
          لطفاً یک نماد را انتخاب کنید.
        </div>
      ) : ddnHistoryLoading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
          />
        </div>
      ) : error ? (
        <div
          className="error-message"
          style={{ textAlign: "center", color: "red" }}
        >
          {error}
        </div>
      ) : (
        <DataTable
          data={ddnHistories}
          columnFields={columnFields}
          onDetailsClick={handleDetailsClick}
          pagination
          showRows
        />
      )}
      <S.DialogStyled
        header={headerContent}
        visible={displayModal}
        style={dialogStyle}
        headerStyle={headerStyle}
        contentStyle={contentStyle}
        onHide={() => setDisplayModal(false)}
        // footer={footerContent}
        draggable={false}
        resizable={false}
        dismissableMask
      >
        {dialogContent()}
      </S.DialogStyled>
    </S.Container>
  );
};

export default MainContent;
