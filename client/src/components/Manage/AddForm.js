import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, message, Card, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ShowMoreText from "react-show-more-text";

import { Corpus } from "../../library/index";
import { API } from '../../helpers/api';

const resultColumn = [
  {
    title: 'Word',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const AddForm = () => {
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState();

  const [form] = Form.useForm();
  const onFinish = values => {
    const { year, title, faculty} = values;
    const tags = result;
    const bodyParam = {year, title, faculty, tags};
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    API(
      { endpoint: '/api/document/add', method: 'POST', data: bodyParam },
      tokens
    ).then(res => {
      if (res.status === 200) {
        message.success('Document added successfully!');
        setUploaded(false);
      }
    });
  };

  const normFile = (e) => {
    const { name } = e.file;
    const fileName = name.replace('.pdf', '');
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
        message.success(`${info.file.name} berhasil diproses.`);
        setText(response);

        const corpus = new Corpus(
          ["document"],
          [response]
        );
        const result = corpus.getTopTermsForDocument("document", 5);
        const formattedResult = result.map(item => {
          return {
            word: item[0],
            value: item[1]
          }
        });

        setResult(formattedResult);

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
            <ShowMoreText
              lines={3}
              more="Lihat semua"
              less="Lihat sedikit"
              expanded={false}
              width={1100}
              truncatedEndingComponent={"... "}
            >
              {text}
            </ShowMoreText>
          </Card>

          <h3>Hasil TF-IDF</h3>
          <Table columns={resultColumn} dataSource={result} />

          <Form.Item name="title" label="Judul" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Tahun" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="faculty" label="Fakultas" rules={[{ required: true }]}>
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