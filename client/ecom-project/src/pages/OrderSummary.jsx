import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES } from "../constants";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/NavBar";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { OredredProductCard } from "../components/OrderedProductCard";

export const OrderSummary = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/orders/id/${orderId}`,
  );

  const order = data?.data?.order;
  const { address, items, totalAmount, deliveryCharge, placedAt, _id } =
    order ?? {};

  const isJustPlaced = placedAt
    ? new Date() - new Date(placedAt) < 60 * 1000
    : false;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Navbar />
      <div className="container py-4" style={{ maxWidth: "700px" }}>
        {/* success banner */}

        <div
          className="rounded-3 p-4 mb-4 text-center"
          style={{ background: "#fff8e1" }}
        >
          {isJustPlaced && (
            <>
              {" "}
              <div style={{ fontSize: "40px" }}>✅</div>
              <h5 className="fw-bold mt-2 mb-1">Order Placed Successfully!</h5>
            </>
          )}
          <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
            Order #{_id?.slice(-6).toUpperCase()} ·{" "}
            {new Date(placedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* order items */}
        <div className="card border shadow-sm p-4 mb-3">
          <h6 className="fw-bold mb-3">Items Ordered</h6>
          <hr />
          <div className="d-flex flex-column gap-3">
            {items?.map((item) => (
              <OredredProductCard item={item} key={item._id} />
            ))}
          </div>
        </div>

        {/* price details */}
        <div className="card border shadow-sm p-4 mb-3">
          <h6 className="fw-bold mb-3">Price Details</h6>
          <hr />
          <div
            className="d-flex justify-content-between mb-2"
            style={{ fontSize: "14px" }}
          >
            <span>Subtotal</span>
            <span>₹{totalAmount - deliveryCharge}</span>
          </div>
          <div
            className="d-flex justify-content-between mb-3"
            style={{ fontSize: "14px" }}
          >
            <span>Delivery Charges</span>
            <span className={deliveryCharge === 0 ? "text-success" : ""}>
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* delivery address */}
        <div className="card border shadow-sm p-4 mb-4">
          <h6 className="fw-bold mb-3">Delivery Address</h6>
          <hr />
          <div className="d-flex align-items-center gap-2 mb-1">
            <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
              {address?.name}
            </p>
            <span
              className="badge bg-warning text-dark"
              style={{ fontSize: "10px" }}
            >
              {address?.type}
            </span>
          </div>
          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            {address?.addressLine}
          </p>
          <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
            {address?.city}, {address?.state} — {address?.pincode}
          </p>
          <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
            Phone: {address?.phone}
          </p>
        </div>

        {/* actions */}
        <div className="d-flex gap-3">
          <button
            className="btn btn-warning fw-semibold flex-grow-1"
            onClick={() => navigate(ROUTES.PRODUCTS)}
          >
            Continue Shopping
          </button>
          <button
            className="btn btn-outline-secondary fw-semibold flex-grow-1"
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            View All Orders
          </button>
        </div>
      </div>
    </>
  );
};
