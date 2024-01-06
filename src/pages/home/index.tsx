import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout, type ActionType } from '@ant-design/pro-components';
import { Avatar, Button, Space } from 'antd';
import { useState, useRef } from 'react';
import { useAppSelector } from '@/store';
import { useMount } from 'ahooks';

export default () => {
    const [pathname, setPathname] = useState('/');
    const menuData = useAppSelector(state => state.menu);

    const actionRef = useRef<ActionType>();
    useMount(() => {
        console.log('menuData', menuData);
    });
    return (
        <ProLayout
            location={{
                pathname,
            }}
            layout="mix"
            loading={false}
            actionRef={actionRef}
            route={menuData.menu}
            menu={{
                type: 'group',
            }}
            links={[<Button key="1">操作一</Button>, <Button key="2">操作二</Button>]}
            collapsedButtonRender={false}
            actionsRender={props => {
                if (props.isMobile) return [];
                return [
                    <Space
                        key={1}
                        align="center"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Avatar
                            src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                            size="small"
                        />
                        <div
                            style={{
                                fontSize: '14px',
                                marginInlineEnd: '32px',
                            }}
                        >
                            七妮妮
                        </div>
                        <InfoCircleFilled key="InfoCircleFilled" />
                        <QuestionCircleFilled key="QuestionCircleFilled" />
                        <GithubFilled key="GithubFilled" />
                    </Space>,
                ];
            }}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        setPathname(item.path || '/welcome');
                    }}
                >
                    {dom}
                </div>
            )}
        >
            <PageContainer>
                <ProCard>
                    {/* <Outlet /> */}
                    11
                </ProCard>
            </PageContainer>
        </ProLayout>
    );
};
