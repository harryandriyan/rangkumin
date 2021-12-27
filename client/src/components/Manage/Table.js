import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Popconfirm } from 'antd';
import { API } from '../../helpers/api';

const TableComponent = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchDocuments = async (params = {}) => {
    const url = `/api/documents?page=${pagination.current}&size=${pagination.pageSize}`;
    API(
      { endpoint: url, method: 'GET' }
    ).then(res => {
      if (res.documents.length > 0) {
        setDocuments(res.documents);
        setLoading(false);
        setPagination({...pagination, total: res.totalItems});
      }
    });
  }

  const handlePageChange = (pagination, filters, sorter) => {
    fetchDocuments({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const handleDelete = (id) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    API(
      { endpoint: `/api/document/${id}`, method: 'DELETE' }, tokens
    ).then(res => {
      if (res.status === 200) {
        fetchDocuments();
      }
    });
  }

  const columns = [
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      render: text => <a>{text}</a>,
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
        const tagList = JSON.parse(tags, true);

        return (
          <>
            {tagList.map((tag, index) => (
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
      render: (text, record) => (
        <Popconfirm title="Yakin akan menghapus dokumen ini?" onConfirm={() => handleDelete(record.id)}>
          <a>Hapus</a>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    fetchDocuments({ pagination });
  }, [])

  return (
    <Table 
      columns={columns} 
      dataSource={documents} 
      pagination={pagination}
      loading={loading}
      onChange={handlePageChange}
    />
  );
}

export default TableComponent;