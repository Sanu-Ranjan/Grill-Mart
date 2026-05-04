import { useState } from "react";
import { Navbar } from "../components/NavBar";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { Loading } from "../components/Loading";
import { useAddress } from "../contexts/AddressContext";
import { AddressForm } from "../components/AddressForm";
import { AddressCard } from "../components/AddressCard";
import { OrderCard } from "../components/OrderCard";
import { UserDetailsCard } from "../components/UserDetailsCard";

export const UserProfile = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { addressData, addressLoading, setRefresh } = useAddress();

  const addresses = addressData?.data?.addresses ?? [];

  const { data: orderData, loading: orderLoading } = useFetch(
    `${API_BASE_URL}${API_ROUTES.orders.getAll}`,
  );
  const orders = orderData?.data?.orders ?? [];
  return (
    <>
      <Navbar />
      <div className="container py-4" style={{ maxWidth: "700px" }}>
        <UserDeatilsCard />

        <div className="card border shadow-sm p-4 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">My Addresses</h6>
            <button
              className="btn btn-warning btn-sm fw-semibold"
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              {showAddForm ? "Cancel" : "+ Add New"}
            </button>
          </div>
          <hr />

          {showAddForm && (
            <div className="mb-4">
              <AddressForm
                onSuccess={() => {
                  setShowAddForm(false);
                  setRefresh((prev) => !prev);
                }}
              />
            </div>
          )}

          {addressLoading ? (
            <Loading />
          ) : addresses.length === 0 ? (
            <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
              No addresses saved yet.
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {addresses.map((address) => (
                <AddressCard address={address} key={address._id} />
              ))}
            </div>
          )}
        </div>

        <div className="card border shadow-sm p-4 mb-3">
          <h6 className="fw-bold mb-3">Order History</h6>
          <hr />
          {orderLoading ? (
            <Loading />
          ) : orders.length === 0 ? (
            <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
              No orders placed yet.
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {orders.map((order) => (
                <OrderCard order={order} key={order._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
