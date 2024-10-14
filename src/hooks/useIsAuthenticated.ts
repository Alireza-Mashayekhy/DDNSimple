import { useState, useEffect } from 'react';

const useIsAuthenticated = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Initial check for token in localStorage or sessionStorage
        const token =
            localStorage.getItem('accessToken') ||
            sessionStorage.getItem('accessToken');
        return !!token;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const token =
                localStorage.getItem('accessToken') ||
                sessionStorage.getItem('accessToken');
            setIsAuthenticated(!!token);
        };

        // Listen to storage events
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return isAuthenticated;
};

export default useIsAuthenticated;
