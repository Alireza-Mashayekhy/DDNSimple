import { SFC } from '@/types';
import * as S from './Styles';
import logo from '@/assets/logo.png';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import BackgroundImage from '@/assets/homeBackground.jpg';

const MainContent: SFC = () => {
    const theme = useSelector(getTheme);
    return (
        <S.ManagerContainer>
            <S.Image $url={BackgroundImage} />
            {theme && <S.Effect $theme={theme} />}
            <div className="flex w-full h-full relative z-2 p-20 justify-end items-start">
                {logo && <img src={logo} alt="Logo" className="h-52" />}
            </div>
        </S.ManagerContainer>
    );
};

export default MainContent;
