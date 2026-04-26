export const Rating = ({ product, size, margin }) => {
  return (
    <div className={`d-flex align-items-center gap-2 mb-${margin}`}>
      <span className="text-warning" style={{ fontSize: `${size}px` }}>
        {"★".repeat(Math.floor(product?.rating ?? 0))}
        {"☆".repeat(5 - Math.floor(product?.rating ?? 0))}
      </span>
      <span className="text-muted" style={{ fontSize: "13px" }}>
        ({product?.rating})
      </span>
    </div>
  );
};
