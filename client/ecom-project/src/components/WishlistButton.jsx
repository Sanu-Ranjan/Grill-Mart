import { useWishlist } from "../contexts/WishlistContext";
import { ToastAlert } from "./ToastAlert";

export const WishListButton = ({ product, text }) => {
  const { wishlistSet, deleteItem, addItem } = useWishlist();
  const isWishlisted = wishlistSet.has(product?._id);

  return (
    <>
      <button
        className="btn btn-outline-secondary btn-sm px-3 "
        onClick={() =>
          isWishlisted ? deleteItem(product?._id) : addItem(product?._id)
        }
      >
        {isWishlisted ? (
          <i className="bi-heart-fill text-danger"></i>
        ) : (
          <i className="bi bi-heart"></i>
        )}
      </button>
    </>
  );
};
