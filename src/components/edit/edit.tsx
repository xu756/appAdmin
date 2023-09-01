import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import {
  DomEditor,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig, SlateElement,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useEffect, useState } from 'react';

interface Prop {
  html: string;
  onChange: (html: string) => void;
}

type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}
export default (prop: Prop) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'headerSelect',
      'blockquote',
      '|',
      'bold',
      'italic',
      'underline',
      'through',  'sup', 'sub','clearStyle',
        '|',
        'fontSize',
      'color',
        'bgColor',
        '|',
      'bulletedList',
        'numberedList',
        '|',
      {
        iconSvg:`<svg t="1693502366299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5131" width="32" height="32"><path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="5132"></path></svg>`,
        key:'group-justify',
        menuKeys:['justifyLeft','justifyCenter','justifyRight'],
        title:'对齐方式',
      },
      {
        iconSvg:`<svg t="1693502540354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6156" width="32" height="32"><path d="M128 896h768v-85.333H128V896z m0-554.667v341.334L298.667 512 128 341.333z m341.333 384H896V640H469.333v85.333zM128 128v85.333h768V128H128z m341.333 256H896v-85.333H469.333V384z m0 170.667H896v-85.334H469.333v85.334z" p-id="6157"></path></svg>`,
        key:'group-indent',
        menuKeys:['indent','delIndent'],
        title:'缩进',
      },
      {
        iconSvg:`<svg t="1693503060566" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7395" width="32" height="32"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="7396"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="7397"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="7398"></path></svg>`,
        key:'group-image',
        menuKeys:['insertImage','uploadImage'],
        title:'图片',
      },
        '|',
        'undo',
        'redo',
        '|',
        'fullScreen',



    ],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
    MENU_CONF:{
      'uploadImage':{
        server:'/api/app/public/upload',
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'file',

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        customInsert(res: any, insertFn: any) {  // TS 语法
          insertFn(res.data.url, res.data.alt, res.data.href)
        },
        onInsertedImage(imageNode: ImageElement | null) {  // TS 语法
          // onInsertedImage(imageNode) {                    // JS 语法
          if (imageNode == null) return

          const { src, alt, url, href } = imageNode
        },

        // 跨域是否传递 cookie ，默认为 false
        withCredentials: true,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒

      }

    }

  };

  // 及时销毁 editor ，重要！
  useEffect(() => {

    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={prop.html}
          onCreated={setEditor}
          onChange={(editor) => prop.onChange(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
};
