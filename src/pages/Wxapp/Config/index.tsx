import { FooterToolbar, ProForm, ProFormUploadButton } from '@ant-design/pro-components';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
export default () => {
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        console.log(file);
    };

    return (
        <>
            <ProForm
                submitter={{
                    render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                }}
                onFinish={async (values) => console.log(values)}
            >
                <ProForm.Group title="登录页">
                    <ProFormUploadButton
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        name={['backgroundImg']}
                        listType="picture-card"
                        fieldProps={
                            {
                                // onPreview: handlePreview,
                            }
                        }
                    />
                </ProForm.Group>
            </ProForm>
        </>
    );
};
