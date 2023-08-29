import {request} from "@umijs/max";


export default class Public {

    public static async getCaptcha() {

        return request('/public/captcha/get_code', {
            method: 'POST',
            data: {
                sign: 'web',
                timestamp: new Date().getTime()
            }
        })
    }


    public static async login(username: string, password: string, code: string, session_id: string) {
        return request('/public/login/by_password', {
            method: 'POST',
            data: {
                username: username,
                password: password,
                code: code,
                session_id: session_id
            }
        })
    }

    // static async register(username: string, password: string) {
    //     return request('/api/register', {
    //         method: 'POST',
    //         data: {
    //             username: username,
    //             password: password
    //         }
    //     })
    // }

    // static async logout() {
    //     return request('/api/logout', {
    //         method: 'POST'
    //     })
    // }

}