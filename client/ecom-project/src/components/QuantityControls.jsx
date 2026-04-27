import { useCart } from "../contexts/CartContext";

export const QuantityControls = ({ product, btnWarning = true }) => {
  const { addToCart, itemMap, decQty, removeItem } = useCart();
  const isInCart = itemMap.has(product?._id);
  const quantity = itemMap.get(product?._id);
  return (
    <>
      {isInCart ? (
        <div className="d-flex align-items-center justify-content-between gap-2">
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={() => quantity > 1 && decQty(product?._id)}
          >
            −
          </button>
          <span className="fw-semibold">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={() => addToCart(product?._id)}
          >
            +
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => removeItem(product?._id)}
          >
            Remove from cart
          </button>
        </div>
      ) : (
        <button
          className={`btn btn-${btnWarning ? "warning" : "outline-secondary"} btn-sm fw-semibold`}
          style={{ width: "100%", height: "100%" }}
          onClick={() => addToCart(product?._id)}
        >
          Add to Cart
        </button>
      )}
    </>
  );
};
