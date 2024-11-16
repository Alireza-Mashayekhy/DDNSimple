import { AppDispatch, SFC } from '@/types';
import * as S from './Styles';
import { useEffect, useState } from 'react';
import {
    addAdminCustomer,
    addCustomer,
    getCustomersData,
    getTickers,
} from '@/api/customerData';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { searchCustomers } from '@/api/customers';
export interface AddCustomerModalProps {
    idCustomer?: number;
    visible: boolean;
    setVisibleProp: (value: boolean) => void;
}

const AddModal: SFC<AddCustomerModalProps> = ({
    idCustomer,
    visible,
    setVisibleProp,
}) => {
    const [ticker, setTicker] = useState('پایا');
    const [tickers, setTickers] = useState(null);
    const [filteredTickers, setFilteredTickers] = useState([]);
    const [name, setName] = useState(null);
    const [nationalCode, setNationalCode] = useState(null);
    const [stickCode, setStickCode] = useState(null);
    const [searchedCustomer, setSearchedCustomer] = useState(false);

    useEffect(() => {
        getTickers()
            .then((res) => {
                const data = res?.data.map((e) => e.ticker);
                setTickers(data);
            })
            .catch((error) => {
                toast(error.message);
            });
    }, []);

    const searchTicker = (event) => {
        const query = event.query.toLowerCase();
        const filtered = tickers.filter((ticker) =>
            ticker.ticker.toLowerCase().includes(query)
        );
        setFilteredTickers(filtered);
    };

    const add = async () => {
        if (idCustomer) {
            if (ticker && name && nationalCode && stickCode) {
                try {
                    const customerInfo = {
                        id: idCustomer,
                        national_id: nationalCode,
                        ticker: ticker,
                    };
                    const res = await addAdminCustomer(customerInfo);
                    setVisibleProp(false);
                    if (res) {
                        window.location.reload();
                    } else {
                        toast.error('این کاربر قبلا اضافه شده است');
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            } else {
                toast.error('لطفا فیلد های خالی را پر کنید!');
            }
        } else {
            if (ticker && name && nationalCode && stickCode) {
                try {
                    const customerInfo = {
                        national_id: nationalCode,
                        ticker: ticker,
                    };
                    const res = await addCustomer(customerInfo);
                    setVisibleProp(false);
                    if (res) {
                        window.location.reload();
                    } else {
                        toast.error('این کاربر قبلا اضافه شده است');
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            } else {
                toast.error('لطفا فیلد های خالی را پر کنید!');
            }
        }
    };

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

    const searchCustomer = async () => {
        try {
            if (!ticker || !nationalCode || !stickCode) {
                toast.error('لطفا تمامی مقادیر را پر کنید');
                return;
            }
            const res = await searchCustomers({
                ticker: ticker,
                national_id: nationalCode,
                stock_id: stickCode,
            });
            setNationalCode(res[0].national_id);
            setStickCode(res[0].stock_id);
            setName(res[0].full_name);
            setSearchedCustomer(true);
        } catch (error) {
            toast.error('کاربر مورد نظر یافت نشد');
        }
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
                    <S.DropDownStyle
                        options={tickers}
                        value={ticker}
                        onChange={(e: { value: string }) => {
                            setTicker(e.value);
                        }}
                        panelStyle={{
                            background: theme === 'dark' ? 'black' : 'white',
                            color: 'red',
                        }}
                        placeholder="لطفاً یک نماد را انتخاب کنید."
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="nationalCode">کد ملی *</S.InputLabel>
                    <S.InputTextStyle
                        value={nationalCode}
                        onChange={(e) => {
                            setNationalCode(e.target.value),
                                setSearchedCustomer(false);
                        }}
                        id="nationalCode"
                        keyfilter="int"
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="stickCode">کد بورسی *</S.InputLabel>
                    <S.InputTextStyle
                        value={stickCode}
                        onChange={(e) => {
                            setStickCode(e.target.value),
                                setSearchedCustomer(false);
                        }}
                        id="stickCode"
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="name">نام سهامدار</S.InputLabel>
                    <S.InputTextStyle
                        disabled={!idCustomer}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value), setSearchedCustomer(false);
                        }}
                        id="name"
                    />
                </S.InputContainer>
                <div className="text-xs">
                    کد ملی در مورد شناسه‌های prx ، ۱۲۳۴۵ قید شود
                </div>
                <S.FooterContainer>
                    <S.FooterButton
                        label="انصراف"
                        onClick={() => setVisibleProp(false)}
                        autoFocus
                    ></S.FooterButton>
                    {searchedCustomer || idCustomer ? (
                        <S.FooterButton
                            label="ذخیره"
                            onClick={() => add()}
                            autoFocus
                        ></S.FooterButton>
                    ) : (
                        <S.FooterButton
                            label="جستجو"
                            onClick={() => searchCustomer()}
                            autoFocus
                        ></S.FooterButton>
                    )}
                </S.FooterContainer>
            </S.InputsContainer>
        </S.Container>
    );
};

export default AddModal;
