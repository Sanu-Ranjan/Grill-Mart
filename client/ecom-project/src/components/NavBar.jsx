import { useNavigate } from "react-router-dom";

import { LoginBtn } from "./LoginBtn";
import { SearchBaar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { WishlistIcon } from "./WishlistIcon";
import { ROUTES } from "../constants/index";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
        <span
          className="order-1 order-sm-1 fw-bold fs-2 fs-sm-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          GrillMart 🏠
        </span>

        <div className="order-3 order-sm-2">
          <SearchBaar />
        </div>

        <div className="order-2 order-sm-3 d-flex align-items-center gap-3">
          <WishlistIcon />

          <CartIcon />
          <span
            className="btn btn-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            <i className="bi bi-person-fill-gear"></i>
          </span>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
