import {request} from "@umijs/max";

export default class User {
    public static  getUserInfo() {
        return request('/user/getUserInfo', {
            method: 'post'
        })
    }
}