import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { login } from "../helpers/api";

export default function Login(props) {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const referer = history?.location?.state?.referer || "/";

  const postLogin = (e) => {
    e.preventDefault();
    login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          setAuthTokens(response.accessToken);
          setLoggedIn(true);
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
    <main className="loginMain">
      <form onSubmit={postLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>
        <button type="submit"> Login </button>
      </form>
    </main>
  );

}
