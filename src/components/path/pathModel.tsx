import {history} from "@@/core/history";
import {Modal} from "antd";

export const PathModel = ({ open,title }: { open: boolean,title:string }) => {
    const toContentList = () => {
        history.push('/mini/content/list');
    };
    return (
        <>
            <Modal
                title={title}
                open={open}
                onOk={toContentList}
                onCancel={toContentList}
            >
                <p>请返回内容列表页获取数据</p>
            </Modal>
        </>
    );
};