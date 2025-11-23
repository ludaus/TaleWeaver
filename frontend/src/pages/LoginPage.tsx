// TaleWeaver frontend - AGPLv3
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { apiFetch } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setAuth(res.token, res.user.email);
      navigate("/projects");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="container">
      <h1>Welcome to TaleWeaver</h1>
      <form className="card" onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
