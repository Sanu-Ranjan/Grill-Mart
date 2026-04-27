const staticUser = {
  name: "Sanu Ranjan",
  email: "sanu@grillmart.com",
  phone: "+91 9876543210",
  avatar: "SR",
};

export const UserDeatilsCard = () => {
  return (
    <>
      <div className="d-flex align-items-center gap-4 mb-4">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-warning fw-bold"
          style={{ width: "72px", height: "72px", fontSize: "24px" }}
        >
          {staticUser.avatar}
        </div>
        <div>
          <h5 className="fw-bold mb-0">{staticUser.name}</h5>
          <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
            GrillMart Member
          </p>
        </div>
      </div>
      <div className="card border shadow-sm p-4 mb-3">
        <h6 className="fw-bold mb-3">Personal Information</h6>
        <hr />
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
              Full Name
            </p>
            <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
              {staticUser.name}
            </p>
          </div>
          <div className="col-12 col-sm-6">
            <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
              Email
            </p>
            <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
              {staticUser.email}
            </p>
          </div>
          <div className="col-12 col-sm-6">
            <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
              Phone
            </p>
            <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
              {staticUser.phone}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
