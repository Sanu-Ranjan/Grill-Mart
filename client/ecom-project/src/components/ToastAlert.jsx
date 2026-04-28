import { useToastAlert } from "../contexts/ToastAlertContext";

const Alert = ({ message, subject, clear }) => {
  return (
    <div
      className="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{subject}</strong>
        <small className="text-body-secondary">just now</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => clear()}
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export const ToastAlert = () => {
  const { messageQ, clearAlert } = useToastAlert();
  return (
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <div className="toast-container top-0 end-0 p-3">
        {messageQ.length > 0 &&
          messageQ.map(({ message, subject }) => (
            <Alert message={message} subject={subject} clear={clearAlert} />
          ))}
      </div>
    </div>
  );
};
