import {TimeNowInTimeZone} from '@/tool';
export default class Content {
    id: number;
    title: string;
    desc_text?: string;
    img_url?: string;
    path: string;
    percent?: number;
    content_class: string;
    content_type: number;
    content_text?: string;
    content_img?: string;
    grade: number;
    created:number;
    edited:number;
    is_edit:number;
    deleted:number;
    constructor() {
        this.id = 0;
        this.title = '';
        this.desc_text = '';
        this.img_url = '';
        this.path = '#';
        this.percent = 0;
        this.content_class = '';
        this.content_type = 0;
        this.content_text = '';
        this.content_img = '';
        this.grade = 0;
        this.created = TimeNowInTimeZone();
        this.edited = 0;
        this.is_edit = 0;
        this.deleted = 0;
    }
}