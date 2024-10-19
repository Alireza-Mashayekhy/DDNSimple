import React, { useState, useEffect } from 'react';
import * as S from './Styles';
import defaultAvatar from '@/assets/default-avatar-square.png';
import InfoModal from '@/components/Customers/InfoModal';
import {
    getCustomers,
    getCustomer,
    exportCustomersData,
    removeCustomerApi,
} from '@/api/customerData';
import { toast } from 'react-toastify';
import { mdiFormatListBulleted, mdiViewGrid, mdiTrashCan } from '@mdi/js';
import AddCustomer from '@/components/AddCustomer';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import fundLight from '@/assets/fundLight.png';
import fundDark from '@/assets/fundDark.png';
import loanDark from '@/assets/loanDark.png';
import loanLight from '@/assets/loanLight.png';
import calendarDark from '@/assets/calendarDark.png';
import calendarLight from '@/assets/calendarLight.png';
import background from '@/assets/customersBack.jpg';

export default function Customers() {
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomerTicker, setSelectedCustomerTicker] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState(null);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [selectedRemoveCustomer, setSelectedRemoveCustomer] = useState(null);

    const theme = useSelector(getTheme);

    const getCustomersHandler = () => {
        getCustomers()
            .then((res) => {
                setCustomers(res?.data);
                setFilteredCustomers(res?.data);
            })
            .catch((error) => {
                toast(error.message);
            });
    };
    useEffect(() => {
        getCustomersHandler();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = customers.filter((customer) =>
                customer.full_name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCustomers(filtered);
        } else {
            setFilteredCustomers(customers); // Reset when search is empty
        }
    }, [search, customers]);

    const customerClickHandler = (customer) => {
        const customerInfo = {
            id: customer.national_id,
            ticker: customer.ticker,
        };
        getCustomer(customerInfo)
            .then((res) => {
                setSelectedCustomer(res.data);
                setSelectedCustomerTicker(customer.ticker);
                setInfoModalVisible(true);
            })
            .catch((error) => {
                toast(error.message);
            });
    };

    const exportData = () => {
        if (customers) {
            exportCustomersData()
                .then((res) => {
                    const contentDisposition =
                        res.headers['content-disposition'];
                    const filename = contentDisposition
                        ? contentDisposition.split('filename=')[1].split(';')[0]
                        : 'customers.csv';

                    const blob = new Blob([res.data], { type: 'text/csv' });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    toast('با موفقیت ذخیره شد.');
                })
                .catch((error) => {
                    toast(error.message);
                });
        }
    };

    const removeCustomer = (event, customer) => {
        event.stopPropagation();
        const removeCustomer = {
            id: customer?.national_id,
            ticker: customer?.ticker,
            name: customer?.full_name,
        };
        setSelectedRemoveCustomer(removeCustomer);
        setRemoveModalVisible(true);
    };

    const confirmRemove = () => {
        removeCustomerApi(selectedRemoveCustomer)
            .then((res) => {
                setRemoveModalVisible(false);
                getCustomersHandler();
            })
            .catch((error) => {
                toast(error.message);
            });
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

    return (
        <div className="relative p-5 pt-12">
            <S.Background $url={background} />

            <h1 className="text-right mb-10 px-10 relative text-4xl">
                سرمایه‌گذاران همراه
            </h1>
            <S.Header>
                <S.HeaderButtons>
                    <AddCustomer />
                    <S.DownloadButton onClick={exportData}>
                        دانلود گزارش
                    </S.DownloadButton>
                </S.HeaderButtons>
                <S.FloatLabelSection>
                    <S.FloatLabelInput
                        id="search"
                        className="text-right"
                        value={search}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                    />
                    <label
                        htmlFor="search"
                        className="text-right right-0 bg-inherit"
                    >
                        جستجو
                    </label>
                </S.FloatLabelSection>
            </S.Header>

            <div className="card">
                <S.DataHeader>
                    <Button
                        className={`rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        text
                        onClick={() => setLayout('grid')}
                    >
                        <S.HeaderIcon path={mdiViewGrid} size={1} />
                    </Button>
                    <Button
                        className={`rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        text
                        onClick={() => setLayout('list')}
                    >
                        <S.HeaderIcon path={mdiFormatListBulleted} size={1} />
                    </Button>
                </S.DataHeader>

                {layout === 'grid' ? (
                    <S.GridContainer>
                        {filteredCustomers?.map((customer) => (
                            <S.GridItem
                                key={customer.national_id}
                                onClick={() => customerClickHandler(customer)}
                            >
                                <S.Clear
                                    className={'trash'}
                                    position={'absolute'}
                                    top={'15px'}
                                    right={'15px'}
                                    onClick={(event) =>
                                        removeCustomer(event, customer)
                                    }
                                >
                                    <S.ClearIcon path={mdiTrashCan} size={1} />
                                </S.Clear>
                                <S.ItemImage
                                    size="xlarge"
                                    shape={'circle'}
                                    image={customer.image || defaultAvatar}
                                />
                                <S.ItemName>{customer.full_name}</S.ItemName>
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? fundLight
                                                    : fundDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.ticker}
                                </S.ItemAttribute>
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? calendarLight
                                                    : calendarDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.count_days} روز
                                </S.ItemAttribute>
                                <S.Splitter />
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? loanLight
                                                    : loanDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.total_wage?.toFixed(1)} میلیون
                                    ریال
                                </S.ItemAttribute>
                            </S.GridItem>
                        ))}
                    </S.GridContainer>
                ) : (
                    <S.ListContainer>
                        {filteredCustomers?.map((customer) => (
                            <S.ListItem
                                key={customer.national_id}
                                onClick={() => customerClickHandler(customer)}
                            >
                                <S.ItemImage
                                    size="xlarge"
                                    width={'45px'}
                                    shape={'circle'}
                                    image={customer.image || defaultAvatar}
                                />
                                <S.ItemAttribute justify={'start'}>
                                    <S.ItemTitle>نام:</S.ItemTitle>
                                    {customer.full_name}
                                </S.ItemAttribute>
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? fundLight
                                                    : fundDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.ticker}
                                </S.ItemAttribute>
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? calendarLight
                                                    : calendarDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.count_days} روز
                                </S.ItemAttribute>
                                <S.ItemAttribute>
                                    <S.ItemTitle className="items-center flex">
                                        <img
                                            src={
                                                theme === 'dark'
                                                    ? loanLight
                                                    : loanDark
                                            }
                                            className="w-5"
                                        />
                                    </S.ItemTitle>
                                    {customer.total_wage?.toFixed(1)} میلیون
                                    ریال
                                </S.ItemAttribute>
                                <S.ItemAttribute>
                                    <S.Clear
                                        className={'trash'}
                                        onClick={(event) =>
                                            removeCustomer(event, customer)
                                        }
                                    >
                                        <S.ClearIcon
                                            path={mdiTrashCan}
                                            size={1}
                                        />
                                    </S.Clear>
                                </S.ItemAttribute>
                            </S.ListItem>
                        ))}
                    </S.ListContainer>
                )}

                {/* Remove Customer Modal */}
                <S.RemoveModal
                    header={'حذف مشتری'}
                    footer={footerContent}
                    visible={removeModalVisible}
                    onHide={() => setRemoveModalVisible(false)}
                    style={{ width: '40vw', minWidth: '300px' }}
                >
                    <S.RemoveMessage>
                        آیا از حذف مشتری "{selectedRemoveCustomer?.name}" مطمئن
                        هستید؟
                    </S.RemoveMessage>
                </S.RemoveModal>

                {/* Info Modal */}
                <InfoModal
                    visible={infoModalVisible}
                    setVisibleProp={setInfoModalVisible}
                    customer={selectedCustomer}
                    customerTicker={selectedCustomerTicker}
                />
            </div>
        </div>
    );
}
