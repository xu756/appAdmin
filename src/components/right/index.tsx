import { InitState } from '@/models/init';
import { InitDataType, RunTimeLayoutConfig } from '@@/plugin-layout/types';
import type { MenuProps } from 'antd';

import SearchInput from '@/components/right/SearchInput';
import { history } from '@@/core/history';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Row, Space } from 'antd';

const menu: MenuProps = {
  theme: 'dark',
  items: [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/login');
          }}
        >
          退出登录
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ],
};
export default (
  state: InitState,
  setInitialState: InitDataType['setInitialState'],
  runtimeConfig: RunTimeLayoutConfig,
) => {
  return (
    <Row
      style={{
        minWidth: '150px',
        maxWidth: '300px',
      }}
    >
      <Col span={16}>
        <Space wrap align="baseline">
          <SearchInput />
        </Space>
      </Col>
      <Col span={8}>
        <Dropdown
          menu={menu}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Avatar src={state.user.avatar} />
        </Dropdown>
      </Col>
    </Row>
  );
};
