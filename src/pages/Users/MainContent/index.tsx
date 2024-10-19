import { AppDispatch, SFC } from "@/types";
import * as S from "./Styles";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import DataTable from "@/components/DataTable";
import { useSelector } from "react-redux";
import { getUsers } from "@/selectors/state";
import {
  createUsersList,
  deleteUser,
  editUser,
  exportUser,
  exportUserDetail,
  getUser,
  getUserDetail,
} from "@/api/users";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUsersList } from "@/dispatchers/users";
import { getTheme } from "@/redux/selectors";
import LineChart from "@/components/chart";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import usersBack from "@/assets/usersBack.png";

const dialogStyle = {
  width: "30vw",
  borderRadius: "15px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};
const detailDialogStyle = {
  width: "80vw",
  borderRadius: "15px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
};

const columnFields = [
  {
    field: "is_active",
    header: "",
    width: "10%",
  },
  {
    field: "full_name",
    header: "نام کاربر",
    width: "10%",
  },
  {
    field: "national_id",
    header: "کد ملی",
    width: "10%",
  },
  {
    field: "phone",
    header: "شماره موبایل",
    width: "10%",
  },
  {
    field: "email",
    header: "ایمیل",
    width: "10%",
    align: "left",
  },
  {
    field: "details",
    header: "جزییات",
    width: "10%",
  },
  {
    field: "edit",
    header: "ویرایش",
    width: "10%",
  },
  // {
  //     field: 'change_status',
  //     header: 'تغییر وضعیت',
  //     width: '10%',
  // },
];

const DetailColumnFields = [
  {
    field: "delete",
    header: "",
    width: "10%",
  },
  {
    field: "full_name",
    header: "نام کاربر",
    width: "10%",
    align: "right",
  },
  {
    field: "ticker",
    header: "نماد",
    width: "10%",
  },
  {
    field: "total_wage",
    header: "کارمزد",
    width: "10%",
  },
  {
    field: "count_days",
    header: "روز شمار",
    width: "10%",
  },
  {
    field: "details",
    header: "جزئیات",
    width: "10%",
  },
];

const customerDetailColumnFields = [
  {
    field: "id",
    header: "",
    width: "5%",
  },
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

const MainContent: SFC = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [userDetail, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    phone: "",
    email: "",
    is_active: true,
    marketerShare: "",
    feeRate: "",
  });
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    national_id: "",
    phone: "",
    email: "",
    is_active: true,
  });
  const [usersData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    full_name: "",
    national_id: "",
  });
  const [selectedUser2, setSelectedUser2] = useState({
    ticker: "",
    full_name: "",
    count_days: "",
    total_wage: "",
    national_id: "",
  });
  const [detailModal2, setDetailModal2] = useState(false);
  const [ddnHistory, setDdnHistory] = useState([]);
  const [ddnHistoryChart, setDdnHistoryChart] = useState<{
    labels: string[];
    datasets: { name: string; data: number[]; borderColor: string }[];
  }>({ labels: [], datasets: [] });

  const [tableHeight, setTableHeight] = useState(window.innerHeight - 350);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setTableHeight(window.innerHeight - 350)
    );
  }, []);

  const theme = useSelector(getTheme);
  const headerStyle = {
    background: theme === "dark" ? "#262626" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    padding: "1rem",
    borderBottom: "1px solid #e9ecef",
    fontWeight: "bold",
    textAlign: "center" as const,
  };
  const contentStyle = {
    padding: "2rem",
    background: theme === "dark" ? "#262626" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  const userStoreData = useSelector(getUsers)?.data;

  const getDataFunc = async () => {
    if (!userStoreData.length) {
      setLoading(true);
      await dispatch(fetchUsersList());
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFunc();
  }, []);

  useEffect(() => {
    setUserData(userStoreData);
  }, [userStoreData]);

  const handleEditClick = (detail) => {
    setEditModal(true);
    setUserDetail(detail);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const editUserFunc = async () => {
    if (!userDetail.email || !userDetail.national_id || !userDetail.phone) {
      toast.error("لطفا تمامی مقادیر را پر کنید.");
      return;
    }
    if (userDetail.national_id.length !== 10) {
      toast.error("کدملی معتبر نیست.");
      return;
    }
    if (userDetail.phone.length !== 11) {
      toast.error("شماره موبایل معتبر نیست.");
      return;
    }
    if (!validateEmail(userDetail.email)) {
      toast.error("ایمیل معتبر نیست.");
      return;
    }
    if (parseInt(userDetail.marketerShare) > 100) {
      toast.error("سهم بازاریاب معتبر نیست.");
      return;
    }
    if (parseInt(userDetail.feeRate) > 100) {
      toast.error("نرخ کارمزد معتبر نیست.");
      return;
    }
    try {
      const data = {
        national_id: userDetail.national_id,
        phone: userDetail.phone,
        email: userDetail.email,
      };
      await editUser(dispatch, data.national_id, data);
      toast.success("کاربر با موفقیت ویرایش شد.");
      setEditModal(false);
      Promise.all([dispatch(fetchUsersList())]);
    } catch (error) {
      if (error.response.data.email) {
        if (
          error.response.data.email[0] ===
          "custom user with this email already exists."
        ) {
          toast.error("کاربر با این ایمیل وجود دارد");
        } else {
          toast.error("ایمیل وارد شده معتبر نیست");
        }
      }
      if (error.response.data.national_id) {
        toast.error("کاربر با این کد ملی وجود دارد");
      }
      if (error.response.data.phone) {
        toast.error("کاربر با این شماره وجود دارد");
      }
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const createUser = async () => {
    if (
      !newUser.email ||
      !newUser.first_name ||
      !newUser.last_name ||
      !newUser.national_id ||
      !newUser.phone
    ) {
      toast.error("لطفا تمامی مقادیر را پر کنید.");
      return;
    }
    try {
      await createUsersList(dispatch, newUser);
      toast.success("کاربر با موفقیت ایجاد شد.");
      setAddUserModal(false);
      Promise.all([dispatch(fetchUsersList())]);
    } catch (error) {
      if (error.response.data.email) {
        if (
          error.response.data.email[0] ===
          "custom user with this email already exists."
        ) {
          toast.error("کاربر با این ایمیل وجود دارد");
        } else {
          toast.error("ایمیل وارد شده معتبر نیست");
        }
      }
      if (error.response.data.national_id) {
        toast.error("کاربر با این کد ملی وجود دارد");
      }
      if (error.response.data.phone) {
        toast.error("کاربر با این شماره وجود دارد");
      }
    }
  };

  const handleDetailsClick = async (detail) => {
    const response = await getUser(dispatch, detail.national_id);
    response.forEach((e) => {
      e.total_wage = e.total_wage.toFixed(1);
    });
    setDetail(response);
    setSelectedUser(detail);
    setDetailModal(true);
  };

  const exportData = async () => {
    if (selectedUser) {
      try {
        const response = await exportUser(dispatch, selectedUser.national_id);
        const blob = response;

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "user.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        toast.success("گزارش با موفقیت دریافت شد");
      } catch (error) {
        console.error("Error downloading file:", error);
        toast.error("مشکل در دریافت گزارش");
      }
    }
  };

  const downloadUserDetail = async () => {
    try {
      const response = await exportUserDetail(
        dispatch,
        selectedUser.national_id,
        {
          ticker: selectedUser2.ticker,
          national_id: selectedUser2.national_id,
        }
      );
      const blob = response;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("گزارش با موفقیت دریافت شد");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("مشکل در دریافت گزارش");
    }
  };

  const handleChangeStatusClick = (detail) => {
    setChangeStatusModal(true);
    setSelectedUser(detail);
  };

  const changeStatusFunc = async (detail) => {
    try {
      await editUser(dispatch, detail.national_id, {
        ...detail,
        is_active: !detail.is_active,
      });
      toast.success("وضعیت با موفقیت تغییر یافت.");
      setChangeStatusModal(false);
      await dispatch(fetchUsersList());
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داده است");
      throw error;
    }
  };

  const filterList = (value) => {
    if (value) {
      setSearch(value);
      const newList = userStoreData.filter((e) => e.full_name.includes(value));
      setUserData(newList);
    } else {
      setSearch(value);
      setUserData(userStoreData);
    }
  };

  const handleDetailsClick2 = async (e) => {
    try {
      const res = await getUserDetail(dispatch, selectedUser.national_id, {
        national_id: e.national_id,
        ticker: e.ticker,
      });
      console.log(res);
      if (res.ddn_history_chart && res.ddn_history_chart.length > 0) {
        const chartData = res.ddn_history_chart[0] as {
          [key: string]: { total_count: number[]; dates: string[] };
        };
        const datasets = Object.entries(chartData)?.map(([ticker, data]) => {
          return {
            name: ticker,
            data: data?.total_count?.reverse(),
            borderColor: theme === "dark" ? "white" : "black",
            fill: false,
            tension: 0.1,
          };
        });

        const maxDatesDataset = datasets?.reduce((prev, current) =>
          prev.data.length > current.data.length ? prev : current
        );

        setDdnHistoryChart({
          labels: chartData[maxDatesDataset.name].dates.reverse(),
          datasets: datasets,
        });
      }

      if (res.ddn_history && res.ddn_history.length > 0) {
        setDdnHistory(res.ddn_history);
      }

      setSelectedUser2(e);
      setDetailModal2(true);
    } catch (error) {}
  };

  const handleDeleteClick = async (e) => {
    console.log(selectedUser);
    console.log(e);
    try {
      await deleteUser(dispatch, selectedUser.national_id, {
        national_id: e.national_id,
        ticker: e.ticker,
      });
      toast.success("کاربر با موفقیت حذف شد.");
      setDetailModal(false);
    } catch (error) {
      console.error(error);
      toast.error("خطایی در حذف کاربر رخ داده است");
      throw error;
    }
  };

  const footerContent = (
    <div className="flex justify-center">
      <Button
        label="انصراف"
        severity="danger"
        onClick={() => setAddUserModal(false)}
        className={` rounded-lg text-red-700  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
      />
      <Button
        label="ایجاد کاربر"
        onClick={() => createUser()}
        className={` rounded-lg  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
      />
    </div>
  );
  const footerContentChangeStatus = (
    <div className="flex justify-center">
      <Button
        label="انصراف"
        className={` rounded-lg text-red-700  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
        severity="danger"
        onClick={() => setChangeStatusModal(false)}
      />
      <Button
        label="تغییر وضعیت"
        onClick={() => changeStatusFunc(selectedUser)}
        className={` rounded-lg  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
      />
    </div>
  );
  const detailFooterContent = (
    <div className="flex justify-center">
      <Button
        label="انصراف"
        className={` rounded-lg text-red-700  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
        severity="danger"
        onClick={() => setEditModal(false)}
      />
      <Button
        label="ویرایش کاربر"
        onClick={() => editUserFunc()}
        className={` rounded-lg  ${theme === "dark" ? "text-white" : "text-black"}`}
        outlined
      />
    </div>
  );

  return (
    <div className="relative">
      <S.Background $url={usersBack} />
      <S.Container>
        <h1 className="text-right mb-14 px-10 text-4xl">کاربران</h1>
        <div className="flex mt-10 mb-2 gap-5 justify-between flex-wrap items-center px-2.5">
          <div className="flex gap-5">
            <Button
              label="ایجاد کاربر جدید"
              onClick={() => {
                setAddUserModal(true);
              }}
              icon="pi pi-plus ml-2 text-sm"
              className={` rounded-lg py-2 text-sm ${theme === "dark" ? "text-white" : "text-black"}`}
              outlined
            />
            <Button
              label="بارگذاری"
              icon="pi pi-upload ml-2 text-sm"
              className={` rounded-lg  py-2 text-sm ${theme === "dark" ? "text-white" : "text-black"}`}
              outlined
            />
          </div>
          <S.FloatLabelSection>
            <S.FloatLabelInput
              id="search"
              value={search}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                filterList(e.target.value)
              }
            />
            <label htmlFor="search" className="text-right right-0 bg-inherit">
              جستجو
            </label>
          </S.FloatLabelSection>

          <S.DialogStyle
            header="ایجاد کاربر جدید"
            visible={addUserModal}
            style={dialogStyle}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            onHide={() => setAddUserModal(false)}
            dismissableMask
            // footer={footerContent}
            draggable={false}
            resizable={false}
          >
            <div className="flex flex-col gap-10 items-center">
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="firstName"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  className="text-right"
                />
                <label
                  htmlFor="firstName"
                  className="text-right right-0 bg-inherit"
                >
                  نام کاربر
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="lastName"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  className="text-right"
                />
                <label
                  htmlFor="lastName"
                  className="text-right right-0 bg-inherit"
                >
                  نام خانوادگی کاربر
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="nationalId"
                  value={newUser.national_id}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      national_id: e.target.value,
                    }))
                  }
                  keyfilter="int"
                />
                <label
                  htmlFor="nationalId"
                  className="text-right right-0 bg-inherit"
                >
                  کد ملی
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  keyfilter="int"
                />
                <label
                  htmlFor="phone"
                  className="text-right right-0 bg-inherit"
                >
                  شماره موبایل
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="email"
                  className="text-right right-0 bg-inherit"
                >
                  ایمیل
                </label>
              </S.FloatLabelSection>
              <div className="flex justify-center gap-5">
                <Button
                  label="انصراف"
                  severity="danger"
                  onClick={() => setAddUserModal(false)}
                  className={` rounded-lg text-red-700  ${theme === "dark" ? "text-white" : "text-black"}`}
                  outlined
                />
                <Button
                  label="ایجاد کاربر"
                  onClick={() => createUser()}
                  className={` rounded-lg  ${theme === "dark" ? "text-white" : "text-black"}`}
                  outlined
                />
              </div>
            </div>
          </S.DialogStyle>
          <S.DialogStyle
            header="تغییر وضعیت کاربر"
            visible={changeStatusModal}
            style={dialogStyle}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            onHide={() => setChangeStatusModal(false)}
            footer={footerContentChangeStatus}
            draggable={false}
            resizable={false}
          >
            <div>آیا از تغییر وضعیت کاربر مطمئن هستید؟</div>
          </S.DialogStyle>
          <S.DialogStyle
            header={selectedUser?.full_name}
            visible={detailModal}
            style={detailDialogStyle}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            onHide={() => setDetailModal(false)}
            dismissableMask
            draggable={false}
            resizable={false}
          >
            <div className="flex justify-end mb-5">
              <Button
                onClick={exportData}
                icon="pi pi-download"
                text
                className={` rounded-lg px-5 aspect-square ${theme === "dark" ? "text-white" : "text-black"}`}
              />
            </div>
            <DataTable
              data={detail}
              columnFields={DetailColumnFields}
              pagination
              onDetailsClick={handleDetailsClick2}
              onDeleteClick={handleDeleteClick}
            />
          </S.DialogStyle>
          <S.DialogStyle
            header={selectedUser?.full_name}
            visible={detailModal2}
            style={detailDialogStyle}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            onHide={() => setDetailModal2(false)}
            dismissableMask
            draggable={false}
            resizable={false}
          >
            <div className="flex justify-end">
              <Button
                onClick={downloadUserDetail}
                icon="pi pi-download text-xl"
                text
                className={` rounded-lg p-6 aspect-square ${theme === "dark" ? "text-white" : "text-black"}`}
              />
            </div>
            <DataTable
              data={ddnHistory}
              loading={false}
              columnFields={customerDetailColumnFields}
              pagination={true}
              totalRecords={ddnHistory.length}
              selectedRows={10}
              rowsOption={10}
            />

            {/* <h3 className="font-bold">نمودار سرمایه‌گذاری</h3> */}
            <div className="flex justify-center mt-10">
              <LineChart
                datasets={ddnHistoryChart.datasets}
                labels={ddnHistoryChart.labels}
              />
            </div>
          </S.DialogStyle>
          <S.DialogStyle
            header="ویرایش کاربر"
            visible={editModal}
            style={dialogStyle}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            onHide={() => setEditModal(false)}
            draggable={false}
            resizable={false}
            dismissableMask
          >
            <div className="flex flex-col items-center gap-10">
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="nationalCode"
                  value={userDetail.national_id}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      national_id: e.target.value,
                    }))
                  }
                  keyfilter="int"
                />
                <label
                  htmlFor="nationalCode"
                  className="text-right right-0 bg-inherit"
                >
                  کد ملی
                </label>
              </S.FloatLabelSection>

              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="phoneNumber"
                  value={userDetail.phone}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  keyfilter="int"
                />
                <label
                  htmlFor="phoneNumber"
                  className="text-right right-0 bg-inherit"
                >
                  شماره موبایل
                </label>
              </S.FloatLabelSection>

              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="email"
                  value={userDetail.email}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  keyfilter="int"
                />
                <label
                  htmlFor="email"
                  className="text-right right-0 bg-inherit"
                >
                  ایمیل
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="feeRate"
                  value={userDetail.feeRate}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      feeRate: e.target.value,
                    }))
                  }
                  keyfilter="int"
                  max={100}
                />
                <label
                  htmlFor="feeRate"
                  className="text-right right-0 bg-inherit"
                >
                  نرخ کارمزد
                </label>
              </S.FloatLabelSection>
              <S.FloatLabelSection>
                <S.FloatLabelInput
                  id="marketerShare"
                  value={userDetail.marketerShare}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      marketerShare: e.target.value,
                    }))
                  }
                  keyfilter="int"
                  max={100}
                />
                <label
                  htmlFor="marketerShare"
                  className="text-right right-0 bg-inherit"
                >
                  سهم بازاریاب
                </label>
              </S.FloatLabelSection>
              <div className="flex justify-center gap-5">
                <Button
                  label="انصراف"
                  className={` rounded-lg text-red-700  ${theme === "dark" ? "text-white" : "text-black"}`}
                  outlined
                  severity="danger"
                  onClick={() => setEditModal(false)}
                />
                <Button
                  label="ویرایش کاربر"
                  onClick={() => editUserFunc()}
                  className={` rounded-lg  ${theme === "dark" ? "text-white" : "text-black"}`}
                  outlined
                />
              </div>
            </div>
          </S.DialogStyle>
        </div>
        {loading ? (
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
            data={usersData}
            columnFields={columnFields}
            onDetailsClick={handleDetailsClick}
            onEditClick={handleEditClick}
            onChangeStatusClick={handleChangeStatusClick}
            pagination
            scrollHeight={tableHeight + "px"}
          />
        )}
      </S.Container>
    </div>
  );
};

export default MainContent;
