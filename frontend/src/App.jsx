import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [regForm, setRegForm] = useState({ username: "", password: "" });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [protectedData, setProtectedData] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setRegForm({ username: "", password: "" });
    } catch {
      setMessage("Server se connect nahi ho paya");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setLoginForm({ username: "", password: "" });
      }
    } catch {
      setMessage("Server se connect nahi ho paya");
    }
  };

  const accessProtected = async () => {
    try {
      const res = await fetch(`${API}/protected`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setProtectedData(data.message);
    } catch {
      setProtectedData("Server se connect nahi ho paya");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProtectedData("");
    setMessage("Logged out");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>JWT Authentication</h1>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={regForm.username}
          onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={regForm.password}
          onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <h2>Protected Route</h2>
      <button onClick={accessProtected} disabled={!token}>
        Access Protected Data
      </button>{" "}
      {token && <button onClick={handleLogout}>Logout</button>}

      {message && <p><b>Status:</b> {message}</p>}
      {protectedData && <p><b>Protected:</b> {protectedData}</p>}
    </div>
  );
}

export default App;
