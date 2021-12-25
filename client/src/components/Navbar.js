import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

const Navbar = (props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const history = useHistory();

  const handleLogout = () => {
    setAuthTokens();
    localStorage.removeItem("tokens");
    window.location.reload();
  }

  return (
    <Menu 
      onClick={(e) => {
        setActiveMenu(e.key);
        console.log('object', e)
        history.push(`/${e.key}`)
      }} 
      selectedKeys={[activeMenu]} 
      mode="horizontal"
    >
      <Menu.Item key="" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      {authTokens && (
        <Menu.Item key="manage" icon={<AppstoreOutlined />}>
          Manage
        </Menu.Item>
      )}
      <React.Fragment>
        {authTokens ? (
          <Menu.Item 
            key="logout"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{ 
              position: 'absolute',
              right: '60px' 
            }}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item 
            key="login" 
            icon={<LoginOutlined />}
            style={{ 
              position: 'absolute',
              right: '60px' 
            }}
          >
            Login
          </Menu.Item>
        )}
      </React.Fragment>
    </Menu>
  )
}

export default withRouter(Navbar)