const icons = [
  { icon: "bi-arrow-return-left", text: "10 Days Returnable" },
  { icon: "bi-cash", text: "Pay on Delivery" },
  { icon: "bi-truck", text: "Free Delivery" },
  { icon: "bi-shield-check", text: "Secure Payment" },
];

export const FeatureBadges = () => (
  <div className="d-flex gap-3 flex-wrap mb-4">
    {icons.map(({ icon, text }) => (
      <div
        key={text}
        className="d-flex flex-column align-items-center text-center"
        style={{ width: "80px" }}
      >
        <i className={`bi ${icon} mb-1`} style={{ fontSize: "22px" }}></i>
        <span style={{ fontSize: "11px", color: "gray" }}>{text}</span>
      </div>
    ))}
  </div>
);
