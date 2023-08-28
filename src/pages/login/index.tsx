import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import './login.scss';
import Public from '@/services/public';
import { history, useModel, useAccess } from '@umijs/max';
import {
    WechatFilled,
    LockOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';

type LoginType = 'phone' | 'account';
const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

export default () => {
    const state = useModel('@@initialState');
    const [messageApi, contextHolder] = message.useMessage();
    const [captcha, setCaptcha] = React.useState('');
    const [session_id, setSession_id] = React.useState('');
    const [loginType, setLoginType] = useState<LoginType>('account');

    const onFinish = async (values: any) => {
        try {
            if (loginType === 'account') {
                const res = await Public.login(values.username, values.password, values.code, session_id);
                    localStorage.setItem('token', res.token);
                    messageApi.success('登录成功');
                    state.initialState?.updateToken(res.token);
                    history.push('/home');
            } else {

            }
        } catch (e) {
            getCaptcha()
            console.log(e);
        }


    };
    useEffect(() => {
        getCaptcha()
    }, [])

    const getCaptcha = () => {
        Public.getCaptcha().then((e) => {
            setCaptcha(e.img)
            setSession_id(e.session_id)
        }, (e) => {
            console.log(e)
        })
    }
    const onFinishFailed = (errorInfo: any) => {
        for (let i in errorInfo.errorFields) {
            messageApi.error(errorInfo.errorFields[i].errors[0]).then(r =>
                console.log(r)
            );
        }
    };


    return (
        <div
            style={{
                backgroundColor: 'white',
                height: 'calc(100vh - 48px)',
                margin: -24,
            }}
        >
            {contextHolder}
            <LoginFormPage
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                title="绮梦次元"
                subTitle="绮梦次元简介"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: '#fff',
                        borderRadius: 8,
                        backgroundColor: '#1677FF',
                    },
                    title: '绮梦次元',
                    subTitle: '绮梦次元简介',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                background: '#fff',
                                color: '#1677FF',
                                width: 120,
                            }}
                        >
                            去看看
                        </Button>
                    ),
                }}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
                            <span
                                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
                            >
                                其他登录方式
                            </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <WechatFilled style={{ ...iconStyles, color: '#1677FF' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
                            </div>
                        </Space>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    items={[
                        {
                            key: 'account',
                            label: '账号密码登录',
                        },
                        {
                            key: 'phone',
                            label: '手机号登录',
                        },
                    ]}
                >
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名: admin'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'密码: 123456'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                        <Row>
                            <Col onClick={getCaptcha} span={12}><img src={captcha} width={"100%"} /></Col>
                            <Col span={10} push={2}>
                                <ProFormText
                                    name="code"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={'prefixIcon'} />,
                                    }}
                                    placeholder={'验证码'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码!',
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>

                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        {/*<ProFormText*/}
                        {/*    fieldProps={{*/}
                        {/*        size: 'large',*/}
                        {/*        prefix: <MobileOutlined className={'prefixIcon'}/>,*/}
                        {/*    }}*/}
                        {/*    name="mobile"*/}
                        {/*    placeholder={'手机号'}*/}
                        {/*    rules={[*/}
                        {/*        {*/}
                        {/*            required: true,*/}
                        {/*            message: '请输入手机号！',*/}
                        {/*        },*/}
                        {/*        {*/}
                        {/*            pattern: /^1\d{10}$/,*/}
                        {/*            message: '手机号格式错误！',*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*/>*/}
                        {/*<ProFormCaptcha*/}
                        {/*    fieldProps={{*/}
                        {/*        size: 'large',*/}
                        {/*        prefix: <LockOutlined className={'prefixIcon'}/>,*/}
                        {/*    }}*/}
                        {/*    captchaProps={{*/}
                        {/*        size: 'large',*/}
                        {/*    }}*/}
                        {/*    placeholder={'请输入验证码'}*/}
                        {/*    captchaTextRender={(timing, count) => {*/}
                        {/*        if (timing) {*/}
                        {/*            return `${count} ${'获取验证码'}`;*/}
                        {/*        }*/}
                        {/*        return '获取验证码';*/}
                        {/*    }}*/}
                        {/*    name="captcha"*/}
                        {/*    rules={[*/}
                        {/*        {*/}
                        {/*            required: true,*/}
                        {/*            message: '请输入验证码！',*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*    onGetCaptcha={async () => {*/}
                        {/*        message.success('获取验证码成功！验证码为：1234');*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginFormPage>
        </div>
    )
}