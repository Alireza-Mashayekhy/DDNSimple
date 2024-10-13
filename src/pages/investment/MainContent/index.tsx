import React, { useEffect, useState, useCallback } from 'react';
import { DatePicker } from 'zaman';
import { PrimeReactProvider } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import LineChart from '@/components/chart';
import { ProgressSpinner } from 'primereact/progressspinner';
import UserTable from '@/components/DataTable';
// import api from "@/services/api";
import moment from 'moment-jalaali';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import * as S from './Styles';
import {
    exportShareholder,
    getExportSummery,
    getShareholderDetail,
    getShareholders,
    getSummery,
} from '@/api/investment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { getInvestment } from '@/selectors/state';
import { setSummery, setTree } from '@/redux/store/investmentData';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/types';

interface FundSummary {
    id: number;
    name: string;
    num_funds: number;
    total_share_count: number;
    total_value: number;
}

interface FundApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: FundSummary[];
}

interface TreeNode {
    key: string;
    data: any;
    children?: TreeNode[];
}
interface ShareHolderHistory {
    fund_id: string;
    fund: string;
    share_count: number;
    pct_of_shares: number;
    date: string;
}

interface Shareholder {
    id: number;
    name: string;
    share_holder_histories: ShareHolderHistory[];
}

interface ShareApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Shareholder[];
}

interface ShareholderDetails {
    investor_name: string;
    share_holder_histories: ShareHolderHistory[];
    chart_data: ChartData[];
}
interface ChartData {
    dates: string[];
    share_counts: number[];
}
const Investment = () => {
    const convertToPersianDate = (gregorianDate: string): string => {
        if (!gregorianDate) return '';
        const persianDate = moment(gregorianDate).format('jYYYY-jMM-jDD');
        return persianDate;
    };

    const getDefaultDate = () => {
        const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
        return convertToPersianDate(yesterday);
    };
    const treeDataSelector = useSelector(getInvestment)?.tree;
    const summeryDataSelector = useSelector(getInvestment)?.tree;

    const [treeData, setTreeData] = useState<TreeNode[]>(treeDataSelector);
    const [selectedDate, setSelectedDate] = useState<string>(getDefaultDate());
    const [expandedKeys, setExpandedKeys] = useState<{
        [key: string]: boolean;
    }>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedShareholder, setSelectedShareholder] =
        useState<ShareholderDetails | null>(null);
    const [selectedInvestorName, setSelectedInvestorName] =
        useState<string>('');
    const [summaryData, setSummaryData] =
        useState<FundSummary[]>(summeryDataSelector);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; borderColor: string }[];
    }>({ labels: [], datasets: [] });
    const [autoCompleteValues, setAutoCompleteValues] = useState({
        lastName: '',
    });
    const [suggestions, setSuggestions] = useState<any>({ lastName: [] });
    const [summaryDetailId, setSummaryDetailId] = useState<any>(null);
    const [summaryFundName, setSummaryFundName] = useState<any>(null);
    const [shareholderData, setShareholderData] = useState<any>(null);
    const [sortedTreeData, setSortedTreeData] = useState<TreeNode[]>([]);
    const [sortField, setSortField] = useState<any>(null);
    const [sortOrder, setSortOrder] = useState<any>(null);
    const [paginatedShareholderHistory, setPaginatedShareholderHistory] =
        useState<ShareHolderHistory[]>([]);
    const [currentPage, setCurrentPage] = useState<any>(null);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 1,
    });
    const [lazyParamsInvest, setLazyParamsInvest] = useState({
        first: 0,
        rows: 10,
        page: 1,
    });

    const dispatch = useDispatch<AppDispatch>();

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

    const suggestLastName = (event: any) => {
        const query = event.query.toLowerCase();
        const filteredSuggestions = shareholderData
            .map((item: any) => item.name)
            .filter((name: any) => name.toLowerCase().includes(query));
        setSuggestions({ ...suggestions, lastName: filteredSuggestions });
    };

    function numberFormatter(number: number) {
        const isNegative = number < 0;
        const absNumberStr = Math.abs(number).toString();
        const formattedNumber = absNumberStr.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
        );
        return isNegative ? `${formattedNumber}` : formattedNumber;
    }
    useEffect(() => {
        if (!treeData?.length || !summaryData?.length) {
            loadData();
        } else if (!shareholderData?.length) {
            getShareholdersData();
        }
    }, []);

    const getShareholdersData = async () => {
        const shareholderParams = {
            date: selectedDate,
        };
        try {
            const shareholderResponse =
                await getShareholders(shareholderParams);
            const shareholderData = shareholderResponse as Shareholder[];
            setShareholderData(shareholderData);
        } catch (error) {}
    };

    const loadData = async () => {
        setLoading(true);
        const summaryParams = {
            share_holder_histories__date: selectedDate,
            search: autoCompleteValues.lastName.toLowerCase(),
        };
        const shareholderParams = {
            date: selectedDate,
        };
        try {
            const summaryResponse = await getSummery(summaryParams);
            let summaryData = summaryResponse as FundSummary[];
            const shareholderResponse =
                await getShareholders(shareholderParams);

            const shareholderData = shareholderResponse as Shareholder[];
            setShareholderData(shareholderData);
            setSummaryData(summaryData);
            console.log(summaryData);
            dispatch(setSummery(summaryData));

            const totalCount = summaryResponse;
            setTotalRecords(totalCount);
            const treeNodes: TreeNode[] = summaryData.map((summary) => ({
                key: `summary-${summary.id}`,
                data: {
                    ...summary,
                    type: 'summary',
                },
                children:
                    shareholderData
                        .find((shareholder) => shareholder.id === summary.id)
                        ?.share_holder_histories.map((history) => ({
                            key: `history-${summary.id}-${history.fund_id}`,
                            data: {
                                ...history,
                                type: 'history',
                            },
                        })) || [],
            }));
            setTreeData(treeNodes);
            dispatch(setTree(treeNodes));
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('خطا در برقراری ارتباط');
        } finally {
            setLoading(false);
        }
    };

    const onPageInvest = (event: any) => {
        setLazyParamsInvest(event);
    };

    const sortData = useCallback<any>(
        (data: TreeNode[], field: string, order: 1 | -1) => {
            const sortedData = [...data].sort((a, b) => {
                if (a.data[field] < b.data[field]) return -1 * order;
                if (a.data[field] > b.data[field]) return 1 * order;
                return 0;
            });

            return sortedData.map((node) => ({
                ...node,
                children: node.children
                    ? sortData(node.children, field, order)
                    : undefined,
            }));
        },
        []
    );

    useEffect(() => {
        if (sortField && sortOrder) {
            const sorted = sortData(treeData, sortField, sortOrder);
            setSortedTreeData(sorted);
        } else {
            setSortedTreeData(treeData);
        }
    }, [treeData, sortField, sortOrder, sortData]);

    const handleMainPageDownload = async () => {
        const summaryParams = {
            share_holder_histories__date: selectedDate,
            search: autoCompleteValues.lastName.toLowerCase(),
        };
        try {
            const response = await getExportSummery(summaryParams);
            const url = window.URL.createObjectURL(
                new Blob([response], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fund_summary_report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('خطا در دریافت فایل . لطفا دوباره تلاش کنید');
        }
    };

    const handleModalDownload = async () => {
        if (!selectedShareholder) return;

        try {
            const response = await exportShareholder(
                summaryDetailId,
                summaryFundName
            );
            const url = window.URL.createObjectURL(
                new Blob([response], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'shareholder_report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('خطا در دریافت فایل. لطفا دوباره تلاش کنید');
        }
    };

    const actionTemplate = (node: TreeNode) => {
        if (node.data.type === 'history') {
            return (
                <Button
                    icon="pi pi-align-right"
                    className={`p-button-sm rounded-lg  ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick({ node });
                    }}
                    loading={loading}
                    text
                />
            );
        }
        return null;
    };

    const findNodeByKey = (nodes: TreeNode[], key: string): TreeNode | null => {
        for (let node of nodes) {
            if (node.key === key) return node;
            if (node.children) {
                const found = findNodeByKey(node.children, key);
                if (found) return found;
            }
        }
        return null;
    };

    const updateTreeData = (
        data: TreeNode[],
        key: string,
        children: TreeNode[]
    ): TreeNode[] => {
        return data.map((node) => {
            if (node.key === key) {
                return { ...node, children };
            }
            if (node.children) {
                return {
                    ...node,
                    children: updateTreeData(node.children, key, children),
                };
            }
            return node;
        });
    };

    const handleDateChange = (value: any) => {
        setSelectedDate(convertToPersianDate(value.value));
    };

    const handleSearch = () => {
        loadData();
    };

    const handleRowClick = async (event: any) => {
        const node = event.node;
        if (node.data.type === 'history') {
            const [, fundId] = node.key.split('-');
            console.log(summaryData);
            const summary = summaryData.find((s) => s.id.toString() === fundId);
            setSummaryDetailId(summary?.id);
            setSummaryFundName(node.data.fund);
            const investorName = summary ? summary.name : 'Unknown Investor';

            try {
                const response = await getShareholderDetail(
                    summary?.id,
                    node.data.fund
                );
                const data: ShareholderDetails = {
                    ...response,
                    investor_name: investorName,
                };
                setSelectedShareholder(data);
                setSelectedInvestorName(investorName);

                const chartData = {
                    labels: data.chart_data[0].dates,
                    datasets: [
                        {
                            label: 'میزان سرمایه‌گذار',
                            data: data.chart_data[0].share_counts,
                            borderColor: getRandomColor(),
                        },
                    ],
                };
                setChartData(chartData);
                updatePaginatedShareholderHistory(data.share_holder_histories);

                setDisplayModal(true);
            } catch (error) {
                console.error('Error fetching shareholder details:', error);
                toast.error('خطا در برقراری ارتباط');
            }
        }
    };

    const updatePaginatedShareholderHistory = useCallback(
        (data: ShareHolderHistory[]) => {
            const { first, rows } = lazyParamsInvest;
            const last = first + rows;
            setPaginatedShareholderHistory(data.slice(first, last));
        },
        [lazyParamsInvest]
    );

    useEffect(() => {
        if (selectedShareholder) {
            updatePaginatedShareholderHistory(
                selectedShareholder.share_holder_histories
            );
        }
    }, [
        selectedShareholder,
        lazyParamsInvest,
        updatePaginatedShareholderHistory,
    ]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const columns = [
        {
            field: 'name',
            header: 'سرمایه‌گذاری',
            width: '400px',
            expander: true,
        },
        { field: 'num_funds', header: 'تعداد صندوق', width: '200px' },
        {
            field: 'total_value',
            header: 'ارزش کل  (میلیارد ریال)',
            width: '200px',
        },
        { field: 'fund', header: 'صندوق', width: '200px' },
        { field: 'share_count', header: 'تعداد سهام', width: '200px' },
        { field: 'value', header: 'ارزش سرمایه‌گذاری', width: '200px' },
        { field: 'pct_of_shares', header: 'درصد سهام', width: '200px' },
        {
            field: 'action',
            header: '',
            body: actionTemplate,
            width: '200px',
        },
    ];
    const dialogContent = () => {
        if (!selectedShareholder) return null;

        return (
            <>
                <div className="flex flex-col items-center gap-2 mb-5">
                    <p>
                        <span>صندوق : </span>
                        <span className="font-bold">
                            {
                                selectedShareholder.share_holder_histories[0]
                                    ?.fund
                            }
                        </span>
                    </p>
                    <p>
                        <span>سرمایه‌گذار: </span>
                        <span className="font-bold">
                            {selectedInvestorName}
                        </span>
                    </p>
                </div>
                <div className="flex justify-end items-center mb-5">
                    <Button
                        className={` rounded-lg w-32 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                        outlined
                        label="دانلود"
                        icon="pi pi-download ml-2"
                        onClick={handleModalDownload}
                    />
                </div>
                {/* <h3 className="font-bold">جدول سرمایه‌گذاری</h3> */}
                <UserTable
                    data={paginatedShareholderHistory}
                    columnFields={[
                        { field: 'date', header: 'تاریخ' },
                        { field: 'share_count', header: 'تعداد سهام' },
                        { field: 'value', header: 'ارزش (میلیارد ریال)' },
                        { field: 'pct_of_shares', header: 'درصد سهام' },
                    ]}
                    totalRecords={
                        selectedShareholder.share_holder_histories.length
                    }
                    lazyParams={lazyParamsInvest}
                    onPage={onPageInvest}
                    pagination={true}
                />
                {/* <h3 className="font-bold mt-4">نمودار سرمایه‌گذاری</h3> */}
                <div className="flex justify-center mt-10">
                    <LineChart
                        datasets={chartData.datasets}
                        labels={chartData.labels}
                    />
                </div>
            </>
        );
    };

    const getVisibleColumns = (nodeType: string) => {
        switch (nodeType) {
            case 'summary':
                return ['name', 'num_funds', 'total_value'];
            case 'history':
                return [
                    'fund',
                    'share_count',
                    'pct_of_shares',
                    'value',
                    'date',
                    'action',
                ];
            default:
                return [
                    'name',
                    'num_funds',
                    'total_share_count',
                    'fund',
                    'share_count',
                    'pct_of_shares',
                    'date',
                    'action',
                ];
        }
    };

    return (
        <PrimeReactProvider>
            <>
                {/* <div className="flex justify-end my-4 px-5 gap-4">
          <a
            href="../"
            className=" py-2 px-4 bg-blue-600 text-white rounded-[8px]"
          >
            صفحه DDN
          </a>
        </div> */}
                <div className="px-5">
                    <S.DialogStyle
                        // header="جزییات سهامدار"
                        headerStyle={headerStyle}
                        dismissableMask
                        contentStyle={contentStyle}
                        visible={displayModal}
                        style={{ width: '80vw', maxWidth: '800px' }}
                        onHide={() => setDisplayModal(false)}
                    >
                        {dialogContent()}
                    </S.DialogStyle>
                    <div className="flex flex-col gap-5 items-center py-5 justify-center">
                        <div className="data-filter-inputs items-center">
                            <S.Input
                                value={autoCompleteValues.lastName || ''}
                                suggestions={suggestions.lastName}
                                completeMethod={suggestLastName}
                                onChange={(e) => {
                                    setAutoCompleteValues({
                                        lastName: e.value || '',
                                    });
                                }}
                                placeholder="نام سرمایه‌گذار"
                                minLength={3}
                            />
                            <label htmlFor="" className=" mr-4 ml-2">
                                تاریخ
                            </label>

                            <DatePicker
                                round="x4"
                                position="center"
                                className="z-10"
                                onChange={(e) => handleDateChange(e)}
                                inputClass={
                                    theme === 'dark'
                                        ? 'bg-[#000000] !text-[#ffffff] !mx-0 h-[35px] w-[190px] text-sm'
                                        : 'bg-[#FFFFFF] !text-[#000000] !mx-0 h-[35px] w-[190px] text-sm'
                                }
                            />
                        </div>
                        <div className="flex gap-5">
                            <Button
                                label="جستجو"
                                icon="pi pi-search ml-2 text-sm"
                                onClick={handleSearch}
                                className={` rounded-lg w-28 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                outlined
                            />
                            <Button
                                label="دانلود"
                                icon="pi pi-download ml-2 text-sm"
                                onClick={handleMainPageDownload}
                                className={` rounded-lg w-28 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                outlined
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div
                            className="spinner-container"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '200px',
                            }}
                        >
                            <ProgressSpinner
                                style={{ width: '50px', height: '50px' }}
                                strokeWidth="8"
                                fill="transparent"
                                animationDuration=".5s"
                            />
                        </div>
                    ) : error ? (
                        <div
                            className="error-message"
                            style={{ textAlign: 'center', color: 'red' }}
                        >
                            {error}
                        </div>
                    ) : (
                        <S.TreeTableStyle
                            value={treeData}
                            expandedKeys={expandedKeys}
                            onToggle={(e) => setExpandedKeys(e.value)}
                            tableStyle={{ minWidth: '50rem' }}
                            loading={loading}
                            className="rtl-treetable"
                            paginator
                            rows={25}
                            rowsPerPageOptions={[5, 10, 25]}
                            columnResizeMode="fit"
                            sortField={sortField}
                            sortOrder={sortOrder}
                            onSort={(e) => {
                                setSortField(e.sortField);
                                setSortOrder(e.sortOrder);
                                // loadData();
                            }}
                        >
                            {columns.map((col) => (
                                <Column
                                    key={col.field}
                                    field={col.field}
                                    header={col.header}
                                    expander={col.field === 'name'}
                                    sortable={
                                        col.field === 'total_value' ||
                                        col.field === 'num_funds'
                                    }
                                    style={{
                                        width: col.width,
                                        textAlign:
                                            col.field === 'name'
                                                ? 'right'
                                                : 'center',
                                    }}
                                    body={(node) => {
                                        const visibleColumns =
                                            getVisibleColumns(node.data.type);
                                        if (
                                            visibleColumns.includes(col.field)
                                        ) {
                                            if (col.body) {
                                                return col.body(node);
                                            }
                                            return col.field === 'name' ||
                                                col.field === 'fund'
                                                ? node.data[col.field]
                                                : col.field === 'total_value' ||
                                                    col.field === 'value'
                                                  ? numberFormatter(
                                                        Math.trunc(
                                                            node.data[
                                                                col.field
                                                            ] / 1000000000
                                                        )
                                                    )
                                                  : numberFormatter(
                                                        node.data[col.field]
                                                    );
                                        }
                                        return null;
                                    }}
                                />
                            ))}
                        </S.TreeTableStyle>
                    )}
                </div>
            </>
        </PrimeReactProvider>
    );
};

export default Investment;
