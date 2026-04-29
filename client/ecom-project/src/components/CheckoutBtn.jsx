import { useRef, useState } from "react";
import { postData } from "../utils/postData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { useAddress } from "../contexts/AddressContext";
import { API_BASE_URL, ROUTES } from "../constants";

export const CheckoutBtn = () => {
  const [isBusy, setIsBusy] = useState(false);
  const trackState = useRef([]);
  const navigate = useNavigate();

  const { items, loading, emptyCart } = useCart();

  const { addressData, selectedAddressId } = useAddress();
  const addresses = addressData?.data?.addresses ?? [];
  const selectedAddress = addresses.find(({ _id }) => selectedAddressId == _id);

  if (trackState.current.length === 0 && isBusy && loading)
    trackState.current.push(1);
  if (trackState.current.length === 1 && isBusy && !loading) {
    setIsBusy(false);
    trackState.current = [];
  }

  const placeOrder = (items) => {
    const orderItems = items.map(({ product, quantity }) => ({
      productId: product._id,
      quantity: quantity,
    }));

    if (!selectedAddress) return toast("Please Select an address first");

    const { name, phone, pincode, city, state, addressLine, type } =
      selectedAddress;

    const orderAddress = {
      name: name,
      phone: phone,
      pincode: pincode,
      city: city,
      state: state,
      addressLine: addressLine,
      type: type,
    };

    const body = { items: orderItems, address: orderAddress };
    (async () => {
      setIsBusy(true);
      const { data, error } = await postData(`${API_BASE_URL}/orders`, body);
      if (error) return console.log("Error occoured placing order : ", error);
      if (data.success === true) {
        await emptyCart();
        navigate(ROUTES.ORDER_SUMMARY(data.data.order._id));
      }
    })();
  };

  return (
    <button
      className="btn btn-warning fw-semibold w-100"
      onClick={() => placeOrder(items)}
      disabled={isBusy}
    >
      {isBusy ? (
        <span className="spinner-border spinner-border-sm me-2" />
      ) : (
        "Check Out"
      )}
    </button>
  );
};
