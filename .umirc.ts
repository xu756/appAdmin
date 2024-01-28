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
            name: '小程序',
            path: '/app',
            icon: 'appstoreAddOutlined',
            access: 'user',
            routes: [
                {
                    path: '/app',
                    redirect: '/app/detail',
                },
                {
                    name: '小程序详情',
                    path: '/app/detail',
                    component: '@/pages/Wxapp/Detail',
                    access: 'user',
                },
                {
                    path: '/app/config',
                    name: '小程序配置',
                    icon: 'settingOutlined',
                    component: '@/pages/Wxapp/Config',
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
