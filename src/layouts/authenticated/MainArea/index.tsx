import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Upload from '@/pages/Upload';
import { SFC } from '@/types';
import * as S from './Styles';

import {
    PATH_FEE,
    PATH_HOME,
    PATH_RECORDS,
    PATH_STATISTICS,
    PATH_UPLOAD,
    PATH_USERS,
    PATH_INVESTMENT,
    PATH_LEGALFACTUAL,
} from '@/constants/paths';
import RecordsPage from '@/pages/Records';
import Statistics from '@/pages/Statistics';
import Fee from '@/pages/Fee';
import UsersPage from '@/pages/Users';
import Investment from '@/pages/investment';
import LegalFactual from '@/pages/legalFactual';

const MainArea: SFC = ({ className }) => {
    return (
        <S.Container className={className}>
            {
                <Routes>
                    <Route path={PATH_HOME} element={<Home />} />
                    <Route path={PATH_UPLOAD} element={<Upload />} />
                    <Route path={PATH_RECORDS} element={<RecordsPage />} />
                    <Route path={PATH_STATISTICS} element={<Statistics />} />
                    <Route path={PATH_FEE} element={<Fee />} />
                    <Route path={PATH_INVESTMENT} element={<Investment />} />
                    <Route
                        path={PATH_LEGALFACTUAL}
                        element={<LegalFactual />}
                    />
                </Routes>
            }
        </S.Container>
    );
};

export default MainArea;
