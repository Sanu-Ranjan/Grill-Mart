import { createContext, useContext, useState } from "react";
import { API_BASE_URL, API_ROUTES } from "../constants/index";
import { useFetch } from "../hooks/useFetch";
const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const { data: addressData = null, loading: addressLoading } = useFetch(
    `${API_BASE_URL}${API_ROUTES.address.getAll}`,
    refresh,
  );
  const addressId = JSON.parse(localStorage.getItem("addressId"));
  const [selectedAddressId, setSelectedAddressId] = useState(addressId);
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
