import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = (props) => {
  const [activeMenu, setActiveMenu] = useState('');

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
    window.location.reload()
  }

  const token = 'token' //localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')

  return (
    <Menu 
      onClick={(e) => {
        setActiveMenu(e.key);
        props.history.push(`/${e.key}`)
      }} 
      selectedKeys={[activeMenu]} 
      mode="horizontal"
    >
      <Menu.Item key="" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="manage" icon={<AppstoreOutlined />}>
        Manage
      </Menu.Item>
      <div>
        {token && (
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
        )}
      </div>
    </Menu>
  )
}

export default withRouter(Navbar)