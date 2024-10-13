'use client';
import { FC } from 'react';
import * as S from '@/styles/Styles';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';

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

interface UserTableProps {
    data: DdnHistory[];
    onFileUpload?: (file: File, ticker: string, date: string) => void;
    onDetailsClick?: (nationalId: string) => void;
    onEditClick?: (nationalId: string) => void;
    onChangeStatusClick?: (nationalId: string) => void;
    onDownloadClick?: (nationalId: string) => void;
    onDeleteClick?: (nationalId: string) => void;
    uploadProgress?: { [key: string]: number };
    upload?: boolean;
    pagination?: boolean;
    showRows?: boolean;
    selectedRows?: number;
    rowsOption?: number[];
}

const DataTable: FC<UserTableProps | any> = ({
    data,
    columnFields,
    onDetailsClick,
    onEditClick,
    onDownloadClick,
    onChangeStatusClick,
    upload,
    pagination,
    showRows,
    selectedRows,
    rowsOption,
    onDeleteClick,
}: any) => {
    const theme = useSelector(getTheme);

    function numberFormatter(number: number) {
        const isNegative = number < 0;
        const absNumberStr = Math.abs(number).toString();
        const formattedNumber = absNumberStr.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
        );
        return isNegative ? `(${formattedNumber})` : formattedNumber;
    }

    const rowNumberTemplate = (rowData, options) => {
        return options.rowIndex + 1;
    };

    const statusBodyTemplate = (
        rowData: any,
        col: { field: string; header: string; width: string }
    ) => {
        if ((upload && col.field !== 'date') || col.field === 'is_active') {
            const hasData = rowData[col.field] === true;
            if (hasData) {
                return (
                    <i
                        className="pi pi-check"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#000000',
                            fontSize: '22px',
                        }}
                    ></i>
                );
            } else {
                return (
                    <i
                        className="pi pi-times"
                        style={{ color: '#b61616', fontSize: '22px' }}
                    ></i>
                );
            }
        }
        return rowData[col.field];
    };

    const bodyTemplate = (rowData: any, field: string) => {
        if (field === 'gender') {
            return rowData[field] === 'W' ? 'زن' : 'مرد';
        }
        if (field === 'inv_type') {
            return rowData[field] === 'I' ? 'حقیقی' : 'حقوقی';
        }
        if (field === 'value') {
            return Math.trunc(rowData[field] / 1000000000);
        }
        if (field === 'details' && typeof onDetailsClick === 'function') {
            return (
                <Button
                    // label="جزییات"
                    icon="pi pi-align-right"
                    className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    onClick={() => onDetailsClick(rowData)}
                    text
                    // outlined
                />
            );
        }
        if (field === 'edit' && typeof onEditClick === 'function') {
            return (
                <Button
                    // label="ویرایش"
                    icon="pi pi-pencil"
                    className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    onClick={() => onEditClick(rowData)}
                    text
                    // outlined
                />
            );
        }
        if (field === 'download' && typeof onDownloadClick === 'function') {
            return (
                <Button
                    icon="pi pi-download"
                    className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    onClick={() => onDownloadClick(rowData)}
                    text
                />
            );
        }
        onDeleteClick;
        if (field === 'delete' && typeof onDeleteClick === 'function') {
            return (
                <Button
                    icon="pi pi-trash"
                    className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-red-600' : 'text-red-600'}`}
                    onClick={() => onDeleteClick(rowData)}
                    text
                />
            );
        }
        if (
            field === 'change_status' &&
            typeof onChangeStatusClick === 'function'
        ) {
            return (
                <Button
                    // label="ویرایش"
                    icon="pi pi-sliders-v"
                    className={` rounded-lg px-5 aspect-square ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    onClick={() => onChangeStatusClick(rowData)}
                    text
                    // outlined
                />
            );
        }
        // Apply numberFormatter to specific fields
        if (
            [
                'total_count',
                'previous_quantity',
                'present_quantity',
                'quantity',
                'share_count',
                'price',
                'freezed_count',
                'unfreezed_count',
            ].includes(field)
        ) {
            return numberFormatter(rowData[field]);
        }
        return rowData[field];
    };

    return (
        <S.TableContainer>
            <S.StyledDataTable
                value={data}
                tableStyle={{
                    minWidth: '100%',
                }}
                paginator={pagination}
                rows={selectedRows || 25}
                rowsPerPageOptions={rowsOption || [5, 10, 25, 50]}
                scrollable
                scrollHeight="400px"
            >
                {showRows && (
                    <Column
                        header="ردیف"
                        body={rowNumberTemplate}
                        style={{ width: '5%' }}
                    />
                )}
                {columnFields.map((col: any, index: any) => (
                    <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        sortable={
                            col.field === 'lastAssets' ||
                            col.field === 'presentAssets' ||
                            col.field === 'changeAssets' ||
                            col.field === 'price'
                        }
                        style={{
                            width: `${col.width}`,
                            textAlign: col.align || 'center',
                        }}
                        body={
                            (col.field !== 'ticker' && upload) ||
                            col.field === 'is_active'
                                ? (rowData) => statusBodyTemplate(rowData, col)
                                : (rowData) => bodyTemplate(rowData, col.field)
                        }
                    />
                ))}
            </S.StyledDataTable>
        </S.TableContainer>
    );
};

export default DataTable;
