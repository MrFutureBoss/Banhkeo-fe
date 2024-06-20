import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://res.cloudinary.com/dfkwgsfiy/image/upload/v1718909551/vn-11134210-7r98o-lwn35i63kxqx16_uw1lsz.webp"
            alt="Card"
            height={500}
          />
          {/* <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                Cty Ha Tung foods
              </h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Hà Tùng Foods đặt sức khỏe và lợi ích của khách hàng lên hàng
                đầu, với mục tiêu cung cấp sản phẩm chất lượng cao với giá cả
                cạnh tranh
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
