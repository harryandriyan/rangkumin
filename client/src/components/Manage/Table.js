import React from 'react'
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: '#',
    dataIndex: 'key',
    key: 'no',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Fakultas',
    dataIndex: 'fakultas',
    key: 'fakultas',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = 'green';
          if (tag === 'tf-idf') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
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
  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default TableComponent;