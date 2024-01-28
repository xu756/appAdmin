// 运行时配置
import { RequestConfig } from '@@/plugin-request/request';
import { RunTimeLayoutConfig, history } from '@umijs/max';
import { Button, Input, notification } from 'antd';

import { DEFAULT_TITLE, LayoutHeader } from './constants';

export async function getInitialState() {
    return {};
}

const RightContent = () => {
    return (
        <>
            <div>Avatar</div>
        </>
    );
};

export const layout: RunTimeLayoutConfig = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { initialState } = useModel('@@initialState');

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
            render: () => <div>Avatar</div>,
        },
        actionsRender: () => {
            return [
                <Input.Search
                    key="search"
                    style={{
                        width: 240,
                    }}
                />,
                <Button key="3">操作一</Button>,
                <Button key="2" type="primary">
                    操作一
                </Button>,
            ];
        },
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

function getCookie(param: string) {
    let value = '';
    if (document.cookie.length > 0) {
        const arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
            const arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === param) {
                value = arr2[1];
                //保存到保存数据的地方
            }
        }
        return value;
    }
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
