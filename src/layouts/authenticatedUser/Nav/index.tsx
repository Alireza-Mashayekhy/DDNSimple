import { useDispatch, useSelector } from 'react-redux';
import {
    mdiHomeAnalytics,
    mdiWhiteBalanceSunny,
    mdiWeatherNight,
    mdiAccountGroup,
    mdiExitToApp,
    mdiCalculatorVariant,
} from '@mdi/js';
import { AppDispatch, SFC } from '@/types';
import MenuButton from './MenuItem/MenuButton';
import MenuLink from './MenuItem/MenuLink';
import logoblack from '@/assets/logoblack.png';
import logoWhite from '@/assets/logoWhite.png';
import * as S from './Styles';
import { setTheme } from '@/redux/slice/themeSlice';
import { getTheme } from '@/redux/selectors';
import { logout } from '@/dispatchers/authentication';
import { useNavigate } from 'react-router';
import ProfileMenu from '@/components/ProfileMenu';

const Nav: SFC = ({ className }) => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector(getTheme);
    const navigate = useNavigate();

    const handleThemeChange = () => {
        dispatch(setTheme());
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signIn');
    };

    return (
        <S.Container className={className}>
            <S.Logo src={`${theme === 'dark' ? logoWhite : logoblack} `} />
            <S.FlexItem>
                <MenuLink
                    icon={mdiHomeAnalytics}
                    rootPath="/home"
                    text="صفحه اصلی"
                    to="/home"
                />
                <MenuLink
                    icon={mdiAccountGroup}
                    rootPath="/customers"
                    text="مشتریان"
                    to="/customers"
                />
                <MenuLink
                    icon={mdiCalculatorVariant}
                    rootPath="/accounting"
                    text="حسابداری"
                    to="/accounting"
                />
            </S.FlexItem>
            <S.FlexItem>
                <ProfileMenu />
                <MenuButton
                    icon={`${theme === 'dark' ? mdiWhiteBalanceSunny : mdiWeatherNight} `}
                    onClick={handleThemeChange}
                    text="حالت تیره/روشن"
                />
                <MenuButton
                    icon={mdiExitToApp}
                    onClick={handleLogout}
                    text="خروج"
                />
            </S.FlexItem>
        </S.Container>
    );
};

export default Nav;
