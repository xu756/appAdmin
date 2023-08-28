import { request } from "@@/plugin-request";

export default class Admin {
    public static getGroups(id: number, pageNum: number, pageSize: number) {
        return request('/admin/getGroups', {
            method: 'post',
            data: {
                id,
                pageNum,
                pageSize
            }
        })
    }
}