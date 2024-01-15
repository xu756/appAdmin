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
            component: '@/pages/Home',
            access: 'user',
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
