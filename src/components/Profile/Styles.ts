import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    width: fit-content;
`;
export const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 15px;
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.textColor};
`;
export const Name = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
`;
export const Date = styled.div`
    font-size: 16px;
    white-space: nowrap;
    background: ${({ theme }) => theme.strippedRow};
    padding: 10px 20px;
    border-radius: 5px;
`;
