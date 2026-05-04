import { useState } from "react";
import { useAddress } from "../contexts/AddressContext";
import { AddressUpdateForm } from "./AddressUpdateForm";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { useBusyState } from "../hooks/useBusyState";

export const AddressCard = ({ address }) => {
  const [edit, setEdit] = useState(false);

  const {
    selectedAddressId,
    setSelectedAddressId,
    setRefresh,
    addressLoading,
  } = useAddress();

  const { isBusy, setIsBusy } = useBusyState(addressLoading);

  const deleteAddress = async (_id) => {
    try {
      setIsBusy(true);
      const res = await fetch(
        `${API_BASE_URL}${API_ROUTES.address.delete(_id)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      if (data.success) setRefresh((prev) => !prev);
      else console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (edit) {
    return (
      <AddressUpdateForm
        presentAddress={address}
        onSuccess={() => {
          setEdit(false);
          setRefresh((prev) => !prev);
        }}
        cancelEdit={() => setEdit(false)}
      />
    );
  }

  return (
    <>
      <div
        key={address?._id}
        className="border rounded-3 p-3"
        style={{
          cursor: "pointer",
          borderColor: selectedAddressId === address?._id ? "#ffc107" : "",
          borderWidth: selectedAddressId === address?._id ? "2px" : "1px",
        }}
      >
        <div className="d-flex gap-3 align-items-start">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle border flex-shrink-0 mt-1"
            style={{
              width: "20px",
              height: "20px",
              background:
                selectedAddressId === address?._id ? "#ffc107" : "white",
              borderColor:
                selectedAddressId === address?._id ? "#ffc107" : "#ccc",
            }}
            onClick={() => setSelectedAddressId(address?._id)}
          >
            {selectedAddressId === address?._id && (
              <i className="bi bi-check" style={{ fontSize: "13px" }}></i>
            )}
          </div>

          <div>
            {isBusy ? (
              <span className="spinner-border spinner-border-sm me-2" />
            ) : (
              <>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
                    {address?.name}
                  </p>
                  <span
                    className="badge bg-warning text-dark"
                    style={{ fontSize: "10px" }}
                  >
                    {address?.type}
                  </span>
                </div>
                <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
                  {address?.addressLine}
                </p>
                <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
                  {address?.city}, {address?.state} — {address?.pincode}
                </p>
                <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                  Phone: {address?.phone}
                </p>
              </>
            )}
            <div className="d-flex align-items-center gap-2 my-1">
              <button
                className="btn btn-warning btn-sm fw-semibold"
                style={{ fontSize: "13px" }}
                onClick={() => setEdit(true)}
                disabled={isBusy}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                style={{ fontSize: "13px", zIndex: "100" }}
                onClick={() => deleteAddress(address?._id)}
                disabled={isBusy}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
