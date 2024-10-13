import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import './App.css';
import Login from '@/layouts/unauthenticated/forms/login';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            {' '}
            // Wrap the entire app with Provider
            <Login />
        </Provider>
    );
};

export default App;
