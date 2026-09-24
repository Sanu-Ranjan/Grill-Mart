import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL, API_ROUTES } from "../constants/index";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";
const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const { token } = useAuth();
  const { data: addressData = null, loading: addressLoading } = useFetch(
    token ? `${API_BASE_URL}${API_ROUTES.address.getAll}` : null,
    refresh,
  );
  const addressId = JSON.parse(localStorage.getItem("addressId"));
  const [selectedAddressId, setSelectedAddressId] = useState(addressId);

  // selected address belongs to the user, drop it on logout
  useEffect(() => {
    if (!token) setSelectedAddressId(null);
  }, [token]);
  localStorage.setItem("addressId", JSON.stringify(selectedAddressId));

  return (
    <AddressContext.Provider
      value={{
        addressData,
        addressLoading,
        setRefresh,
        selectedAddressId,
        setSelectedAddressId,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
