import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Tag } from 'antd'
import { API } from '../../helpers/api';
import Result from './Result';
const { Search } = Input;

const SearchPage = () => {
  const [searched, setSearched] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [keywords, setKeyword] = useState('');
  const [trending, setTrending] = useState([]);

  const saveSearchLog = (keywords) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    API(
      { endpoint: `/api/search/log`, method: 'POST', data: { keywords } }, tokens
    );
  }

  const onSearch = value => {
    const url = `/api/search?keyword=${value}`;
    setKeyword(value);
    API(
      { endpoint: url, method: 'GET' }
    ).then(res => {
      setNoResult(res.count === 0)
      setDocuments(res.rows);
      setSearched(true);
      if (res.count > 0) {
        saveSearchLog(value);
      }
    });
  }

  const fetchTrending = value => {
    const url = `/api/search/trending`;
    API(
      { endpoint: url, method: 'GET' }
    ).then(res => {
      setTrending(res);
    });
  }

  useEffect(() => {
    fetchTrending();
  }, []);

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
        <Col span={24} style={{ marginTop: '15px' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Trending: </span>
          {trending.map(item => {
            const colors = ['gold', 'lime', 'green', 'cyan', 'geekblue', 'purple'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <Tag 
                color={randomColor} 
                key={item.keyword} 
                style={{ cursor: 'pointer' }} 
                onClick={() => {
                  onSearch(item.keyword);
                  setKeyword(item.keyword);
                }}
              >
                {item.keyword}
              </Tag>
            );
          })}
        </Col>
      </Row>
      {searched && noResult && (
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <h3>Tidak ditemukan hasil</h3>
          </Col>
        </Row>
      )}
      {searched && !noResult && (
        <Row style={{ marginTop: '40px' }}>
          <Col span={24}>
            <h3>Hasil Pencarian dengan keyword</h3>
            <div style={{ marginBottom: '20px' }}>
              {keywords.indexOf(' ') >= 0 ? keywords.split(' ').map((keyword, index) => (
                <Tag key={index} color="blue">{keyword}</Tag>
              )) : <Tag color="blue">{keywords}</Tag>}
            </div>
            <Result documents={documents} />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default SearchPage