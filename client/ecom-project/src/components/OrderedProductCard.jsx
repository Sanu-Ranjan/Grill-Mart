import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";

export const OredredProductCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      key={item._id}
      className="d-flex gap-3 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(ROUTES.PRODUCT_DETAIL(item.productId._id))}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "70px",
          height: "70px",
          objectFit: "contain",
          background: "#f8f8f8",
          borderRadius: "8px",
        }}
      />
      <div className="flex-grow-1">
        <p className="fw-semibold mb-1" style={{ fontSize: "14px" }}>
          {item.name}
        </p>
        <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
          ₹{item.price} × {item.quantity}
        </p>
      </div>
      <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>
        ₹{item.price * item.quantity}
      </p>
    </div>
  );
};
