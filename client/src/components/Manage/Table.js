import React, { useState, useEffect } from 'react'
import { Table, Tag, Modal, Popconfirm, Descriptions } from 'antd';
import ShowMoreText from "react-show-more-text";
import { API } from '../../helpers/api';

const TableComponent = ({ showOnly = false }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeRecord, setActiveRecord] = useState();

  const tokens = JSON.parse(localStorage.getItem("tokens"));

  const fetchDocuments = ({ current, pageSize }) => {
    const limitSize = showOnly ? showOnly : pageSize;
    const url = `/api/documents?page=${current}&size=${limitSize}`;
    API(
      { endpoint: url, method: 'GET' }
    ).then(res => {
      if (res.documents.length > 0) {
        setDocuments(res.documents);
        setLoading(false);
        if (!showOnly) {
          setPagination({
            ...pagination,
            total: res.totalItems,
            current: res.currentPage,
          });
        }
      }
    });
  }

  const handlePageChange = (paginationParam) => {
    fetchDocuments(paginationParam);
    setPagination(paginationParam)
  };

  const handleDelete = (id) => {
    API(
      { endpoint: `/api/document/${id}`, method: 'DELETE' }, tokens
    ).then(res => {
      if (res.status === 200) {
        fetchDocuments(pagination);
      }
    });
  }

  const seeDetail = (record) => {
    setIsModalVisible(true);
    setActiveRecord(record);
  }

  const columns = [
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      render: (text, record) => (
        <a onClick={() => seeDetail(record)}>
          {text}
        </a>
      ),
    },
    {
      title: 'Tahun',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Fakultas',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags, record) => {
        const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

        return (
          <>
            {tags.map((tag, index) => (
              <Tag color={colors[(index + record.id) % colors.length]} key={tag.word}>
                {tag.word}
              </Tag>
            ))}
          </>
        )
      },
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        if (tokens) {
          return (
            <Popconfirm title="Yakin akan menghapus dokumen ini?" onConfirm={() => handleDelete(record.id)}>
              <a>Hapus</a>
            </Popconfirm>
          )
        }
      },
    },
  ];

  useEffect(() => {
    fetchDocuments(pagination);
  }, []);

  const colorTags = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={documents} 
        pagination={pagination}
        loading={loading}
        onChange={handlePageChange}
      />
      <Modal title="Detail Dokumen" width={960} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <Descriptions title="" bordered>
          <Descriptions.Item label="Judul" span={3}>{activeRecord?.title}</Descriptions.Item>
          <Descriptions.Item label="Fakultas" span={3}>{activeRecord?.faculty}</Descriptions.Item>
          <Descriptions.Item label="Tahun" span={3}>{activeRecord?.year}</Descriptions.Item>
          <Descriptions.Item label="Topik (tags)" span={3}>
            {activeRecord?.tags?.map((tag, index) => (
              <Tag color={colorTags[(index + activeRecord?.id) % colorTags.length]} key={tag.word}>
                {tag.word}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Detail Teks" span={3}>
            <ShowMoreText
              lines={3}
              more="Lihat semua"
              less="Lihat sedikit"
              expanded={false}
              width={880}
              truncatedEndingComponent={"... "}
            >
              <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{__html: activeRecord?.text?.replace('\n', '<br />')}} />
            </ShowMoreText>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
}

export default TableComponent;