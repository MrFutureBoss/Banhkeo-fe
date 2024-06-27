import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  return (
    <nav
      style={{
        background: "rgb(255,255,255) linear-gradient(90deg, rgba(255,255,255,1) 17%, rgba(251,251,254,1) 34%, rgba(204,204,223,1) 91%)",
      }}
      className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top"
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          <img
            src="https://res.cloudinary.com/dfkwgsfiy/image/upload/v1718877437/logo_n74mhd.jpg"
            alt="Ha Tung logo"
            style={{ height: "100px" }}
          ></img>
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Trang chủ{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Sản phẩm
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Phản hồi
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {/* <NavLink to="/login" className="btn btn-outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Đăng nhập
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i> Đăng kí
            </NavLink> */}
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i>
              <TiShoppingCart style={{ fontSize: "28px" }} /> Giỏ hàng (
              {state.length}){" "}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
