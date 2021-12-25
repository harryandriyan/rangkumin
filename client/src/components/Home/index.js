import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'antd'
import { FilePdfOutlined, FileSearchOutlined, FileSyncOutlined } from '@ant-design/icons'
import TableComponent from '../Manage/Table'

const Home = () => {
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSummaryLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered hoverable loading={summaryLoading} style={{ background: '#00B060', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FilePdfOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  84
                </div>
                Total Dokumen
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable loading={summaryLoading} style={{ background: '#FF9000', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FileSyncOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  12
                </div>
                Dokumen 1 bulan terakhir
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable loading={summaryLoading} style={{ background: '#E20048', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FileSearchOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  346
                </div>
                Pencarian
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={24}>
          <h3>Dokumen Terbaru</h3>
          <TableComponent />
        </Col>
      </Row>
    </div>
  )
}

export default Home