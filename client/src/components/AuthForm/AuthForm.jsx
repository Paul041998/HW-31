import "./AuthForm.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/features/auth";

export default function AuthForm() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    dispatch(login({ name: username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <div className="AuthForm">
        <span>Welcome, {user?.name}</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <form className="AuthForm" onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
      />
      <button type="submit" className="primary">
        Login
      </button>
    </form>
  );
}
