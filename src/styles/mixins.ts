import { css } from 'styled-components';

import colors from '@/styles/colors';
import fonts from '@/styles/fonts';

// export const inputStyle = css`
//     background: ${colors.whiteHover};
//     border-radius: 3px;
//     font-family: ${fonts.family.default};
//     height: 40px;
//     padding: 10px 14px;

//     &::-webkit-inner-spin-button,
//     &::-webkit-outer-spin-button {
//         -webkit-appearance: none;
//         margin: 0;
//     }
// `;

export const muiButtonStyle = css`
    && {
        border: 1px solid ${({ theme }) => theme.border};
        background-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.textColor};
        font-size: ${fonts.size.m};
        font-weight: ${fonts.weight.semiBold};
        font-family: ${fonts.family.default};
    }
    &&.Mui-disabled {
        color: #888; // Your desired color for the text when the button is disabled
    }

    &:hover {
        color: ${({ theme }) => theme.hoverText};
    }
`;

export const hiddenScroll = css`
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
    /* For Firefox */
    .hidden-scroll {
        scrollbar-width: none; /* Firefox */
    }

    /* For WebKit-based browsers */
    .hidden-scroll::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;
export const narrowScroll = css`
    &::-webkit-scrollbar {
        height: 5px; /* Controls the height of the scrollbar */
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) =>
            theme.secondary || '#f0f0f0'}; /* Default track color */
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) =>
            theme.scrollbarThumb || '#888'}; /* Default thumb color */
        border-radius: 5px; /* Optional: adds rounded corners to the scrollbar thumb */
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) =>
            theme.scrollbarThumbHover || '#555'}; /* Color on hover */
    }
`;

export const primeReactDataTableStyle = css`
    /* table header style */
    .p-datatable-thead > tr > th {
        background-color: ${({ theme }) => theme.hover} !important;
        color: ${({ theme }) => theme.textColor} !important;
        padding: 10px;
        font-size: 16px !important;
        white-space: nowrap;
    }
    /* align table header in the center */
    .p-datatable-thead > tr > th > .p-column-header-content {
        justify-content: center !important;
    }
    /* table body style */
    .p-datatable-tbody > tr > td {
        border-bottom: 1px solid #dee2e6;
        color: ${({ theme }) => theme.textColor} !important;
        background-color: ${({ theme }) => theme.secondary} !important;
        font-size: 16px !important;
        font-weight: 600;
        white-space: nowrap;
        padding: 5px;
        // text-align: center !important;
    }
    .p-icon {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-datatable-tbody > tr.p-row-odd > td {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }
    /* scroll style */
    .p-datatable-wrapper {
        ${narrowScroll};
    }
    /* scroll style for when the table has virtual scroll property */
    .p-virtualscroller.p-virtualscroller-inline {
        ${narrowScroll};
    }

    /* align table body cell in the center */
    .p-datatable-tbody > tr:not(.p-rowgroup-header) > td {
        text-align: center;
    }

    .p-datatable-tbody .p-row-odd {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }

    .p-datatable-tbody > tr:nth-child(odd) {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }
    /* style for grouped row */
    .p-datatable-tbody .p-rowgroup-header > td {
        background-color: ${({ theme }) => theme.primary} !important;
        padding: 10px;
    }

    /* to align > with text in grouped row */
    .p-datatable-tbody .p-rowgroup-header > td > span {
        display: inline-flex;
        margin-right: 0.5rem;
        color: ${({ theme }) => theme.textColor} !important;
    }
    /* style for expander icon */
    .p-datatable-tbody .p-rowgroup-header > td > button {
        color: ${({ theme }) => theme.textColor} !important;
        transform: rotate(180deg);
    }
    .p-paginator {
        background-color: ${({ theme }) => theme.primary} !important;
    }
    .p-paginator-element {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-dropdown {
        background-color: ${({ theme }) => theme.secondary} !important;
        .p-dropdown-label {
            color: ${({ theme }) => theme.textColor} !important;
        }
        .p-dropdown-trigger {
            color: ${({ theme }) => theme.textColor} !important;
        }
    }
`;

export const primeReactTreeTableStyle = css`
    /* table header style */
    .p-treetable-thead > tr > th {
        background-color: ${({ theme }) => theme.hover} !important;
        color: ${({ theme }) => theme.textColor} !important;
        padding: 10px;
        font-size: 16px !important;
        white-space: nowrap;
    }
    /* align table header in the center */
    .p-treetable-thead > tr > th > .p-column-header-content {
        justify-content: center !important;
    }
    /* table body style */
    .p-icon {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-treetable-tbody > tr > td {
        border-bottom: 1px solid #dee2e6;
        color: ${({ theme }) => theme.textColor} !important;
        background-color: ${({ theme }) => theme.secondary} !important;
        font-size: 16px !important;
        font-weight: 400;
        white-space: nowrap;
        padding: 5px;
    }

    .p-treetable-tbody > tr.p-row-odd > td {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }
    /* scroll style */
    .p-treetable-wrapper {
        ${narrowScroll};
    }
    /* scroll style for when the table has virtual scroll property */
    .p-virtualscroller.p-virtualscroller-inline {
        ${narrowScroll};
    }

    /* align table body cell in the center */
    .p-treetable-tbody > tr:not(.p-rowgroup-header) > td {
        text-align: center;
    }

    .p-treetable-tbody .p-row-odd {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }

    .p-treetable-tbody > tr:nth-child(odd) {
        background-color: ${({ theme }) => theme.strippedRow} !important;
    }
    /* style for grouped row */
    .p-treetable-tbody .p-rowgroup-header > td {
        background-color: ${({ theme }) => theme.primary} !important;
        padding: 10px;
    }

    /* to align > with text in grouped row */
    .p-treetable-tbody .p-rowgroup-header > td > span {
        display: inline-flex;
        margin-right: 0.5rem;
        color: ${({ theme }) => theme.textColor} !important;
    }
    /* style for expander icon */
    .p-treetable-tbody .p-rowgroup-header > td > button {
        color: ${({ theme }) => theme.textColor} !important;
        transform: rotate(180deg);
    }
    .p-paginator {
        background-color: ${({ theme }) => theme.primary} !important;
    }
    .p-paginator-element {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-dropdown {
        background-color: ${({ theme }) => theme.secondary} !important;
        .p-dropdown-label {
            color: ${({ theme }) => theme.textColor} !important;
        }
        .p-dropdown-trigger {
            color: ${({ theme }) => theme.textColor} !important;
        }
    }
`;

export const primeReactTREETableStyle = css`
  /* hidden scroll */
  /* .p-treetable-scrollable-body {
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  } */

  /* these are styles for full width */
  .p-treetable-scrollable-body-table,
  .p-treetable-scrollable-header-table {
    width: 100%;
  }
  /* these are styles for full width */

  /*these are styles for filter column if used */
  .p-filter-column .p-column-filter.p-inputtext.p-component {
    padding: 5px;
    border-radius: 5px;
    font-size:16px !important;
  }
  .p-filter-column .p-inputtext {
    width: 100% !important;
  }
  /*these are styles for filter column if used */



  .p-treetable-scrollable-body {
    ${narrowScroll};
  }
  /* header background color */
  .p-treetable-table {
    border-collapse: unset;
    border-spacing: unset;
  }

  /* header background color */
  .p-treetable-table .p-treetable-thead {
    background-color: ${({ theme }) => theme.hover} !important;
  }
  /* header background color in scrollable mode*/
  .p-treetable-scrollable-header .p-treetable-thead {
    background-color: ${({ theme }) => theme.hover} !important;
  }
  /* header style */
  .p-treetable-table .p-treetable-thead > tr > th {
    color: ${({ theme }) => theme.textColor} !important;
    font-size: 16px} !important;
    font-weight: 600;
    white-space: nowrap;
    padding: 10px 5px;
  }
  .p-treetable-table .p-treetable-thead > tr {
    color: ${({ theme }) => theme.textColor} !important;
    font-size: 24px !important;
    font-weight: 600;
    white-space: nowrap;
    padding: 10px 5px;
  }
  /* header style in scrollable mode*/
  .p-treetable-scrollable-header .p-treetable-thead > tr > th {
    color: ${({ theme }) => theme.textColor} !important;
    font-size: 16px !important;
    font-weight: 600;
    white-space: nowrap;
    padding: 10px 5px;
    text-align: center;
  }
  /*these are styles for changing scroll from left to right*/
  .p-treetable-wrapper {
    direction: ltr;
  }

  .p-treetable-scrollable-body-table,
  .p-treetable-scrollable-header {
    direction: rtl;
  }
  /*these are styles for changing scroll from left to right*/

  
  /* to remove the space between each field in the header in scrollable mode */
  .p-treetable-scrollable-header-table {
    border-collapse: unset;
    border-spacing: unset;
  }
  /* to remove the space between each field in a row in scrollable mode*/
  .p-treetable-scrollable-body-table {
    border-collapse: unset;
    border-spacing: unset;
  }
  /* body style */
  .p-treetable-tbody > tr > td {
    color: ${({ theme }) => theme.textColor} !important;
    font-size: 16px !important;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    padding: 10px 5px;
  }
  .p-treetable-tbody > tr > td:nth-child(1) {
    text-align: right;
  }

  .p-treetable-tbody > tr:nth-child(odd) {
    /* Lighter shade for odd rows */
    background-color: ${({ theme }) => theme.secondary} !important;
  }
  .p-treetable-tbody > tr:nth-child(even) {
    /* Darker shade for even rows */
    background-color: ${({ theme }) => theme.strippedRow} !important;
  }
  .p-treetable-tbody > tr:hover {
    /* background-color: ${({ theme }) => theme.secondary} !important; */
  }

  /* expander style */
  .p-treetable-toggler.p-link.p-unselectable-text {
    transform: rotate(180deg);
    color: ${({ theme }) => theme.textColor} !important;
    // width: 6px;
  }
  .p-treetable-scrollable-header .p-treetable-scrollable-header-box {
    margin-right: 0.5rem !important; /* Adjust the value to match your scrollbar width */
  }
  .p-treetable .p-treetable-emptymessage {
    text-align: right !important;
  }
  /* .p-treetable-table .p-treetable-thead > tr > th.day-column > div > span {
    margin-left: 15px;
  } */
`;

export const inputStyle = css`
    .p-inputtext {
        background-color: ${({ theme }) => theme.primary} !important;
        color: ${({ theme }) => theme.textColor} !important;
        margin: 0 !important;
        width: 190px;
        height: 35px;
        font-size: 0.875rem;
        &::placeholder {
            color: ${({ theme }) => theme.hoverText};
            opacity: 1;
        }
    }
`;

export const inputTextStyle = css`
    background-color: ${({ theme }) => theme.primary} !important;
    color: ${({ theme }) => theme.textColor} !important;
    margin: 0 !important;
    width: 190px;
    height: 35px;
    font-size: 0.875rem;
    &::placeholder {
        color: ${({ theme }) => theme.hoverText};
        opacity: 1;
    }
`;
