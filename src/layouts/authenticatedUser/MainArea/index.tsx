import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Customers from '@/pages/Customers';
import { SFC } from '@/types';
import * as S from './Styles';

import { PATH_ACCOUNTING, PATH_CUSTOMERS, PATH_HOME } from '@/constants/paths';
import Accounting from '@/pages/accounting';

const MainArea: SFC = ({ className }) => {
    return (
        <S.Container className={className}>
            {
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path={PATH_HOME} element={<Home />} />
                    <Route path={PATH_CUSTOMERS} element={<Customers />} />
                    <Route path={PATH_ACCOUNTING} element={<Accounting />} />
                </Routes>
            }
        </S.Container>
    );
};

export default MainArea;
