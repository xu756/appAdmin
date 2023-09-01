import Edit from '@/components/edit/edit';
import { PathModel } from '@/components/path/pathModel';
import Content from '@/models/content';
import { PathState } from '@/models/path';
import Admin from '@/services/admin';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Affix, Button, Card, Image, Space, Upload, message } from 'antd';
import { useRef, useState } from 'react';
import './content.scss';

export default () => {
  const [content, setContent] = useState<Content>();
  const formRef = useRef<ProFormInstance>();
  const [messageApi, contextHolder] = message.useMessage();
    const [ImgUrl, setImgUrl] = useState<string>('');
  const [ContentText, setContentText] = useState<string>('');

  const onFinish = async (values: Content) => {
    const res = await Admin.editContent(
      formRef.current?.getFieldFormatValueObject?.() as Content,
    );

    console.log(res);
  };
  const ContentConv = (content: string) => {
    return content.replace(/<img[^>]*>/gi, function (match, _) {
      return match.replace(
        /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
        'style="max-width:100%;height:auto;"',
      ); // 替换style
    });
  };
  return (
    <div className={'content'}>
      {contextHolder}
      <ProForm<Content>
        className={'content-from'}
        onFinish={onFinish}
        formRef={formRef}
        request={async () => {
          let state = history.location.state as PathState;
          const data = await Admin.getContent(state.id, state.content_class);
          setContent(data);
            setImgUrl(data.img_url)
          setContentText(data.content_text);
          return data;
        }}
        autoFocusFirstInput
      >
        <ProForm.Group title={'内容新建编辑'}>
          <ProFormDigit
            width="xs"
            name="id"
            label="ID"
            disabled
            tooltip={'内容ID 不能修改'}
          />
          <ProFormSelect
            disabled
            width={'xs'}
            name="content_type"
            label="内容类型"
            options={[
              {
                value: 1,
                label: '富文本',
              },
              {
                value: 2,
                label: '图片',
              },
            ]}
          />
          <ProFormText
            width="lg"
            name="title"
            required
            label="内容标题"
            tooltip="最长为 24 位"
            placeholder="请输入标题"
            rules={[{ required: true, message: '这是必填项' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProForm.Item
            label={'封面图片'}
            tooltip={'轮播图设置这个'}
            valueType={'image'}
            name={'img_url'}
          >
            <Space>
              <Image
                className={'content-img'}
                src={ImgUrl}
              />
            </Space>

            <Space>
              <Upload
                name="file"
                action="/api/app/public/uploadimg?path=content"
                onChange={(info) => {
                  if (info.file.status !== 'uploading') {
                  }
                  if (info.file.status === 'done') {
                    messageApi.success(`${info.file.name} 上传成功`);
                    formRef.current?.setFieldsValue({
                      img_url: info.file.response.data.url,
                    });
                    setImgUrl(info.file.response.data.url)
                  } else if (info.file.status === 'error') {
                    messageApi.error(`${info.file.name} 上传失败`);
                  }
                }}
              >
                <Button>上传图片</Button>
              </Upload>
            </Space>
          </ProForm.Item>
          <ProForm.Item>
            <ProFormTextArea
              width={'lg'}
              name="desc_text"
              label="简介"
              placeholder="请输入简介"
            />
          </ProForm.Item>
        </ProForm.Group>
        <ProForm.Item label={'内容'} tooltip={'和小程序内部样式一样'}>
          <Edit
            html={ContentText}
            onChange={(html) => {
              setContentText(html);
              formRef.current?.setFieldsValue({
                content_text: html,
              });
            }}
          />
        </ProForm.Item>
      </ProForm>
      <Affix className={'content-view'} offsetTop={120}>
        <Card title="小程序端内容效果" bordered={false}>
          <div
            style={{
              width: '100%',
              height: '700px',
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{
              __html: ContentConv(ContentText),
            }}
          ></div>
        </Card>
      </Affix>
      <PathModel
        title={'找不到富文本内容'}
        open={history.location.state == undefined}
      />
    </div>
  );
};
