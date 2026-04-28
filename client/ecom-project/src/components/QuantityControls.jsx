import { useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";

export const QuantityControls = ({ product, btnWarning = true }) => {
  const [isBusy, setIsBusy] = useState(false);
  const trackState = useRef([]);
  const { addToCart, itemMap, decQty, removeItem, loading } = useCart();
  const isInCart = itemMap.has(product?._id);
  const quantity = itemMap.get(product?._id);

  if (trackState.current.length === 0 && isBusy && loading)
    trackState.current.push(1);
  if (trackState.current.length === 1 && isBusy && !loading) {
    setIsBusy(false);
    trackState.current = [];
  }

  const handleAddtoCart = async () => {
    setIsBusy(true);
    try {
      await addToCart(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async () => {
    setIsBusy(true);
    try {
      await removeItem(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handledecItem = async () => {
    setIsBusy(true);
    try {
      await decQty(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isInCart ? (
        <div className="d-flex align-items-center justify-content-between gap-2">
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={() => quantity > 1 && decQty(product?._id)}
            disabled={isBusy}
          >
            -
          </button>
          <span className="fw-semibold">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={handleAddtoCart}
            disabled={isBusy}
          >
            +
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleRemoveItem}
            disabled={isBusy}
          >
            {isBusy ? (
              <span className="spinner-border spinner-border-sm me-2" />
            ) : (
              "Remove from cart"
            )}
          </button>
        </div>
      ) : (
        <button
          className={`btn btn-${btnWarning ? "warning" : "outline-secondary"} btn-sm fw-semibold`}
          style={{ width: "100%", height: "100%" }}
          disabled={isBusy}
          onClick={handleAddtoCart}
        >
          {isBusy ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : (
            "Add to Cart"
          )}
        </button>
      )}
    </>
  );
};
