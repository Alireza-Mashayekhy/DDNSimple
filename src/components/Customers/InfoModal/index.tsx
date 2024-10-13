import { SFC } from "@/types";
import * as S from "./Styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { exportCustomerData } from "@/api/customerData";
import { toast } from "react-toastify";

interface DdnHistoryEntry {
  ticker: string;
  date: string;
  total_count: number;
  wage: number;
}

interface DdnHistoryChartEntry {
  [key: string]: {
    dates: string[];
    total_count: number[];
  };
}

interface ApiData {
  first_name: string;
  last_name: string;
  national_id: string;
  tax_id: string | null;
  stock_id: string;
  brith_date: string;
  shsa_id: string;
  gender: "M" | "F";
  inv_type: string;
  ddn_history: DdnHistoryEntry[];
  ddn_history_chart: DdnHistoryChartEntry[];
}

interface CustomerInfoModalProps {
  visible: boolean;
  setVisibleProp: (visible: boolean) => void;
  customer?: ApiData; // customer can be optional
  customerTicker?: string;
}

const InfoModal: SFC<CustomerInfoModalProps> = ({
  visible,
  setVisibleProp,
  customer,
  customerTicker,
}) => {
  const chartData =
    customer?.ddn_history_chart?.reduce((acc: any[], curr) => {
      Object.keys(curr).forEach((key) => {
        curr[key].dates.forEach((date, index) => {
          const existingEntry = acc.find((item) => item.name === date);
          if (existingEntry) {
            existingEntry[key] = curr[key].total_count[index];
          } else {
            acc.push({
              name: date,
              [key]: curr[key].total_count[index],
            });
          }
        });
      });
      return acc;
    }, []) || [];

  const lineKeys = customer?.ddn_history_chart?.length
    ? Object.keys(customer.ddn_history_chart[0])
    : [];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff6384"]; // Add more colors if needed

  const footerContent = (
    <S.FooterContainer>
      <S.FooterButton
        label="بستن"
        onClick={() => setVisibleProp(false)}
        autoFocus
      ></S.FooterButton>
    </S.FooterContainer>
  );

  const exportData = () => {
    if (customer) {
      const customerData = {
        id: customer.national_id,
        ticker: customerTicker,
      };
      exportCustomerData(customerData)
        .then((res) => {
          const contentDisposition = res.headers["content-disposition"];
          const filename = contentDisposition
            ? contentDisposition.split("filename=")[1].split(";")[0]
            : "report.csv";

          const blob = new Blob([res.data], { type: "text/csv" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
          toast("با موفقیت ذخیره شد.");
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };

  return (
    <S.Container
      header={"جزییات سهامدار"}
      footer={footerContent}
      visible={visible}
      onHide={() => setVisibleProp(false)}
      style={{ width: "60vw", minWidth: "300px" }}
    >
      {/* Header section */}
      <S.TitleContainer>
        <S.Title>مشخصات:</S.Title>
        <S.DLButton onClick={exportData}>دانلود گزارش</S.DLButton>
      </S.TitleContainer>

      {/* Customer info display */}
      <S.InfoContainer>
        <S.Info>
          <S.InfoHeader>نام و نام خانوادگی:</S.InfoHeader>
          {customer?.first_name} {customer?.last_name}
        </S.Info>
        <S.Info>
          <S.InfoHeader>کد ملی:</S.InfoHeader>
          {customer?.national_id}
        </S.Info>
        <S.Info>
          <S.InfoHeader>شماره سهامداری:</S.InfoHeader>
          {customer?.stock_id}
        </S.Info>
        <S.Info>
          <S.InfoHeader>تاریخ تولد:</S.InfoHeader>
          {customer?.brith_date}
        </S.Info>
        <S.Info>
          <S.InfoHeader>جنسیت:</S.InfoHeader>
          {customer?.gender === "M" ? "مرد" : "زن"}
        </S.Info>
        <S.Info>
          <S.InfoHeader>نوع سرمایه‌گذار:</S.InfoHeader>
          {customer?.inv_type === "I" ? "حقیقی" : "حقوقی"}
        </S.Info>
      </S.InfoContainer>

      {/* Investment table */}
      <S.Title>جدول سرمایه‌گذاری</S.Title>
      <S.TableContainer
        value={customer?.ddn_history}
        tableStyle={{ minWidth: "30rem" }}
        emptyMessage={"داده ای برای نمایش وجود ندارد"}
      >
        <S.TableColumn
          align={"center"}
          field="ticker"
          header="نماد"
        ></S.TableColumn>
        <S.TableColumn
          align={"center"}
          field="date"
          header="تاریخ گزارش"
        ></S.TableColumn>
        <S.TableColumn
          align={"center"}
          field="total_count"
          header="سهام کل"
        ></S.TableColumn>
        <S.TableColumn
          align={"center"}
          field="wage"
          header="کارمزد مدیر"
          body={(rowData: DdnHistoryEntry) => Number(rowData.wage).toFixed(2)}
        ></S.TableColumn>
      </S.TableContainer>

      {/* Chart section */}
      <S.Title>نمودار سرمایه‌گذاری</S.Title>
      {chartData.length > 0 ? (
        <S.ChartContainer>
          <LineChart width={700} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {lineKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </S.ChartContainer>
      ) : (
        <p>نموداری برای نمایش وجود ندارد</p>
      )}
    </S.Container>
  );
};

export default InfoModal;
