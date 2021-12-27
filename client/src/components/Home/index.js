import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'antd'
import { FilePdfOutlined, FileSearchOutlined, FileSyncOutlined } from '@ant-design/icons'
import TableComponent from '../Manage/Table'
import Summary from './Summary'

const Home = () => {
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSummaryLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="site-card-wrapper">
      <Summary />
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={24}>
          <h3>Dokumen Terbaru</h3>
          <TableComponent showOnly={5} />
        </Col>
      </Row>
    </div>
  )
}

export default Home