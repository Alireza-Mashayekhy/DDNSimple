import styled from 'styled-components';

import {colors} from '@/styles';

export const Menu = styled.div`
  background: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  padding: 6px 0;
  position: fixed;
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
  padding: 8px 12px;
  transition: background 0.1s;
  white-space: nowrap;

  &:hover {
    background: ${colors.whiteHover};
    cursor: pointer;
  }
`;
