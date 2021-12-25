import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import TableComponent from './Table'
import AddForm from './AddForm';

const Home = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <h2>Manage</h2>
      {showAdd && (
        <Row>
          <Col span={24}>
            <h3>Tambah Dokumen</h3>
            <AddForm />
          </Col>
        </Row>
      )}
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <h3>Dokumen List</h3>
          <Button type="secondary" style={{ marginBottom: '20px' }} onClick={() => setShowAdd(true)}>Tambah Dokumen</Button>
          <TableComponent />
        </Col>
      </Row>
    </div>
  )
}

export default Home