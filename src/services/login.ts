import { request } from '@umijs/max';
export const Login = (loginType: string, data: any) => request('/login/' + loginType, { method: 'POST', data: data });
export const Logout = () => request('/logout', { method: 'POST' });
