import { useBusyState } from "../hooks/useBusyState";

export const CartItemBtns = ({
  addItem,
  addToCart,
  removeItem,
  decQty,
  loading,
  quantity,
  product,
}) => {
  const { isBusy, setIsBusy } = useBusyState(loading);

  const handleAddtoCart = async (id) => {
    setIsBusy(true);
    try {
      await addToCart(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (id) => {
    setIsBusy(true);
    try {
      await removeItem(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecItem = async (id) => {
    setIsBusy(true);
    try {
      await decQty(id);
    } catch (error) {
      console.log(error);
    }
  };

  const moveToWishlist = async (id) => {
    setIsBusy(true);
    try {
      await addItem(id);
      await removeItem(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 mb-3">
        <button
          className="btn btn-outline-secondary btn-sm px-2 py-0"
          onClick={() => quantity > 1 && handleDecItem(product._id)}
          disabled={isBusy}
        >
          −
        </button>
        <span className="fw-semibold">{quantity}</span>
        <button
          className="btn btn-outline-secondary btn-sm px-2 py-0"
          onClick={() => handleAddtoCart(product._id)}
          disabled={isBusy}
        >
          +
        </button>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => handleRemoveItem(product._id)}
          disabled={isBusy}
        >
          {isBusy ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : (
            "Remove"
          )}
        </button>
        <button
          className="btn btn-outline-warning btn-sm"
          onClick={() => moveToWishlist(product._id)}
          disabled={isBusy}
        >
          {isBusy ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : (
            "Move to wishlist"
          )}
        </button>
      </div>
    </>
  );
};
