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
import { searchAdminCustomer, searchCustomers } from '@/api/customers';
import { DatePicker } from 'zaman';
export interface AddCustomerModalProps {
    idCustomer?: number;
    visible: boolean;
    setVisibleProp: (value: boolean) => void;
}
import moment from 'moment-jalaali';

const AdminAddModal: SFC<AddCustomerModalProps> = ({
    idCustomer,
    visible,
    setVisibleProp,
}) => {
    const [ticker, setTicker] = useState('سیناد');
    const [tickers, setTickers] = useState(null);
    const [filteredTickers, setFilteredTickers] = useState([]);
    const [name, setName] = useState(null);
    const [nationalCode, setNationalCode] = useState(null);
    const [stickCode, setStickCode] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [searchedCustomer, setSearchedCustomer] = useState(false);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getTickers(dispatch).then((res) => {
            const data = res?.data.map((e) => e.ticker);
            setTickers(data);
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
            if (ticker && stickCode && name && nationalCode) {
                try {
                    const customerInfo = {
                        stock_id: stickCode,
                        ticker: ticker,
                        commission_start_date: startDate,
                    };
                    const res = await addAdminCustomer({
                        id: idCustomer,
                        params: customerInfo,
                    });
                    setVisibleProp(false);
                    if (res) {
                        window.location.reload();
                    }
                } catch (error) {
                    if (
                        error.response.data.message ===
                        'Customer does not exist'
                    ) {
                        toast.error('کاربر مورد نظر وجود ندارد.');
                    } else if (
                        error.response.data.message === 'already exists'
                    ) {
                        toast.error('کاربر مورد نظر قبلا اضافه شده است.');
                    } else {
                        console.log(error);
                    }
                }
            } else {
                toast.error('لطفا فیلد های خالی را پر کنید!');
            }
        }
    };

    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
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
            if (!ticker || (!nationalCode && !stickCode && !name)) {
                toast.error('لطفا تمامی مقادیر را پر کنید');
                return;
            }
            const params: { [key: string]: string } = {
                ticker: ticker,
            };
            if (nationalCode) {
                params.national_id = nationalCode;
            }
            if (stickCode) {
                params.stock_id = stickCode;
            }
            if (name) {
                params.full_name = name;
            }
            const res = await searchAdminCustomer(params);
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
                    <S.InputLabel htmlFor="nationalCode">کد ملی</S.InputLabel>
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
                    <S.InputLabel htmlFor="stickCode">کد بورسی</S.InputLabel>
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
                {searchedCustomer && (
                    <S.InputContainer>
                        <S.InputLabel htmlFor="name">از تاریخ:</S.InputLabel>

                        <DatePicker
                            className="z-[10000]"
                            round="x4"
                            position="center"
                            onChange={(e) => {
                                setStartDate(
                                    convertToPersianDate(e.value.toISOString())
                                );
                            }}
                            inputClass={
                                theme === 'dark'
                                    ? 'border-[0px] !border-b-[1px] bg-inherit !border-[#BDC3C7] !text-[#ffffff] h-[35px] w-full text-sm !px-0 text-center'
                                    : 'border-[0px] !border-b-[1px] bg-inherit !border-[#7F8C8D] !text-[#000000] h-[35px] w-full text-sm !px-0 text-center'
                            }
                            customShowDateFormat="YY/MM/DD"
                        />
                    </S.InputContainer>
                )}
                <S.FooterContainer>
                    <S.FooterButton
                        label="انصراف"
                        onClick={() => setVisibleProp(false)}
                        autoFocus
                    ></S.FooterButton>
                    {searchedCustomer ? (
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

export default AdminAddModal;
