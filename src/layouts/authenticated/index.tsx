import { AppDispatch, SFC } from '@/types';
import Nav from './Nav';
import MainArea from './MainArea';
import * as S from './Styles';
import ResponsiveNav from './Nav/ResponsiveNav';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUploadData } from '@/dispatchers/upload';
import { useSelector } from 'react-redux';
import { getStockData, getUploadData, getUsers } from '@/selectors/state';
import LoadingComponent from '@/components/Loading';
import { fetchStockData } from '@/dispatchers/stock';
import { fetchUsersList } from '@/dispatchers/users';

const Authenticated: SFC = () => {
    const uploadLoading = useSelector(getUploadData)?.loading;
    const stockLoading = useSelector(getStockData)?.loading;

    const loading = stockLoading || uploadLoading;

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            try {
                Promise.all([dispatch(fetchUploadData())]);
                Promise.all([dispatch(fetchStockData())]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [dispatch]);
    return (
        <>
            <S.HambugerMenuContainer>
                <ResponsiveNav />
            </S.HambugerMenuContainer>
            <S.Container>
                <Nav />
                <MainArea />
                {loading && <LoadingComponent />}
            </S.Container>
        </>
    );
};

export default Authenticated;
