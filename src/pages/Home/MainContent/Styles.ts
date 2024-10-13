import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    text-align: center;
`;

export const ProfileSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

export const ManagerContainer = styled.div`
    text-align: center;
    height: 100%;
    position: relative;
`;

export const Effect = styled.div<{ $theme?: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${({ $theme }) =>
        $theme === 'dark'
            ? 'linear-gradient(0deg,black 75%,rgba(0, 0, 0, 0.9) 80%,rgba(0, 0, 0, 0.8) 85%,rgba(0, 0, 0, 0.7) 90%,rgba(0, 0, 0, 0.6) 95%,rgba(0, 0, 0, 0.5) 100%)'
            : 'linear-gradient(0deg,white 75%,rgba(255, 255, 255, 0.9) 80%,rgba(255, 255, 255, 0.8) 85%,rgba(255, 255, 255, 0.7) 90%,rgba(255, 255, 255, 0.6) 95%,rgba(255, 255, 255, 0.5) 100%)'};
`;

export const Image = styled.div<{ $url?: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: ${({ $url, theme }) =>
        $url ? `url(${$url})` : theme.border};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
    opacity: 60%;
`;
