import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants/index";

export const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isBusy, setIsBusy] = useState(false);

  const { signup, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || ROUTES.HOME;

  if (token) return <Navigate to={from} replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return toast("Password must be at least 6 characters");
    }

    setIsBusy(true);
    const data = await signup(form);
    setIsBusy(false);

    if (!data.success) return toast(data.message);
    toast("Account created");
    navigate(from, { replace: true });
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "420px" }}>
        <div className="card border shadow-sm p-4">
          <h4 className="fw-bold mb-1">Create account</h4>
          <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
            Sign up to save your cart, wishlist and orders
          </p>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              name="phone"
              className="form-control"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password (min 6 characters)"
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
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-muted mt-3 mb-0" style={{ fontSize: "13px" }}>
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} state={location.state}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
