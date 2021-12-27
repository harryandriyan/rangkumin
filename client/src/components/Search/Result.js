import React from 'react'
import { Table, Tag } from 'antd';

const SearchResult = ({ documents }) => {

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
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={documents} 
    />
  );
}

export default SearchResult;