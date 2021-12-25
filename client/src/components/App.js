import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Row, Col } from 'antd';
import { AuthContext } from "../context/auth";
import Home from './Home/index'
import Login from './Login'
import Manage from './Manage'
import Navbar from './Navbar'

import 'antd/dist/antd.css';
import '../styles/App.css';

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <Navbar />
        <Row className="top-container">
          <Col className="container" span={24}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/manage" component={Manage} />
            </Switch>
          </Col>
        </Row>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App