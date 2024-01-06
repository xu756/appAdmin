import { JSX } from 'react';
export interface sideMenuItem {
    name: string;
    path: string;
    icon?: JSX.Element | string;
    routes?: sideMenuItem[];
}

export interface sideMenuModel {
    path: string;
    routes: sideMenuItem[];
}
