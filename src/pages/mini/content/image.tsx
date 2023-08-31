import { PathState } from '@/models/path';
import { history } from '@umijs/max';
import { Modal } from 'antd';
import { useEffect } from 'react';
import {PathModel} from "@/components/path/pathModel";


export default () => {
    let toList = false;
    useEffect(() => {
        let state = history.location.state as PathState;
        if (state) {
            console.log(state);
        } else {
            toList = true;
        }
    }, []);
    return (
        <>
            111
            <PathModel title={"找不到图片内容"} open={history.location.state==undefined} />
        </>
    );
};
