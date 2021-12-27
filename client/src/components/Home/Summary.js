import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import { FilePdfOutlined, FileSearchOutlined, FileSyncOutlined } from '@ant-design/icons'
import { API } from '../../helpers/api';

const Summary = () => {
  const [summary, setSumary] = useState();
  const [loading, setLoading] = useState(true);

  const fetchSummary = value => {
    const url = `/api/search/summary`;
    API(
      { endpoint: url, method: 'GET' }
    ).then(res => {
      setSumary(res);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered hoverable loading={loading} style={{ background: '#00B060', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FilePdfOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  {summary?.countDoc[0]?.count}
                </div>
                Total Dokumen
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable loading={loading} style={{ background: '#FF9000', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FileSyncOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  {summary?.countLog[0]?.count}
                </div>
                Total Pencarian
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered hoverable loading={loading} style={{ background: '#3590ff', color: '#fff' }}>
            <div style={{ display: 'flex' }}>
              <FileSearchOutlined style={{ fontSize: '84px' }} />
              <div>
                <div style={{ fontSize: '40px' }}>
                  {summary?.countUniqueLog}
                </div>
                Pencarian unik
              </div>
            </div>
          </Card>
        </Col>
      </Row>
  )
}

export default Summary