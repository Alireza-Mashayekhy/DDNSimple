import { useSelector } from 'react-redux';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authenticated from '@/layouts/authenticated';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '@/redux/selectors';
import { darkTheme, lightTheme } from '@/styles/theme';
import GlobalStyle from '@/styles/components/GlobalStyle';
import PrimeReactStyle from '@/styles/components/PrimeReactStyle';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@/styles/globals.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import { useIsAuthenticated } from '@/hooks';
import Unauthenticated from '@/layouts/unauthenticated';
import { getUserData } from '@/utils/authentication';

const App = () => {
    const isAuthenticated = useIsAuthenticated();
    const theme = useSelector(getTheme);
    const role = getUserData()?.role;
    console.log(isAuthenticated, role);

    const renderLayout = () => {
        if (isAuthenticated) {
            return <Authenticated />;
        }
        return <Unauthenticated />;
    };

    return (
        <PrimeReactProvider>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle />
                <PrimeReactStyle />
                {renderLayout()}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                    transition={Flip}
                />
            </ThemeProvider>
        </PrimeReactProvider>
    );
};

export default App;
