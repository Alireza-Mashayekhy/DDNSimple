import { css } from "styled-components";
// export const button1 = css`
//     width: 100%;
//     background: rgb(66, 8, 160) !important;
//   }`;

import { fonts } from "@/styles";


export const button1 = css`
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
`;

// export const StyledButton = styled(Button)`
//   && {
//     border: 1px solid ${({ theme }) => theme.border};
//     background-color: ${({ theme }) => theme.secondary};
//     color: ${({ theme }) => theme.textColor};
//     font-size: ${fonts.size.m};
//     font-weight: ${fonts.weight.semiBold};
//     font-family: ${fonts.family.default};
//     // width: 100%;
//   }
//   &&.Mui-disabled {
//     color: #888; // Your desired color for the text when the button is disabled
//   }
// `;
