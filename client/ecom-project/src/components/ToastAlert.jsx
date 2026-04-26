import { useToastAlert } from "../contexts/ToastAlertContext";

const Alert = ({ message, subject, clear }) => {
  return (
    <div
      class="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">{subject}</strong>
        <small class="text-body-secondary">just now</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => clear()}
        ></button>
      </div>
      <div class="toast-body">{message}</div>
    </div>
  );
};

export const ToastAlert = () => {
  const { messageQ, clearAlert } = useToastAlert();
  return (
    <div aria-live="polite" aria-atomic="true" class="position-relative">
      {/* <!-- Position it: -->
      <!-- - `.toast-container` for spacing between toasts -->
      <!-- - `top-0` & `end-0` to position the toasts in the upper right corner,  -->
      <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  --> */}
      <div class="toast-container top-0 end-0 p-3">
        {/* <!-- Then put toasts within --> */}
        {messageQ.length > 0 &&
          messageQ.map(({ message, subject }) => (
            <Alert message={message} subject={subject} clear={clearAlert} />
          ))}
      </div>
    </div>
  );
};
