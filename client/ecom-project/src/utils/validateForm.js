import { toast } from "react-toastify";

const isValidPhone = (phone) => {
  return /^[1-9]\d{9}$/.test(phone);
};

const isValidPinCode = (pincode) => {
  return /^[1-9]\d{5}$/.test(pincode);
};

const isValidString = (str) => {
  const trimmed = str.trim();
  if (trimmed.length === 0) return false;
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  return true;
};

const ok = () => ({
  isValid: true,
  message: "ok",
});

const err = (message) => ({
  isValid: false,
  message: message,
});

export const validateForm = (form) => {
  const { name, phone, pincode, city, state, addressLine, type } = form;
  if (!isValidString(name)) return err("Enter a valid Name");
  if (!isValidPhone(phone)) return err("Enter a valid Phone Number");
  if (!isValidPinCode(pincode)) return err("Enter a valid Pincode");
  if (!isValidString(city)) return err("Enter a valid City");
  if (!isValidString(state)) return err("Enter a valid State");
  if (!isValidString(addressLine)) return err("Enter a valid address");
  if (!isValidString(type)) return err("Enter a valid Type");
  return ok();
};
