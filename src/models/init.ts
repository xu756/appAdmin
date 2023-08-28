import {history} from "@@/core/history";
import {message} from "antd";
import User from "@/services/user";


export interface UserState {
    id: number;
    name: string;
    avatar: string;
    group: string;
    role: Array<Number>;
}

export interface InitState {
    loading: boolean;
    token: string;
    user: UserState;
    updateToken: (token: string) => void;
    updateUser: (user: UserState) => void;
}


export const fetchInitialData = async () => {
    let userInfo: UserState = {
        id: 0,
        name: '',
        avatar: '',
        group: '',
        role: []
    }
    let init: InitState = {
        loading: false,
        token: '',
        user: userInfo,
        updateToken: (token: string) => {
            init.token = token;
        },
        updateUser: (user: UserState) => {
            init.user = user;
        }
    }

    if (history.location.pathname !== '/login') {
        try {
            userInfo = await User.getUserInfo();
            init.updateToken(localStorage.getItem('token') || '');
        } catch (e) {
            message.error('获取用户信息失败');
            history.push('/login');
        }
    }
    init.user = userInfo;

    return init;
}

