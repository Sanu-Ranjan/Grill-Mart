import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/index";
import { putData } from "../utils/putData";
import { postData } from "../utils/postData";
import { toast } from "react-toastify";

const CartContext = createContext();
const getCartUrl = `${API_BASE_URL}/cart`;

export const CartProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch(getCartUrl, refresh);
  const cart = data?.data?.cart?.[0];
  const cartId = cart?._id;
  const items = cart?.items ?? [];
  const itemsRef = useRef(items);

  const totalQuantity =
    items?.reduce((acc, { quantity }) => acc + quantity, 0) ?? 0;

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const itemMap = new Map();
  if (items.length > 0) {
    items.forEach(({ product, quantity }) => {
      itemMap.set(product._id, quantity);
    });
  }

  const toRefFormat = (list) =>
    list.map((item) => ({
      product: { _id: item.product },
      quantity: item.quantity,
    }));

  const toRequestFormat = (list) =>
    list.map(({ product, quantity }) => ({
      product: product._id,
      quantity,
    }));

  const addToCart = async (id) => {
    const currentItems = itemsRef.current;
    const previousItems = currentItems;

    let found = false;
    const newItemList = currentItems.map(({ product, quantity }) => {
      const temp = {
        product: product._id,
        quantity: quantity,
      };

      if (product._id == id) {
        found = true;
        temp.quantity++;
      }
      return temp;
    });

    if (!found) newItemList.push({ product: id, quantity: 1 });

    itemsRef.current = toRefFormat(newItemList);

    const body = {
      items: newItemList,
    };

    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;

    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) {
        itemsRef.current = previousItems;
        return console.log("error updating cart : ", error);
      }

      if (data.success == true) {
        setRefresh((prev) => !prev);
        toast("Item added to cart");
      } else {
        itemsRef.current = previousItems;
        console.log("Error updating cart : ", data.message);
      }
    } catch (error) {
      itemsRef.current = previousItems;
      console.log("Error: ", error);
    }
  };

  const decQty = async (id) => {
    const currentItems = itemsRef.current;
    const previousItems = currentItems;

    const newItemList = currentItems.map(({ product, quantity }) => {
      const temp = {
        product: product._id,
        quantity: quantity,
      };
      if (product._id == id) {
        temp.quantity--;
      }
      return temp;
    });

    itemsRef.current = toRefFormat(newItemList);

    const body = {
      items: newItemList,
    };

    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;

    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) {
        itemsRef.current = previousItems;
        return console.log("error updating cart : ", error);
      }
      if (data.success == true) {
        setRefresh((prev) => !prev);
        toast("Item removed from cart");
      } else {
        itemsRef.current = previousItems;
        console.log("Error updating cart : ", data.message);
      }
    } catch (error) {
      itemsRef.current = previousItems;
      console.log("Error: ", error);
    }
  };

  const removeItem = async (id) => {
    const currentItems = itemsRef.current;
    const previousItems = currentItems;

    const newItemList = toRequestFormat(currentItems).filter(
      ({ product }) => id != product,
    );

    itemsRef.current = toRefFormat(newItemList);

    const body = {
      items: newItemList,
    };

    const updateCartUrl = `${API_BASE_URL}/cart/${cartId}`;

    try {
      const { data, error } = await putData(updateCartUrl, body);
      if (error) {
        itemsRef.current = previousItems;
        return console.log("error updating cart : ", error);
      }
      if (data.success == true) {
        setRefresh((prev) => !prev);
        toast("Item deleted from Cart");
      } else {
        itemsRef.current = previousItems;
        console.log("Error updating cart : ", data.message);
      }
    } catch (error) {
      itemsRef.current = previousItems;
      console.log("Error: ", error);
    }
  };

  const emptyCart = async () => {
    const previousItems = itemsRef.current;
    itemsRef.current = [];

    const putCartUrl = `${API_BASE_URL}/cart/${cartId}`;
    const body = {
      items: [],
    };
    try {
      const { data, error } = await putData(putCartUrl, body);
      if (error) {
        itemsRef.current = previousItems;
        return console.log("Error emptying Cart : ", error);
      }
      if (data.success === true) {
        setRefresh((prev) => !prev);
      } else {
        itemsRef.current = previousItems;
        console.log("Error emptying cart : ", data.message);
      }
    } catch (error) {
      itemsRef.current = previousItems;
      console.log("Error: ", error);
    }
  };

  console.log("items:", items);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        items,
        loading,
        error,
        itemMap,
        totalQuantity,
        addToCart,
        decQty,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
