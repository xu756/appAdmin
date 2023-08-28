import { useEffect, useRef, useState } from "react";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    EditableProTable,
    useRefFunction,
    ProCard,
    ProFormField,
} from '@ant-design/pro-components';
import Admin from "@/services/admin";
import { NewUUID } from "@/tool";
import { Form } from "antd";

type DataSourceType = {
    id: number;
    name: string;
    code?: string;
    intro?: string;
    created: number;
    creator?: number;
    edited?: number;
    editor?: number;
    level?: number;
    children?: DataSourceType[];
};
const findDepthByCode = (code: string, dataSource: readonly DataSourceType[], depth = 1): number => {
    for (const item of dataSource) {
        if (item.code === code) {
            return depth;
        }
        if (item.children) {
            const childDepth = findDepthByCode(code, item.children, depth + 1);
            if (childDepth !== 0) {
                return childDepth;
            }
        }
    }
    return 0;
};


const loopDataSourceFilter = (
    data: readonly DataSourceType[],
    code: React.Key | undefined,
): DataSourceType[] => {
    console.log(data, code);
    return data
        .map((item) => {
            if (item.code !== code) {
                if (item.children) {
                    const newChildren = loopDataSourceFilter(item.children, code);
                    return {
                        ...item,
                        children: newChildren.length > 0 ? newChildren : undefined,
                    };
                }
                return item;
            }
            return null;
        })
        .filter(Boolean) as DataSourceType[];
};



export default () => {
    useEffect(() => {
        getDataSource();
    }, []);
    const [form] = Form.useForm();
    const [editableCode, setEditableRowCode] = useState<React.Key[]>([]);
    const actionRef = useRef<ActionType>();
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
    const id = 0;
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [ExpandedRowKeys, setExpandedRowKeys] = useState<Array<string>>([]);

    const getDataSource = async () => {
        const data = await Admin.getGroups(id, pageNum, pageSize);
        setDataSource(data.list);
    }
    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '名称',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: '30%',
        }, {
            title: '简介',
            dataIndex: 'intro',
        }, {
            title: '创建时间',
            dataIndex: 'created',
            fieldProps: (form, { rowKey, rowIndex }) => {
                // return {
                //     disabled: true,
                // }
            }
        }, {
            title: '创建人',
            dataIndex: 'creator',
        }, {
            title: '修改时间',
            dataIndex: 'edited',
        }, {
            title: '修改人',
            dataIndex: 'editor',
        }, {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.code || '0');
                    }}
                >
                    编辑
                </a>,
                <a
                    key="delete"
                    onClick={() => {
                        console.log(record);
                        removeRow(record);
                    }}
                >
                    删除
                </a>,
                <a   key="add" onClick={() => addRow(record.level || 3, record.code || '')}>
                    添加子部门
                </a>
            ],
        }
    ]
    // 添加行
    const addRow = (level: number, parentCode: string) => {
        if (parentCode === '0') {
            return;
        }
        if (level > 2) {
            console.log("不能");
            return;
        }
        setExpandedRowKeys([...ExpandedRowKeys, parentCode]);
        var row: DataSourceType = {
            id: 0,
            name: '',
            code: NewUUID(),
            intro: '',
            created: 0,
            creator: 0,
            edited: 0,
            editor: 0,
        }
        actionRef.current?.addEditRecord?.(row, {
            position: 'bottom',
            parentKey: parentCode,
        })
    }
    // 保存行
    const saveRow = async (key: any, record: DataSourceType, originRow: DataSourceType) => {
        console.log(record);
        console.log(originRow);
        console.log(JSON.stringify(record) === JSON.stringify(originRow));
    }
    // 删除行
    const removeRow = useRefFunction((record: DataSourceType) => {
        setDataSource(loopDataSourceFilter(dataSource, record.code));
    });


    return (
        <>
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        addRow(0, '');
                    }}
                    icon={<PlusOutlined />}
                >
                    新建一行
                </Button>
                <Button
                    key="rest"
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    重置表单
                </Button>
            </Space>
            <EditableProTable<DataSourceType>
                expandable={{
                    defaultExpandedRowKeys: ExpandedRowKeys,
                    expandRowByClick: true,
                }}
                rowKey="code"
                headerTitle="可编辑表格"
                recordCreatorProps={false}
                actionRef={actionRef}
                editable={{
                    form,
                    editableKeys: editableCode,
                    onChange: setEditableRowCode,
                    onSave: saveRow,
                }}
                value={dataSource}
                onChange={setDataSource}
                columns={columns}

            ></EditableProTable>

        </>
    )
}