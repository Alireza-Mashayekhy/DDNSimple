import { breakpoints, hiddenScroll } from '@/styles';
import { narrowScroll } from '@/styles/mixins';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    direction: rtl;
    display: flex;
    align-items: stretch;
    gap: 0.3rem;
    overflow: hidden;
    color: ${({ theme }) => theme.textColor};
`;

export const FirstColumn = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isSecondColumnVisible'].includes(prop),
})`
    width: 0;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    ${hiddenScroll};
`;

export const TopRow = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.textColor};
    height: 5vh;
    padding: 5px 10px;
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
    gap: 2rem;

    @media (max-width: ${breakpoints.tablet}) {
        margin: 0 0.1rem 0.1rem 0.1rem;
    }
`;

export const FlexContainerSecondRow = styled.div`
    display: flex;
    margin-top: 0.1rem;
    align-items: stretch;
    justify-content: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    @media (min-width: ${breakpoints.tablet}) {
        margin-top: 0.3rem;
    }

    > div:nth-child(1) {
        flex-basis: calc(100%);
        height: calc(100vh - 10vh);
        background-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.textColor};
        overflow: auto;

        @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
            display: block;
            flex-basis: calc(100%);
            margin: 0 0.1rem;
            height: calc(100vh - 5vh);
        }

        @media (min-width: ${breakpoints.tablet}) {
            display: block;
            flex-basis: calc(100%);
            height: calc(100vh - 6vh);
        }
    }
`;
