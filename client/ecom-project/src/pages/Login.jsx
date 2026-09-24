import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants/index";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isBusy, setIsBusy] = useState(false);

  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || ROUTES.HOME;

  if (token) return <Navigate to={from} replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const data = await login(form.email, form.password);
    setIsBusy(false);

    if (!data.success) return toast(data.message);
    toast("Logged in");
    navigate(from, { replace: true });
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "420px" }}>
        <div className="card border shadow-sm p-4">
          <h4 className="fw-bold mb-1">Login</h4>
          <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
            Welcome back to GrillMart
          </p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn btn-warning fw-semibold"
              disabled={isBusy}
            >
              {isBusy ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-muted mt-3 mb-0" style={{ fontSize: "13px" }}>
            New here?{" "}
            <Link to={ROUTES.SIGNUP} state={location.state}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
