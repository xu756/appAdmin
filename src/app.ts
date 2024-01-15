// 运行时配置
import { RequestConfig } from '@@/plugin-request/request';
import { RunTimeLayoutConfig } from '@umijs/max';
import { notification } from 'antd';

import { DEFAULT_TITLE } from './constants';

export async function getInitialState() {
    return {};
}
export const layout: RunTimeLayoutConfig = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { initialState } = useModel('@@initialState');

    return {
        title: DEFAULT_TITLE,
        // logo: Logo,
        menu: {
            locale: false,
        },
        layout: 'top',
        fixSiderbar: true,
        siderWidth: 200,
        // rightContentRender: () => <RightContent />,
        waterMarkProps: {
            content: [DEFAULT_TITLE, initialState?.User.Name],
        },
        token: {},
    };
};

export const request: RequestConfig = {
    timeout: 3000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
    },
    // 请求拦截器
    requestInterceptors: [
        (config: any) => {
            config.url = '/api' + config.url;
            config.headers.Authorization = getCookie('token');
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

            // 220 -229 跳转到登录页面
            if (errorCode >= 230 && errorCode <= 239) {
                history.push('/login');
                return;
            }
            notification.warning({
                description: `请求错误 ${errorMessage}`,
                message: `错误代码：${errorCode}`,
            });
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
