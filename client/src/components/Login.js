import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { login } from "../helpers/api";
import { Form, Input, Button } from 'antd';

export default function Login(props) {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const referer = history?.location?.state?.referer || "/";

  const postLogin = (values) => {
    const { username, password } = values;
    login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          setAuthTokens(response.accessToken);
          setLoggedIn(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error(response.reason);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoggedIn) return <Redirect to={referer} />;

  return (
    <Form
      name="login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={postLogin}
      onFinishFailed={() => window.alert("Login failed")}
      autoComplete="off"
      style={{ width: '500px', margin: '0 auto' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

}
