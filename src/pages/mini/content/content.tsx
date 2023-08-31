import Content from '@/models/content';
import { PathState } from '@/models/path';
import Admin from '@/services/admin';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Image, Space, Tag } from 'antd';

const Goto = (id: number, content_type: number) => {
  return () => {
    if (content_type == 1) {
      history.push('/mini/content/text', {
        id: id,
        content_type: content_type,
        content_class: 'content',
      } as PathState);
    } else {
      history.push('/mini/content/image', {
        id: id,
        content_type: content_type,
        content_class: 'content',
      });
    }
  };
};
const columns: ProColumns<Content>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    search: false,
    copyable: true,
  },
  {
    title: '标题',
    dataIndex: 'title',
    tooltip: '标题',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '简介',
    dataIndex: 'desc_text',
  },
  {
    title: '封面',
    dataIndex: 'img_url',
    search: false,
    width: '20%',
    render: (_, record) => <Image width={'80%'} src={record.img_url} />,
  },
  {
    title: '小程序路径',
    dataIndex: 'path',
    render: (_, record) => <Tag color="blue">{record.path}</Tag>,
  },
  {
    title: '内容类型',
    dataIndex: 'content_type',
    filters: true,
    onFilter: true,
    valueType: 'select',
    width: '10%',
    valueEnum: {
      1: {
        text: '富文本',
        status: 'Error',
      },
      2: {
        text: '图片',
        status: 'Success',
        disabled: true,
      },
    },
    render: (_, record) => (
      <Space>
        {record.content_type == 1 ? (
          <Tag color="geekblue">富文本</Tag>
        ) : (
          <Tag color="cyan">图片</Tag>
        )}
      </Space>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button
        size={'small'}
        onClick={Goto(record.id, record.content_type)}
        type={'link'}
        key={'edit'}
      >
        查看/编辑
      </Button>,
    ],
  },
];
export default () => {
  let pageSize = 5; //每页多少条
  return (
    <>
      <ProTable<Content>
        columns={columns}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        request={async (params = {}, sort, filter) => {
          params.content_class = 'content';
          const data = await Admin.getContents(params);
          return {
            data: data.list,
            success: true,
            total: data.total,
          };
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {},
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: pageSize,
        }}
        dateFormatter="string"
        headerTitle="首页内容列表"
        revalidateOnFocus={true}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </>
  );
};
