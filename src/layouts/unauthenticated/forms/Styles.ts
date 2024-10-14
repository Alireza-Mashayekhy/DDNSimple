import { Link as ULink } from 'react-router-dom';
import styled from 'styled-components';

import UButton from '@/components/Button';
import { colors, fonts } from '@/styles';
import loginImg from '@/assets/login.jpg';

export const Button = styled(UButton)`
    width: 100%;
    height: 45px;
    background: #fff;
    border-radius: 40px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #333;
    &:hover {
        background: rgba(255, 255, 255, 0.8);
    }
`;

export const CheckboxContainer = styled.div`
    display: flex;

    margin: 10px;
`;

export const Checkbox = styled.input``;

export const Logo = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

export const Heading = styled.h2`
    color: ${({ theme }) => theme.textColor};
    color: ${colors.darkGray};
    margin-bottom: 12px;
`;

export const Link = styled(ULink)`
    color: #fff;
    font-weight: ${fonts.weight.bold};
    font-family: IRANSans;
    font-size: 15px;
`;

export const Panel = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 8px;
    padding: 32px 24px;
    width: 320px;
    text-align: center;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

export const QuestionText = styled.div`
    color: #fff;
    font-size: 12px;
    margin-top: 16px;
`;

export const Background = styled.section`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: url(${loginImg}) no-repeat;
    background-size: cover;
    background-position: center;
    padding: 30px;
`;
export const Container = styled.div`
    position: relative;
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: transparent;
    font-family: IRANSans;
    @media (max-width: 512px) {
        width: 80% !important;
    }
`;
export const FormContainer = styled.div`
    flex: 1;
    height:100%
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:30px 40px;
`;
export const HeaderForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center !important;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
`;
export const InputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    direction: ltr;
    margin: 30px 0;
    svg {
        fill: #555;
        position: absolute;
        right: -2px;
        bottom: -2px;
    }
`;
export const Input = styled.input`
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-sizing: border-box !important;
    text-align: left !important;
    padding: 20px 45px 20px 20px;
`;
export const FormTitle = styled.h3`
    font-size: 16px;
    margin: 40px 10px;
`;
export const LinkStyle = styled(Link)`
    color: gray;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    padding: 10px !important;
    display: flex;
    justify-content: center;
    &:hover {
        color: #333;
    }
`;
