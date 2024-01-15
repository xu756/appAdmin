import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '小程序管理系统',
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: '@/layouts',
            access: 'user',
        },
        {
            name: '小程序',
            path: '/app',
            access: 'user',
            routes: [
                {
                    name: '小程序详情',
                    path: '/app',
                    component: '@/pages/Wxapp/Detail',
                    access: 'user',
                },
                {
                    name: '小程序管理',
                    path: '/app/admin',
                    component: '@/pages/Wxapp/Admin',
                    access: 'user',
                },
            ],
        },
        {
            name: '登录',
            path: '/login',
            layout: false,
            component: '@/pages/Login',
        },
    ],
    npmClient: 'pnpm',
    // /api 会被代理到 http://
    proxy: {
        '/api': {
            target: 'http://localhost:8080/api',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
    },
});
