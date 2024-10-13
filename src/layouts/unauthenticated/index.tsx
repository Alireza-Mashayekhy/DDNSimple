import {Route, Routes} from 'react-router-dom';

import {SFC} from '@/types';
import Login from './forms/login';
import * as S from './styles';

const Unauthenticated: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
        <Route path="/signIn" element={<Login/>} />
        <Route path="*" element={<Login/>} />
      </Routes>
    </S.Container>
  );
};

export default Unauthenticated;