import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '绮梦次元',
    },
    routes: [
        {
            path: '/',
            layout: 'top',
            flatMenu: true,
            component: '@/layouts/index',
            routes: [
                {
                    path: '/',
                    redirect: '/home',
                },
                {
                    path: '/home',
                    name: '首页',
                    component: '@/pages/home',
                    icon: 'HomeOutlined',
                },
                {
                    path: '/group',
                    name: '用户组',
                    icon: 'UsergroupAddOutlined',
                    routes: [
                        {
                            path: '/group',
                            redirect: '/group/list',
                        },
                        {
                            path: '/group/list',
                            name: '用户组列表',
                            component: '@/pages/group/list',
                        }


                    ]
                },

            ]
        },


        { path: '/login', name: '登录', component: '@/pages/login', layout: false },
    ],
    npmClient: 'pnpm',

    proxy: {

        '/api/app': {
            target: 'https://dev.imlogic.cn/api/app',
            changeOrigin: true,
            pathRewrite: { '^/api/app': '' },
        },
    },
});
