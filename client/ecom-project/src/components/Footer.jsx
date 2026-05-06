import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "#1a1a1a" }} className="mt-5 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <h5 className="fw-bold text-white mb-2">GrillMart 🔥</h5>
            <p className="text-secondary" style={{ fontSize: "13px" }}>
              Premium grills, tandoors & bakeware — built for real cooking.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <p
              className="fw-semibold text-white mb-3"
              style={{ fontSize: "13px" }}
            >
              Shop
            </p>
            <ul className="list-unstyled">
              {[
                { label: "All Products", route: ROUTES.PRODUCTS },
                { label: "Wishlist", route: ROUTES.WISHLIST },
                { label: "Cart", route: ROUTES.CART },
              ].map(({ label, route }) => (
                <li key={label} className="mb-2">
                  <span
                    className="text-secondary"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    onClick={() => navigate(route)}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <p
              className="fw-semibold text-white mb-3"
              style={{ fontSize: "13px" }}
            >
              Account
            </p>
            <ul className="list-unstyled">
              {[
                { label: "Profile", route: ROUTES.PROFILE },
                { label: "Orders", route: ROUTES.PROFILE },
              ].map(({ label, route }) => (
                <li key={label} className="mb-2">
                  <span
                    className="text-secondary"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    onClick={() => navigate(route)}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <p
              className="fw-semibold text-white mb-3"
              style={{ fontSize: "13px" }}
            >
              Contact
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>
              <i className="bi bi-envelope me-2"></i>
              support@grillmart.com
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>
              <i className="bi bi-telephone me-2"></i>
              +91 9999999999
            </p>
            <p className="text-secondary mb-3" style={{ fontSize: "13px" }}>
              <i className="bi bi-geo-alt me-2"></i>
              Kolkata, West Bengal, India
            </p>
          </div>
        </div>

        <hr style={{ borderColor: "#333" }} className="my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p className="text-secondary mb-0" style={{ fontSize: "12px" }}>
            © 2026 GrillMart. All rights reserved.
          </p>
          <p className="text-secondary mb-0" style={{ fontSize: "12px" }}>
            Built with React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};
