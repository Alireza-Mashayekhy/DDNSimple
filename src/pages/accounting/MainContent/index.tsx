import { useState, useEffect } from 'react';
import * as S from './Styles';
import { getCustomers } from '@/api/customerData';
import { toast } from 'react-toastify';
import background from '@/assets/customersBack.jpg';
import {
    transactionsCustomers,
    getTransactionsList,
    deleteTransaction,
    transactionDetail,
    exportTransactionDetail,
} from '@/api/customers';
import DataTable from '@/components/DataTable';
import { TabPanel, TabView } from 'primereact/tabview';
import { mdiTrashCan } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/types';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { Button } from 'primereact/button';

const detailDialogStyle = {
    width: '60vw',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
};

export default function MainContent() {
    const [customers, setCustomers] = useState([]);
    const [transactionsList, setTransactions] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [changeActiveIndex, setChangeActiveIndex] = useState(0);
    const [tableHeight, setTableHeight] = useState(window.innerHeight - 570);
    const [selectedRemoveCustomer, setSelectedRemoveCustomer] = useState(null);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [totalCommission, setTotalCommission] = useState(0);
    const [selectedFactor, setSelectedFactor] = useState({
        transaction_id: '',
    });
    const [detailModal, setDetailModal] = useState(false);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        window.addEventListener('resize', () =>
            setTableHeight(window.innerHeight - 570)
        );
    }, []);

    const dispatch = useDispatch<AppDispatch>();

    const theme = useSelector(getTheme);

    const headerStyle = {
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '1rem',
        borderBottom: '1px solid #e9ecef',
        fontWeight: 'bold',
        textAlign: 'center' as const,
    };
    const contentStyle = {
        padding: '2rem',
        background: theme === 'dark' ? '#262626' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
    };

    const getCustomersHandler = () => {
        getCustomers(dispatch)
            .then((res) => {
                setCustomers(res?.data);
            })
            .catch((error) => {
                toast(error.message);
            });
    };
    const getTransactionsHandler = async () => {
        const res = await getTransactionsList();
        setTransactions(res);
    };
    useEffect(() => {
        getCustomersHandler();
        getTransactionsHandler();
    }, []);

    function numberFormatter(number: number) {
        const isNegative = number < 0;
        const absNumberStr = Math.abs(number).toString();
        const formattedNumber = absNumberStr.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
        );
        return isNegative ? `(${formattedNumber})` : formattedNumber;
    }

    const checkSelectedCustomer = (checked, customer) => {
        setTotalCommission((prev) => {
            if (checked) {
                return prev + customer.payable_commission;
            } else {
                return prev - customer.payable_commission;
            }
        });
        setSelectedCustomers((prevSelectedCustomers) => {
            if (checked) {
                return [...prevSelectedCustomers, customer];
            } else {
                return prevSelectedCustomers.filter((c) => c !== customer);
            }
        });
    };

    const removeCustomer = (event, customer) => {
        event.stopPropagation();
        console.log(customer);
        const removeCustomer = {
            transaction_id: customer?.transaction_id,
        };
        setSelectedRemoveCustomer(removeCustomer);
        setRemoveModalVisible(true);
    };

    const confirmRemove = async () => {
        try {
            await deleteTransaction(selectedRemoveCustomer.transaction_id);
            setRemoveModalVisible(false);
            getTransactionsHandler();
            getCustomersHandler();
        } catch (error) {
            toast(error.message);
        }
    };

    const footerContent = (
        <S.FooterContainer>
            <S.FooterButton
                label="بستن"
                onClick={() => setRemoveModalVisible(false)}
                autoFocus
            ></S.FooterButton>
            <S.FooterButton
                label="حذف"
                onClick={() => confirmRemove()}
                autoFocus
            ></S.FooterButton>
        </S.FooterContainer>
    );

    const customerColumnFields = [
        {
            field: 'select',
            header: '',
            width: '10%',
            body: (data) => {
                return data.status_Withdrawal_money &&
                    data.payable_commission !== 0 ? (
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            className="cursor-pointer w-5 h-5 m-0"
                            onChange={(e) =>
                                checkSelectedCustomer(e.target.checked, data)
                            }
                        />
                    </div>
                ) : null;
            },
        },
        {
            field: 'full_name',
            header: 'نام مشتری',
            width: '10%',
        },
        {
            field: 'payable_commission',
            header: 'کارمزد بازاریاب',
            width: '10%',
            body: (data) => {
                return numberFormatter(
                    Number(data.payable_commission.toFixed(2))
                );
            },
        },
        {
            field: 'status_Withdrawal_money',
            header: 'وضعیت درخواست',
            width: '10%',
            body: (data) => {
                return (
                    <div className="my-1">
                        {data.status_Withdrawal_money ? '-' : 'در انتظار تایید'}
                    </div>
                );
            },
        },
    ];

    const transactionColumnFields = [
        {
            field: 'delete',
            header: '',
            width: '10%',
            body: (customer) => {
                return (
                    <Button
                        icon="pi pi-trash"
                        text
                        onClick={(event) => {
                            removeCustomer(event, customer);
                        }}
                        className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    />
                );
            },
        },
        {
            field: 'transaction_id',
            header: 'شماره فاکتور',
            width: '20%',
        },
        {
            field: 'jalali_date',
            header: 'تاریخ',
            width: '20%',
        },
        {
            field: 'details',
            header: 'جزئیات',
            width: '20%',
        },
        {
            field: 'download',
            header: 'دانلود',
            width: '20%',
        },
    ];

    const DetailColumnFields = [
        {
            field: 'full_name',
            header: 'نام مشتری',
            width: '10%',
        },
        {
            field: 'commission',
            header: 'کارمزد تسویه شده',
            width: '10%',
        },
        {
            field: 'jalali_date',
            header: 'تاریخ',
            width: '10%',
        },
    ];

    const transactions = async () => {
        if (selectedCustomers.length) {
            const data = selectedCustomers.map((e) => {
                return {
                    ticker: e.ticker,
                    national_id: e.national_id,
                };
            });
            await transactionsCustomers({ customers: data });
            await getCustomersHandler();
            await getTransactionsHandler();
            toast.success('تسویه با موفقیت انجام شد');
        } else {
            toast.error('حداقل یک مشتری را انتخاب کنید.');
        }
    };

    const handleDetailsClick = async (detail) => {
        const response = await transactionDetail(detail.transaction_id);
        response.full_name =
            response.customer.first_name ||
            '' + response.customer.last_name ||
            '';
        setDetail([response]);
        setSelectedFactor(detail);
        setDetailModal(true);
    };

    const handleDownloadClick = async (detail) => {
        try {
            const response = await exportTransactionDetail({
                transaction_id: detail.transaction_id,
            });
            const blob = response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute(
                'download',
                `factor-${detail.transaction_id}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('با موفقیت ذخیره شد.');
        } catch (error: any) {
            toast(error.message || 'خطایی رخ داد.');
        }
    };
    const downloadRow = async () => {
        try {
            const response = await exportTransactionDetail({
                transaction_id: selectedFactor.transaction_id,
            });
            const blob = response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute(
                'download',
                `factor-${selectedFactor.transaction_id}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('با موفقیت ذخیره شد.');
        } catch (error: any) {
            toast(error.message || 'خطایی رخ داد.');
        }
    };

    return (
        <div className="relative p-5 pt-12">
            <S.Background $url={background} />
            <h1 className="text-right mb-10 px-10 relative text-4xl">
                حسابداری
            </h1>
            <TabView
                activeIndex={changeActiveIndex}
                onTabChange={(e) => setChangeActiveIndex(e.index)}
                className=""
            >
                <TabPanel header="مشتریان">
                    <DataTable
                        data={customers}
                        columnFields={customerColumnFields}
                        totalRecords={customers?.length}
                        pagination={true}
                        scrollHeight={tableHeight + 'px'}
                    />
                    <div className="flex justify-end mt-5 items-center gap-5">
                        <S.totalText>
                            کارمزد کل:{' '}
                            {numberFormatter(
                                Number(totalCommission.toFixed(2))
                            )}
                        </S.totalText>
                        <S.DownloadButton onClick={transactions}>
                            درخواست تسویه
                        </S.DownloadButton>
                    </div>
                </TabPanel>
                <TabPanel header="فاکتور ها">
                    <DataTable
                        data={transactionsList}
                        columnFields={transactionColumnFields}
                        totalRecords={transactionsList?.length}
                        pagination={true}
                        onDetailsClick={handleDetailsClick}
                        onDownloadClick={handleDownloadClick}
                        scrollHeight={tableHeight + 'px'}
                    />
                    <S.RemoveModal
                        header={'حذف فاکتور'}
                        footer={footerContent}
                        visible={removeModalVisible}
                        onHide={() => setRemoveModalVisible(false)}
                        style={{ width: '40vw', minWidth: '300px' }}
                    >
                        <S.RemoveMessage>
                            آیا از حذف فاکتور "
                            {selectedRemoveCustomer?.transaction_id}" مطمئن
                            هستید؟
                        </S.RemoveMessage>
                    </S.RemoveModal>
                    <S.DialogStyle
                        header={selectedFactor?.transaction_id}
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
                                onClick={downloadRow}
                                icon="pi pi-download"
                                text
                                className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                            />
                        </div>
                        <DataTable
                            data={detail}
                            columnFields={DetailColumnFields}
                        />
                    </S.DialogStyle>
                </TabPanel>
            </TabView>
        </div>
    );
}
