import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, message, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Corpus } from "../../library/index";

const AddForm = () => {
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState();

  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const normFile = (e) => {
    const { name } = e.file;
    const fileName = name.split('..')[0];
    setTitle(fileName);
    form.setFieldsValue({ title: fileName });
    return e && e.fileList;
  };
  
  const draggerConfig = {
    name: 'file',
    multiple: false,
    action: '/api/document/extract',
    accept: '.pdf',
    onChange(info) {
      const { status, response } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} berhasil diupload.`);
        setText(response);

        const corpus = new Corpus(
          ["document"],
          [response]
        );
        setResult(corpus.getTopTermsForDocument("document"));

        setUploaded(true);
      } else if (status === 'error') {
        setUploaded(true);
        setText('');
        message.error(`${info.file.name} gagal diupload.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  console.log('result', result);

  return (
    <Form form={form} onFinish={onFinish}>
      {uploaded ? (
        <React.Fragment>
          <Card 
            type="inner" 
            title={title} 
            extra={<Button danger onClick={() => setUploaded(false)}>Batal</Button>}
            style={{ marginBottom: '20px' }}
          >
            {text}
          </Card>
          <Form.Item name="title" label="Judul" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Tahun" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item style={{ marginTop: '20px', float: 'right' }}>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </React.Fragment>
      ) : (
        <Form.Item>
          <Form.Item name="dragger" valuePropName="pdfFile" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger {...draggerConfig}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Klik atau drag file PDF dokumen</p>
              <p className="ant-upload-hint">File merupakan BAB 1 dari dokumen Skripsi</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      )}
    </Form>
  );
}

export default AddForm;