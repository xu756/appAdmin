import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sideMenuItem, sideMenuModel } from '@/model';

const mockMenu: sideMenuModel = {
    path: '/',
    routes: [
        {
            path: '/welcome',
            name: '欢迎',
            icon: 'smile',
        },
        {
            path: '/system',
            name: '系统管理',
            routes: [
                {
                    path: '/system/user',
                    name: '用户管理',
                    icon: 'user',
                },
                {
                    path: '/system/role',
                    name: '角色管理',
                    icon: 'team',
                },
                {
                    path: '/system/menu',
                    name: '菜单管理',
                    icon: 'menu',
                },
            ],
        },
    ],
};
export const menuStore = createSlice({
    name: 'menu',
    initialState: {
        menu: mockMenu,
    },
    reducers: {
        setMenu: (state, action: PayloadAction<sideMenuModel>) => {
            state.menu = action.payload;
        },
        // setAppList: (state, action) => {
        //     state.appList = action.payload;
        // },
    },
});
