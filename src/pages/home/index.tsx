import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Avatar, Image, Space } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '@/store';
import { useMount } from 'ahooks';
export default () => {
    const [pathname, setPathname] = useState('/');
    const menuData = useAppSelector(state => state.menu);
    useMount(() => {
        console.log('menuData', menuData);
    });
    return (
        <ProLayout
            location={{
                pathname,
            }}
            route={menuData.menu}
            menu={{
                type: 'group',
            }}
            actionsRender={props => {
                if (props.isMobile) return [];
                return [
                    <div
                        key={1}
                        style={{
                            height: '200px',
                        }}
                    >
                        <Image
                            width={'100%'}
                            preview={false}
                            height={132}
                            src="https://gw.alipayobjects.com/zos/bmw-prod/d283f09a-64d6-4d59-bfc7-37b49ea0da2b.svg"
                        />
                        <Space
                            align="center"
                            size="middle"
                            style={{
                                width: '100%',
                                marginBlockStart: '32px',
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
                        </Space>
                    </div>,
                ];
            }}
            menuRender={(props, defaultDom) => (
                <>
                    {console.log('defaultDom', defaultDom)}
                    {defaultDom}
                </>
            )}
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
                <ProCard
                    style={{
                        height: '100vh',
                        minHeight: 800,
                    }}
                >
                    <div />
                </ProCard>
            </PageContainer>
        </ProLayout>
    );
};
