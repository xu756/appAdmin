import { PathModel } from '@/components/path/pathModel';
import Content from '@/models/content';
import { PathState } from '@/models/path';
import Admin from '@/services/admin';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useRef, useState } from 'react';

export default () => {
  const [content, setContent] = useState<Content>();
  const formRef = useRef<ProFormInstance<Content>>();
  const onFinish = async (values: any) => {
    console.log(values);
  };
  return (
    <>
      <ProForm<Content>
        onFinish={onFinish}
        formRef={formRef}
        request={async () => {
          let state = history.location.state as PathState;
          return await Admin.getContent(state.id, state.content_class);
        }}

      ></ProForm>
      <PathModel
        title={'找不到富文本内容'}
        open={history.location.state == undefined}
      />
    </>
  );
};
