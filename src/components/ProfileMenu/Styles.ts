import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import UIcon from '@mdi/react';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;

export const MenuButton = styled(Button)`
    background: none;
    color: ${({ theme }) => theme.textColor};
    border: none;
    outline: none;
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
`;

export const MenuIcon = styled(UIcon)``;

export const MenuContainer = styled(Menu)`
    width: 200px;
    background: ${({ theme }) => theme.strippedRow};
    border-radius: 5px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textColor};
    li {
        &:first-child {
            display: none;
        }
        a {
            font-size: 12px;
            color: ${({ theme }) => theme.textColor};
            text-decoration: none;
            padding: 10px 10px;
            display: flex;
            flex: 1;
            align-items: center;
            gap: 10px;
        }
    }
`;
