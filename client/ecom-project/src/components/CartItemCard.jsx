import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { CartItemBtns } from "./CartItemBtns";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export const CartItemCard = ({ product, quantity }) => {
  const navigate = useNavigate();
  const { loading, addToCart, decQty, removeItem } = useCart();
  const { addItem } = useWishlist();

  return (
    <div className="card border shadow-sm p-3">
      <div className="d-flex flex-column flex-sm-row gap-3">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            background: "#f8f8f8",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        />

        <div className="flex-grow-1">
          <p
            className="fw-semibold mb-1"
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
          >
            {product.name}
          </p>

          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fw-bold">₹{product.price}</span>
            <span
              className="text-muted text-decoration-line-through"
              style={{ fontSize: "13px" }}
            >
              ₹{product.originalPrice}
            </span>
            <span className="text-success" style={{ fontSize: "13px" }}>
              {product.discount}% off
            </span>
          </div>

          <CartItemBtns
            addItem={addItem}
            addToCart={addToCart}
            removeItem={removeItem}
            decQty={decQty}
            loading={loading}
            product={product}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};
