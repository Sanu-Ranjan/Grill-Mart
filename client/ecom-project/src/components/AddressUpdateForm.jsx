import { useRef, useState } from "react";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { useAddress } from "../contexts/AddressContext";
import { useBusyState } from "../hooks/useBusyState";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";

export const AddressUpdateForm = ({
  presentAddress,
  onSuccess,
  cancelEdit,
}) => {
  const { _id, name, type, addressLine, city, state, pincode, phone } =
    presentAddress;
  const [form, setForm] = useState({
    name: name,
    phone: phone,
    pincode: pincode,
    city: city,
    state: state,
    addressLine: addressLine,
    type: type,
  });
  const { addressLoading } = useAddress();

  const { isBusy, setIsBusy } = useBusyState(addressLoading);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsBusy(true);

      const { isValid, message } = validateForm(form);
      if (!isValid) {
        setIsBusy(false);
        return toast(message);
      }

      const res = await fetch(
        `${API_BASE_URL}${API_ROUTES.address.update(_id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (data.success) onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <form onSubmit={handleSubmit}>
        <div className="row g-2 mb-3">
          <div className="col-12 col-sm-6">
            <input
              name="name"
              className="form-control form-control-sm"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <input
              name="phone"
              className="form-control form-control-sm"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <input
              name="addressLine"
              className="form-control form-control-sm"
              placeholder="Address Line"
              value={form.addressLine}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="city"
              className="form-control form-control-sm"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="state"
              className="form-control form-control-sm"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="pincode"
              className="form-control form-control-sm"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <select
              name="type"
              className="form-select form-select-sm"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn btn-warning btn-sm fw-semibold"
            type="submit"
            disabled={isBusy}
          >
            Save Address
          </button>
          <button
            className="btn btn-outline-secondary btn-sm fw-semibold"
            type="button"
            onClick={() => cancelEdit()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
