// 运行时配置
import { RequestConfig } from '@@/plugin-request/request';
import { RunTimeLayoutConfig, history } from '@umijs/max';
import { notification } from 'antd';

import { useModel } from '@umijs/max';
import { DEFAULT_TITLE, LayoutHeader } from './constants';
import { ActionComponent } from './layouts/layout';

export async function getInitialState() {
    return {
        user: {
            name: 'admin',
        },
    };
}

export const layout: RunTimeLayoutConfig = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { initialState } = useModel('@@initialState');

    return {
        title: DEFAULT_TITLE,
        // logo: Logo,
        menu: {
            locale: false,
            type: 'group',
        },
        layout: 'mix',
        fixSiderbar: true,
        siderWidth: 200,
        avatarProps: {
            title: initialState?.user?.name,
            src: 'https://cos.imlogic.cn/appadmin/images/avatar.jpeg',
            draggable: false,
        },
        actionsRender: ActionComponent,
        // splitMenus: true,
        // rightContentRender: () => <RightContent />,
        waterMarkProps: {
            content: [DEFAULT_TITLE],
        },
        token: {
            header: {
                heightLayoutHeader: LayoutHeader,
            },
        },
    };
};

interface ResponseStructure {
    success: boolean;
    data?: any;
    errorCode?: number;
    errorMessage?: string;
    timestamp?: number;
}

export const request: RequestConfig = {
    timeout: 3000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
    },
    // 请求拦截器
    requestInterceptors: [
        (config: any) => {
            if (!config.url.startsWith('/log')) {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token');
                if (token === '') {
                    // 跳转
                    console.log(history.location);
                    history.push('/login');
                }
                config.headers.Authorization = token;
            }
            config.url = '/api/admin' + config.url;
            return config;
        },
    ],
    errorConfig: {
        errorHandler: (error: any) => {
            const { errorCode, errorMessage } = error;
            if (errorCode === undefined) {
                notification.error({
                    message: '网络错误',
                    description: '请检查网络连接,或者联系管理员',
                });
                return;
            }
            console.log(errorMessage);

            // // 220 -229 跳转到登录页面
            // if (errorCode >= 230 && errorCode <= 239) {
            //     history.push('/login');
            //     return;
            // }
            // notification.warning({
            //     description: `请求错误 ${errorMessage}`,
            //     message: `错误代码：${errorCode}`,
            // });
        },
    },
    // 响应拦截器
    responseInterceptors: [
        (response: any) => {
            // 拦截响应数据，进行个性化处理
            const data: ResponseStructure = response.data;
            if (data.success) {
                return response.data;
            }
            throw response.data;
        },
    ],
};
