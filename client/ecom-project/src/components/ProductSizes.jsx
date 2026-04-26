import { useState } from "react";

export const ProductSizes = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  return (
    <div className="mb-3">
      <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
        Size:
      </p>
      <div className="d-flex gap-2 flex-wrap">
        {product?.sizes?.map((size) => (
          <button
            key={size}
            className="btn btn-sm"
            style={{
              border:
                selectedSize === size ? "1px solid #ffc107" : "1px solid #ccc",
              background: selectedSize === size ? "#fff8e1" : "white",
              fontWeight: "500",
              minWidth: "52px",
            }}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
