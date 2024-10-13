import { useDispatch, useSelector } from 'react-redux';
import {
    mdiHomeAnalytics,
    mdiWhiteBalanceSunny,
    mdiWeatherNight,
    mdiUpload,
    mdiClipboardTextClock,
    mdiChartBar,
    mdiCalculator,
    mdiAccountGroup,
    mdiExitToApp,
    mdiTreasureChest,
    mdiChartLine,
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

const Nav: SFC = ({ className }) => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector(getTheme);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signIn');
    };

    const handleThemeChange = () => {
        dispatch(setTheme());
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
                    icon={mdiUpload}
                    rootPath="/upload"
                    text="بارگذاری"
                    to="/upload"
                />
                <MenuLink
                    icon={mdiClipboardTextClock}
                    rootPath="/records"
                    text="سوابق دارندگان واحدهای صندوق"
                    to="/records"
                />
                <MenuLink
                    icon={mdiChartBar}
                    rootPath="/statistics"
                    text="آمار تغییرات"
                    to="/statistics"
                />
                <MenuLink
                    icon={mdiCalculator}
                    rootPath="/fee"
                    text="محاسبه کارمزد مدیر"
                    to="/fee"
                />
                <MenuLink
                    icon={mdiTreasureChest}
                    rootPath="/investment"
                    text="سرمایه گذاری"
                    to="/investment"
                />
                <MenuLink
                    icon={mdiChartLine}
                    rootPath="/Indv-Inst-History"
                    text="آمار حقوقی/حقیقی"
                    to="/Indv-Inst-History"
                />
            </S.FlexItem>
            <S.FlexItem>
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
