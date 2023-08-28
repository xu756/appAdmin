import {request} from "@@/plugin-request";

export default class User {
    public static  getUserInfo() {
        return request('/user/getUserInfo', {
            method: 'post'
        })
    }
}