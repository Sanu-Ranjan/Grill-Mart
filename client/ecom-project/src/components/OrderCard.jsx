import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
export const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={order._id}
        className="border rounded-3 p-3"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(ROUTES.ORDER_SUMMARY(order._id))}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="fw-semibold mb-0" style={{ fontSize: "13px" }}>
            Order #{order._id.slice(-6).toUpperCase()}
          </p>
          <span
            className="badge bg-warning text-dark"
            style={{ fontSize: "11px" }}
          >
            Placed
          </span>
        </div>
        <div className="d-flex flex-column gap-1 mb-2">
          {order.items.map((item) => (
            <p
              key={item._id}
              className="text-muted mb-0"
              style={{ fontSize: "12px" }}
            >
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bold mb-0" style={{ fontSize: "14px" }}>
            ₹{order.totalAmount}
          </p>
          <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
            {new Date(order.placedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </>
  );
};
