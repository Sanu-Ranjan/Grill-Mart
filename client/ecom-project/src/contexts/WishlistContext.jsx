import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { postData } from "../utils/postData";
import { deleteData } from "../utils/deleteData";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const posturl = `${API_BASE_URL}${API_ROUTES.wishlist.addItem}`;
const deleteUrl = `${API_BASE_URL}${API_ROUTES.wishlist.deleteItem}`;
const getWishlistUrl = `${API_BASE_URL}${API_ROUTES.wishlist.get}`;

const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const { token, requireAuth } = useAuth();

  const { data, loading, error } = useFetch(
    token ? getWishlistUrl : null,
    refresh,
  );

  const wishlist = data?.data?.wishlist;
  const addItem = async (productId) => {
    if (!requireAuth()) return;
    const { data, error } = await postData(posturl, { productId });
    if (error) {
      console.log(error);
    } else if (data?.success) {
      setRefresh((prev) => !prev);
      toast("Item added to Wish List");
    }
  };

  const deleteItem = async (productId) => {
    if (!requireAuth()) return;
    const { data, error } = await deleteData(deleteUrl, { productId });
    if (error) {
      console.log(error);
    } else if (data?.success) {
      setRefresh((prev) => !prev);
      toast("Item removed from Wish List");
    }
  };

  const wishlistSet = new Set();
  const items = wishlist?.items ?? [];
  items.forEach((element) => {
    wishlistSet.add(element._id);
  });

  return (
    <WishListContext.Provider
      value={{ data, loading, error, addItem, deleteItem, wishlistSet }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
