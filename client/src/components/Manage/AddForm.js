import React, { useState } from 'react'
import { Form, Input, Button, Upload, message, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const AddForm = () => {
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState('');

  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const normFile = (e) => {
    const { name } = e.file;
    console.log('file name', name)
    setTitle(name);
    return e && e.fileList;
  };
  
  const draggerConfig = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    accept: '.pdf',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} berhasil diupload.`);
        setUploaded(true);
      } else if (status === 'error') {
        setUploaded(true);
        message.error(`${info.file.name} gagal diupload.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

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
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of 
            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of 
            the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from 
            sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by 
            Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. 
            The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
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
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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