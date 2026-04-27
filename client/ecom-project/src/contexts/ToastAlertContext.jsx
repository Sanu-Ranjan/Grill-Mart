import { createContext, useContext, useState } from "react";

const ToastAlertContext = createContext();

export const ToastAlertProvider = ({ children }) => {
  const [messageQ, setMessageQ] = useState([]);
  const clearAlert = () => setMessageQ([]);

  const addAlert = (message, subject) => {
    if (messageQ.length === 5) clearAlert();
    setMessageQ((prev) => [...prev, { message, subject }]);
  };

  return (
    <ToastAlertContext.Provider value={{ messageQ, addAlert, clearAlert }}>
      {children}
    </ToastAlertContext.Provider>
  );
};

export const useToastAlert = () => useContext(ToastAlertContext);
