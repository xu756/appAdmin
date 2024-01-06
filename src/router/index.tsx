import { Navigate, createBrowserRouter, Outlet } from 'react-router-dom';
// import Layout from '@/layout/layout';
import { lazy } from 'react';
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/Error/404'));
const Login = lazy(() => import('@/pages/Login'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" />,
            },
            {
                path: '/home',
                element: <Home />,
                handle: {
                    title: '首页',
                },
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/*',
        element: <NotFound />,
    },
]);
export default router;
