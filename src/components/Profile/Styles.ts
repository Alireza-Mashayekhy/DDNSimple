import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: fit-content;
    position: relative;
`;
export const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 15px;
    margin-bottom: 20px;
    // border: 1px solid ${({ theme }) => theme.textColor};
    box-shadow: 0px 0px 12px 0px ${({ theme }) => theme.border};
    position: relative;
    background: ${({ theme }) => theme.secondary};
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
export const DefaultImage = styled.img`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const DefaultImageContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 15px;
    margin-bottom: 20px;
    padding: 20px;
    // box-shadow: 0px 0px 12px 0px white;
    box-shadow: 0px 0px 12px 0px ${({ theme }) => theme.border};
    position: relative;
    background: ${({ theme }) => theme.secondary};
`;

export const PatternBackground = styled.img`
    position: absolute;
    left: -15px;
    top: -15px;
    z-index: 0;
`;
