import Content from '@/models/content';
import { request } from '@umijs/max';

export default class Admin {
  public static getGroups(id: number, pageNum: number, pageSize: number) {
    return request('/admin/getGroups', {
      method: 'post',
      data: {
        id,
        pageNum,
        pageSize,
      },
    });
  }

  // 获取所有小程序内容
  public static getContents(params:any) {
    return request<{
      total: number;
      list: Content[];
    }>('/admin/mini/getContents', {
      method: 'post',
      data: params,
    });
  }

  // 获取单个
  public static async  getContent(id: number, content_class: string) {
    return request('/admin/mini/getContent', {
      method: 'post',
      data: {
        id,
        content_class,
      },
    });
  }

  // 添加
  public static addContent(content: Content) {
    return request('/admin/mini/addContent', {
      method: 'post',
      data: content,
    });
  }

  // 修改
  public static editContent(content: Content) {
    return request('/admin/mini/editContent', {
      method: 'post',
      data: content,
    });
  }

  // 删除
  public static delContent(id: number, content_class: string) {
    return request('/admin/mini/delContent', {
      method: 'post',
      data: {
        id,
        content_class,
      },
    });
  }
}
