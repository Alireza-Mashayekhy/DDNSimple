import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import UIcon from '@mdi/react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';

interface ItemImageProps {
    width?: string;
}
interface ItemAttributeProps {
    justify?: string;
}

interface ClearProps {
    position?: string;
    top?: string;
    right?: string;
}

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const HeaderButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const SearchInput = styled(InputText)`
    background: transparent;
    border: 1px solid ${({ theme }) => theme.border};
    outline: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
`;

export const DownloadButton = styled(Button)`
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 8px 15px;
    background: transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: all 0.5s;
`;

export const DataHeader = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    gap: 5px;
`;

export const HeaderIcon = styled(UIcon)``;

export const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 15px;
    max-height: calc(100vh - 250px);
    overflow-y: auto;
    padding-left: 10px;
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.secondary};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.textColor};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.textColorSecondary};
    }
    scrollbar-color: ${({ theme }) => theme.primary}
        ${({ theme }) => theme.strippedRow};
    scrollbar-width: thin;
    @media screen and (max-width: 1500px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media screen and (max-width: 1350px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        max-height: calc(100vh - 280px);
    }
`;

export const ListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 15px;
    max-height: calc(100vh - 250px);
    overflow-y: auto;
    padding-left: 10px;
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.secondary};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.textColor};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.textColorSecondary};
    }
    scrollbar-color: ${({ theme }) => theme.primary}
        ${({ theme }) => theme.strippedRow};
    scrollbar-width: thin;
    @media screen and (max-width: 768px) {
        max-height: calc(100vh - 280px);
    }
`;

export const GridItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.primary};
    padding: 25px 20px 20px 20px;
    border-radius: 10px;
    gap: 5px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border};
    .trash {
        opacity: 0;
    }
    &:hover {
        .trash {
            opacity: 1;
        }
    }
`;

export const ListItem = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 0.5fr 2fr 1fr 1.5fr 1fr 0.5fr;
    background: ${({ theme }) => theme.primary};
    padding: 10px 15px 10px 0px;
    border-radius: 10px;
    gap: 5px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const ItemImage = styled(Avatar)<ItemImageProps>`
    width: ${({ width }) => width || '80px'};
    height: ${({ width }) => width || '80px'};
`;

export const ItemName = styled.span`
    margin: 15px 0 10px 0;
`;

export const ItemAttribute = styled.div<ItemAttributeProps>`
    display: flex;
    align-items: center;
    justify-content: ${({ justify }) => justify || 'center'};
    gap: 10px;
    flex-wrap: wrap;
`;

export const ItemTitle = styled.span`
    font-size: 14px;
`;

export const Splitter = styled.div`
    width: 100%;
    height: 1px;
    margin: 10px 0;
    opacity: 50%;
    background: ${({ theme }) => theme.border};
`;

export const Clear = styled.div<ClearProps>`
    // background: rgba(255, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: ${({ position }) => position || 'relative'};
    top: ${({ top }) => top || 'unset'};
    right: ${({ right }) => right || 'unset'};
    transition: all 0.5s;
    &:hover {
        background: ${({ theme }) => theme.secondary};
    }
`;

export const ClearIcon = styled(UIcon)`
    color: ${({ theme }) => theme.textColor};
`;

export const RemoveModal = styled(Dialog)`
    background: ${({ theme }) => theme.strippedRow};
    border-radius: 10px;

    .p-dialog-header {
        padding: 20px;
        button {
            color: ${({ theme }) => theme.textColor};
            outline: none;
            border: none;
        }
    }
    .p-dialog-content {
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
`;

export const FooterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
`;

export const FooterButton = styled(Button)`
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.textColor};
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: fit-content;
    height: fit-content;
`;

export const RemoveMessage = styled.span`
    color: ${({ theme }) => theme.textColor};
`;

export const FloatLabelInput = styled(InputText)`
    background-color: transparent !important;
    color: ${({ theme }) => theme.textColor} !important;
    margin: 0 !important;
    width: 190px;
    height: 35px;
    border-radius: 0px;
    outline: none !important;
    border: none !important;
    direction: ltr;
    border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    font-size: 0.875rem;
    &:focus {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    }
`;

export const FloatLabelSection = styled(FloatLabel)`
    &:focus {
        outline: none !important;
        border: none !important;
        border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    }
    label {
        color: ${({ theme }) => theme.textColor} !important;
    }
`;

export const Background = styled.div<{ $url: string }>`
    background:
        linear-gradient(
            to top,
            ${({ theme }) => theme.secondary} 50%,
            ${({ theme }) => theme.secondaryOpacity} 100%
        ),
        ${({ $url }) => `url(${$url})`} no-repeat;
    // background:  !important;
    background-size: cover !important;
    background-position: bottom center !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 70vh;
    top: 0px;
    right: 0px;
`;
