import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Row, Col } from 'antd';
import PrivateRoute from "./PrivateRoute";
import Home from './Home/index'
import Login from './Login'
import Manage from './Manage'
import Navbar from './Navbar'

import 'antd/dist/antd.css';
import '../styles/App.css';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Row className="view-width">
      <Col className="container" span={24}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/manage" component={Manage} />
          {/* <Route exact path="/users/:userId" component={UserProfile} /> */}
        </Switch>
      </Col>
    </Row>
  </BrowserRouter>


)


export default App