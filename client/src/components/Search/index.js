import React, { useState } from 'react'
import { Row, Col, Input } from 'antd'
import TableComponent from '../Manage/Table';
const { Search } = Input;

const SearchPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const onSearch = value => console.log(value);

  return (
    <div>
      <h2>Cari dokumen dengan kata kunci</h2>
      <Row>
        <Col span={24}>
          <Search
            placeholder="masukan kata kunci, misal: penyakit, kucing"
            allowClear
            enterButton="Cari"
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <h3>Hasil Pencarian</h3>
          <TableComponent />
        </Col>
      </Row>
    </div>
  )
}

export default SearchPage