import { QuestionCircleOutlined } from '@ant-design/icons';
import { Outlet } from '@umijs/max';
import { useMount } from 'ahooks';

import { PageContainer } from '@ant-design/pro-components';
// import { useAccess, useLocation } from '@umijs/max';
import { Button, FloatButton, Input } from 'antd';
// const LoginPath = '/login';
export default () => {
    // const access = useAccess();
    // const location = useLocation();
    useMount(() => {});
    return (
        <PageContainer
            extra={[
                <Input.Search
                    key="search"
                    style={{
                        width: 240,
                    }}
                />,
                <Button key="3">操作一</Button>,
                <Button key="2" type="primary">
                    操作一
                </Button>,
            ]}
        >
            <FloatButton
                tooltip="点击反馈"
                href="https://s1zt69w7hzv.feishu.cn/share/base/form/shrcns0R7BfGGW75OfZnOAX13eg"
                target="_blank"
                icon={<QuestionCircleOutlined />}
                type="primary"
                style={{ right: 24, bottom: 80 }}
            />
            <Outlet />
        </PageContainer>
    );
};
