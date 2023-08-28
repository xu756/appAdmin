import {useModel} from "@umijs/max";
import {InitDataType, RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {InitState} from "@/models/init";
import {useEffect} from "react";
import type {MenuProps} from 'antd';

import {Avatar, Dropdown, Col, Row, Space, Button} from "antd";
import SearchInput from "@/components/right/SearchInput";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import {LogoutOutlined} from "@ant-design/icons";

const menu: MenuProps = {
    theme: 'dark',
    items: [
        {
            key: '1',
            label: (
                <div>
                    退出登录
                </div>
            ),
            icon: <LogoutOutlined/>,
        }
    ]

}
export default (
    state: InitState,
    setInitialState: InitDataType['setInitialState'],
    runtimeConfig: RunTimeLayoutConfig,
) => {
    return (
        <Row style={{
            minWidth: '150px',
            maxWidth: '300px',
        }}>
            <Col span={16}>
                <Space wrap align="baseline">

                </Space>
            </Col>
            <Col span={8}>
                <Dropdown menu={menu} placement="bottomRight" arrow={{pointAtCenter: true}}>
                    <Avatar src={state.user.avatar}/>
                </Dropdown>
            </Col>
        </Row>
    );
}