import { useState } from "react";
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

  const handleSubmit = async () => {
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
      <div className="row g-2">
        <div className="col-12 col-sm-6">
          <input
            name="name"
            className="form-control form-control-sm"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6">
          <input
            name="phone"
            className="form-control form-control-sm"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <input
            name="addressLine"
            className="form-control form-control-sm"
            placeholder="Address Line"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-4">
          <input
            name="city"
            className="form-control form-control-sm"
            placeholder="City"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-4">
          <input
            name="state"
            className="form-control form-control-sm"
            placeholder="State"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-4">
          <input
            name="pincode"
            className="form-control form-control-sm"
            placeholder="Pincode"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <select
            name="type"
            className="form-select form-select-sm"
            onChange={handleChange}
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
        </div>
      </div>
      <button
        className="btn btn-warning btn-sm fw-semibold"
        onClick={handleSubmit}
      >
        Save Address
      </button>
    </div>
  );
};
