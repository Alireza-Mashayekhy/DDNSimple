<<<<<<< HEAD
import { AppDispatch, SFC } from '@/types';
import * as S from './Styles';
import { useEffect, useState } from 'react';
import { addCustomer, getCustomersData, getTickers } from '@/api/customerData';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
=======
import { AppDispatch, SFC } from "@/types";
import * as S from "./Styles";
import { useEffect, useState } from "react";
import { addCustomer, getCustomersData, getTickers } from "@/api/customerData";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTheme } from "@/redux/selectors";
>>>>>>> c18f266dacf7b592727fd385468429e6a24ab17d

export interface AddCustomerModalProps {
    visible: boolean;
    setVisibleProp: (value: boolean) => void;
}

const AddModal: SFC<AddCustomerModalProps> = ({ visible, setVisibleProp }) => {
    const [ticker, setTicker] = useState(null);
    const [tickers, setTickers] = useState(null);
    const [filteredTickers, setFilteredTickers] = useState([]);
    const [name, setName] = useState(null);
    const [nationalCode, setNationalCode] = useState(null);
    const [stickCode, setStickCode] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getTickers()
            .then((res) => {
                setTickers(res?.data);
            })
            .catch((error) => {
                toast(error.message);
            });

        getCustomersData()
            .then((res) => {
                setCustomers(res?.data);
            })
            .catch((error) => {
                toast(error.message);
            });
    }, []);

    const search = (event, field) => {
        const query = event.query.toLowerCase();
        const filtered = customers.filter((customer) =>
            customer[field].toLowerCase().includes(query)
        );
        setFilteredCustomers(filtered);
    };

    const searchTicker = (event) => {
        const query = event.query.toLowerCase();
        const filtered = tickers.filter((ticker) =>
            ticker.ticker.toLowerCase().includes(query)
        );
        setFilteredTickers(filtered);
    };

    const selectCustomer = (event) => {
        setName(event);
        setNationalCode(event);
        setStickCode(event);
    };

    const add = () => {
        if (ticker && name && nationalCode && stickCode) {
            const customerInfo = {
                national_id: nationalCode.national_id,
                ticker: ticker.ticker,
            };
            addCustomer(customerInfo)
                .then((res) => {
                    setVisibleProp(false);
                    window.location.reload();
                })
                .catch((error) => {
                    toast(error.message);
                });
        } else {
            toast('لطفا فیلد های خالی را پر کنید!');
        }
    };

    const footerContent = (
        <S.FooterContainer>
            <S.FooterButton
                label="انصراف"
                onClick={() => setVisibleProp(false)}
                autoFocus
            ></S.FooterButton>
            <S.FooterButton
                label="ذخیره"
                onClick={() => add()}
                autoFocus
            ></S.FooterButton>
        </S.FooterContainer>
    );

    const theme = useSelector(getTheme);

    const headerStyle = {
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '1rem',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
    };

    const contentStyle = {
        padding: '2rem',
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
    };

    return (
        <S.Container
            header={'ایجاد مشتری جدید'}
            // footer={footerContent}
            visible={visible}
            onHide={() => {
                if (!visible) return;
                setVisibleProp(false);
            }}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            dismissableMask
            style={{ width: '30vw', minWidth: '300px' }}
        >
            <S.InputsContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="ticker">نماد</S.InputLabel>
                    <S.Input
                        value={ticker}
                        suggestions={filteredTickers}
                        completeMethod={searchTicker}
                        onChange={(e) => setTicker(e.target.value)}
                        field="ticker"
                        id="ticker"
                        forceSelection
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="nationalCode">کد ملی *</S.InputLabel>
                    <S.Input
                        value={nationalCode}
                        suggestions={filteredCustomers}
                        completeMethod={(e) => search(e, 'national_id')}
                        onSelect={(e) => selectCustomer(e.value)}
                        onChange={(e) => setNationalCode(e.target.value)}
                        field="national_id"
                        id="nationalCode"
                        forceSelection
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="stickCode">کد بورسی *</S.InputLabel>
                    <S.Input
                        value={stickCode}
                        suggestions={filteredCustomers}
                        completeMethod={(e) => search(e, 'stock_id')}
                        onSelect={(e) => selectCustomer(e.value)}
                        onChange={(e) => setStickCode(e.target.value)}
                        field="stock_id"
                        id="stickCode"
                        forceSelection
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="name">نام سهامدار</S.InputLabel>
                    <S.Input
                        value={name}
                        suggestions={filteredCustomers}
                        completeMethod={(e) => search(e, 'full_name')}
                        onSelect={(e) => selectCustomer(e.value)}
                        onChange={(e) => setName(e.target.value)}
                        field="full_name"
                        id="name"
                        forceSelection
                    />
                </S.InputContainer>
                <div className="text-xs">
                    در مورد کدهای سبدگردانی (PRX) نیازی به وارد کردن کدملی
                    نمی‌باشد.
                </div>
                <S.FooterContainer>
                    <S.FooterButton
                        label="انصراف"
                        onClick={() => setVisibleProp(false)}
                        autoFocus
                    ></S.FooterButton>
                    <S.FooterButton
                        label="ذخیره"
                        onClick={() => add()}
                        autoFocus
                    ></S.FooterButton>
                </S.FooterContainer>
            </S.InputsContainer>
        </S.Container>
    );
<<<<<<< HEAD
=======
    setFilteredTickers(filtered);
  };

  const selectCustomer = (event) => {
    setName(event);
    setNationalCode(event);
    setStickCode(event);
  };

  const add = () => {
    if (ticker && name && nationalCode && stickCode) {
      const customerInfo = {
        national_id: nationalCode.national_id,
        ticker: ticker.ticker,
      };
      addCustomer(customerInfo)
        .then((res) => {
          setVisibleProp(false);
          window.location.reload();
        })
        .catch((error) => {
          toast(error.message);
        });
    } else {
      toast("لطفا فیلد های خالی را پر کنید!");
    }
  };

  const footerContent = (
    <S.FooterContainer>
      <S.FooterButton
        label="انصراف"
        onClick={() => setVisibleProp(false)}
        autoFocus
      ></S.FooterButton>
      <S.FooterButton
        label="ذخیره"
        onClick={() => add()}
        autoFocus
      ></S.FooterButton>
    </S.FooterContainer>
  );

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

  return (
    <S.Container
      header={"ایجاد مشتری جدید"}
      // footer={footerContent}
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisibleProp(false);
      }}
      headerStyle={headerStyle}
      contentStyle={contentStyle}
      dismissableMask
      style={{ width: "30vw", minWidth: "300px" }}
    >
      <S.InputsContainer>
        <S.InputContainer>
          <S.InputLabel htmlFor="ticker">نماد</S.InputLabel>
          <S.Input
            value={ticker}
            suggestions={filteredTickers}
            completeMethod={searchTicker}
            onChange={(e) => setTicker(e.target.value)}
            field="ticker"
            id="ticker"
            forceSelection
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputLabel htmlFor="nationalCode">کد ملی *</S.InputLabel>
          <S.Input
            value={nationalCode}
            suggestions={filteredCustomers}
            completeMethod={(e) => search(e, "national_id")}
            onSelect={(e) => selectCustomer(e.value)}
            onChange={(e) => setNationalCode(e.target.value)}
            field="national_id"
            id="nationalCode"
            forceSelection
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputLabel htmlFor="stickCode">کد بورسی *</S.InputLabel>
          <S.Input
            value={stickCode}
            suggestions={filteredCustomers}
            completeMethod={(e) => search(e, "stock_id")}
            onSelect={(e) => selectCustomer(e.value)}
            onChange={(e) => setStickCode(e.target.value)}
            field="stock_id"
            id="stickCode"
            forceSelection
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.InputLabel htmlFor="name">نام سهامدار</S.InputLabel>
          <S.Input
            value={name}
            suggestions={filteredCustomers}
            completeMethod={(e) => search(e, "full_name")}
            onSelect={(e) => selectCustomer(e.value)}
            onChange={(e) => setName(e.target.value)}
            field="full_name"
            id="name"
            forceSelection
          />
        </S.InputContainer>
        <div className="text-xs">
          در مورد کدهای سبدگردانی (PRX) نیازی به وارد کردن کدملی نمی‌باشد.
        </div>
        <S.FooterContainer>
          <S.FooterButton
            label="انصراف"
            onClick={() => setVisibleProp(false)}
            autoFocus
          ></S.FooterButton>
          <S.FooterButton
            label="ذخیره"
            onClick={() => add()}
            autoFocus
          ></S.FooterButton>
        </S.FooterContainer>
      </S.InputsContainer>
    </S.Container>
  );
>>>>>>> c18f266dacf7b592727fd385468429e6a24ab17d
};

export default AddModal;
