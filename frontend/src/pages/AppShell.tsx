// TaleWeaver frontend - AGPLv3
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export default function AppShell() {
  const { userEmail, clear } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>TaleWeaver</h2>
        <Link to="/projects">Projects</Link>
        <button
          className="button secondary"
          onClick={() => {
            clear();
            navigate("/login");
          }}
        >
          Logout {userEmail ? `(${userEmail})` : ""}
        </button>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
