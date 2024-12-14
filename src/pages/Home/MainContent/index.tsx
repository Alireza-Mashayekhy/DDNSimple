import { SFC } from '@/types';
import * as S from './Styles';
import { getUserData } from '@/utils/authentication';
import logo from '@/assets/logo_servat.png';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import Profile from '@/components/Profile';
import BackgroundImage from '@/assets/homeBackground.jpg';
import marketerHomeBack from '@/assets/marketerHomeBack.jpg';

const MainContent: SFC = () => {
    const userData = getUserData();
    const role = userData?.role;

    const theme = useSelector(getTheme);
    // if (role === 'MANAGER') {
    return (
        <S.ManagerContainer>
            <S.Image $url={BackgroundImage} />
            {theme && <S.Effect $theme={theme} />}
            <div className="flex w-full h-full relative z-2 p-20 justify-end items-start">
                {logo && <img src={logo} alt="Logo" className="h-40" />}
            </div>
        </S.ManagerContainer>
    );
    // }
    // return (
    //     <S.Container>
    //         <S.Background $url={marketerHomeBack} />
    //         <S.ProfileSection>
    //             <Profile />
    //         </S.ProfileSection>
    //     </S.Container>
    // );
};

export default MainContent;
