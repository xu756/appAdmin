import Right from '@/components/right';
import { fetchInitialData } from '@/models/init';
import { history } from '@@/core/history';
import { RuntimeAntdConfig } from '@@/plugin-antd/types';
import { RequestConfig } from '@@/plugin-request/request';
import { message, notification, theme } from 'antd';

export function getInitialState() {
  return fetchInitialData();
}

export const layout: any = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    rightRender: Right,
  };
};

export const antd: RuntimeAntdConfig = (memo: any) => {
  memo.theme ??= {};
  memo.theme.algorithm = theme.darkAlgorithm; // 配置 antd5 的预设 dark 算法
  memo.appConfig = {
    message: {
      // 配置 message 最大显示数，超过限制时，最早的消息会被自动关闭
      maxCount: 3,
    },
  };

  return memo;
};

//请求

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0, // 不提示
  WARNMESSAGE = 1, // 警告提示
  ERRORMESSAGE = 2, // 报错提示
  NOTIFICATION = 3, // 通知
  REDIRECT = 9, // 页面跳转
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: ErrorShowType;
  errorMessage?: string;
}

export const request: RequestConfig = {
  timeout: 1000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      config.url = '/api/app' + config.url;
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
      return config;
    },
  ],
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, errorMessage } = res;
      if (!success || undefined) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { success, data, errorCode, errorMessage };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理

    errorHandler: (error: any, opts: any) => {},
  },

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const data: ResponseStructure = response.data;
      if (data.success) {
        return response.data;
      }
      const { errorCode, errorMessage } = response.data;
      switch (errorCode) {
        case ErrorShowType.SILENT:
          // do nothing
          break;
        case ErrorShowType.WARNMESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.ERRORMESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.NOTIFICATION:
          notification.open({
            description: errorMessage,
            message: errorCode,
          });
          break;
        case ErrorShowType.REDIRECT:
          // TODO: redirect
          history.push('/login');
          break;
        default:
          message.error(errorMessage);
      }
    },
  ],
};
