import { useState } from "react";
import { API_BASE_URL } from "../constants";

export const AddressForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    type: "Home",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <input
              name="phone"
              className="form-control form-control-sm"
              placeholder="Phone"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <input
              name="addressLine"
              className="form-control form-control-sm"
              placeholder="Address Line"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="city"
              className="form-control form-control-sm"
              placeholder="City"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="state"
              className="form-control form-control-sm"
              placeholder="State"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-4">
            <input
              name="pincode"
              className="form-control form-control-sm"
              placeholder="Pincode"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <select
              name="type"
              className="form-select form-select-sm"
              onChange={handleChange}
              required
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>
        </div>

        <button className="btn btn-warning btn-sm fw-semibold" type="submit">
          Save Address
        </button>
      </form>
    </div>
  );
};
