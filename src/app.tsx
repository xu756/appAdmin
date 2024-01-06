import { useMount } from 'ahooks';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import { Suspense } from 'react';
import Loading from './layout/loading';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
    useMount(() => {
        console.log('App mounted');
    });
    return (
        <Provider store={store}>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
            </Suspense>
        </Provider>
    );
};

export default App;
