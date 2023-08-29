import Content from '@/models/content';
import Admin from '@/services/admin';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

const columns: ProColumns<Content>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fieldProps: {
      disabled: false,
    },
    width: '10%',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '简介',
    dataIndex: 'desc_text',
  },
  {
    title: '封面',
    dataIndex: 'img_url',
  },
  {
    title: '小程序路径',
    dataIndex: 'path',
  },
  {
    title: '操作',
    valueType: 'option',
  },
];
export default () => {
  const [dataSource, setDataSource] = useState<readonly Content[]>([]);
  const [total, serTotal] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  const getData = () => {
    Admin.getContents('content', pageNum, pageSize).then((res) => {
      setDataSource(res.list);
      serTotal(res.total);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ProTable<Content>
        columns={columns}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        onReset={getData}
        request={async () => {
          await getData();
          return {
            data: dataSource,
            success: true,
            total: total,
          };
        }}
        dataSource={dataSource}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
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
          onChange: (page) => setPageSize(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
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