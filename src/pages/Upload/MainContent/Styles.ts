import styled from 'styled-components';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { Button, ButtonProps, SvgIconProps } from '@mui/material';
import { muiButtonStyle } from '@/styles/mixins';
import { breakpoints } from '@/styles';

interface CustomIconProps extends SvgIconProps {
    fontColor?: string; // Define the custom prop
}
interface CustomButtonProps extends ButtonProps {
    fontColor?: string;
}

export const Container = styled.div`
    padding: 10px;
    text-align: center;
`;

export const UploadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;

    > div:nth-child(1) {
        margin-bottom: 0.5rem;
    }
`;

export const SCloudUploadIcon = styled(CloudUploadTwoToneIcon).withConfig({
    shouldForwardProp: (prop) => !['fontColor'].includes(prop),
})<CustomIconProps>`
    color: ${(props) => props.fontColor} !important;
    font-size: 2rem !important;
    animation: slideUp 2s linear infinite;
    @keyframes slideUp {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
`;

export const StyledButton = styled(Button).withConfig({
    shouldForwardProp: (prop) => !['fontColor'].includes(prop),
})<CustomButtonProps>`
    color: ${(props) => props.fontColor} !important;
    ${muiButtonStyle};
    margin: 1rem !important;
    padding: 0.5rem !important;
    width: 200px;
    border: 1px solid ${(props) => props.fontColor} !important;
`;
