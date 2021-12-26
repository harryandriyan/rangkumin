import React, { useState, useEffect } from 'react'
import { Table, Tag, Space } from 'antd';
import { API } from '../../helpers/api';

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
    render: tags => (
      <Tag color={'green'}>
        sample
      </Tag>
      // <>
      //   {tags.map(tag => {
      //     let color = 'green';
      //     if (tag === 'tf-idf') {
      //       color = 'volcano';
      //     }
      //     return (
      //       <Tag color={color} key={tag}>
      //         {tag.toUpperCase()}
      //       </Tag>
      //     );
      //   })}
      // </>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    title: 'Implementasi Algoritma TF-IDF Pada Pengukuran Kesamaan Dokumen',
    year: 2020,
    fakultas: 'Teknologi Informasi',
    tags: ['tf-idf', 'dokumen'],
  },
  {
    key: '2',
    title: 'Metode term frequency - invers document frequency pada mekanisme pencarian judul skripsi',
    year: 2019,
    fakultas: 'Teknologi Informasi',
    tags: ['tf-idf', 'dokumen', 'skripsi'],
  },
  {
    key: '3',
    title: 'APLIKASI PENENTUAN DOSEN PENGUJI SKRIPSI MENGGUNAKAN METODE TF-IDF DAN VECTOR SPACE MODEL',
    year: 2018,
    fakultas: 'Teknologi Informasi',
    tags: ['tf-idf', 'dokumen', 'vektor'],
  },
];

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
      console.log(res)
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