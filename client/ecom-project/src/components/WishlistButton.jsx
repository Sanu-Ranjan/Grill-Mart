import { useRef, useState } from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useBusyState } from "../hooks/useBusyState";

export const WishListButton = ({ product, text }) => {
  const { wishlistSet, deleteItem, addItem, loading } = useWishlist();
  const isWishlisted = wishlistSet.has(product?._id);
  const { isBusy, setIsBusy } = useBusyState(loading);

  const handleDelete = async () => {
    setIsBusy(true);
    try {
      await deleteItem(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = async () => {
    setIsBusy(true);
    try {
      await addItem(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary btn-sm px-3 "
        onClick={() => (isWishlisted ? handleDelete() : handleAddItem())}
        disabled={isBusy}
      >
        <>
          {isWishlisted ? (
            <i className="bi-heart-fill text-danger"></i>
          ) : (
            <i className="bi bi-heart"></i>
          )}
        </>
      </button>
    </>
  );
};
