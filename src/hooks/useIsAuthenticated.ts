import { useSelector } from 'react-redux';

import { getAuthentication } from '@/selectors/state';

const useIsAuthenticated = (): boolean => {
    const authentication = useSelector(getAuthentication);
    // const self = useSelector(getSelf);

    return !!authentication.accessToken;
};

export default useIsAuthenticated;
