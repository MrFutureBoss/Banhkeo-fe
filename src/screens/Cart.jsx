import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import QrModal from "./QrModal";
import { FaUserEdit } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { CiReceipt } from "react-icons/ci";


import { v4 as uuidv4 } from "uuid";
const Cart = () => {
  const [showPopup, setShowPopup] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  const state = useSelector((state) => state.handleCart) || [];
  const dispatch = useDispatch();
  const subtotal = state.reduce((acc, item) => acc + item.price * item.qty, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [postData, setPostData] = useState({
    name: name,
    email: email,
    phone: phone,
    location: location,
    total: subtotal,
    listCart: state,
    seri: uuidv4(),
  });
 console.log("State:"+ state);
  useEffect(() => {
    setPostData({
      ...postData,
      total: Number(subtotal),
      listCart: state,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">
              Oop! <TiShoppingCart style={{ fontSize: "60px" }} /> của bạn đang
              trống ?
            </h4>
            <Link to="/" className="btn btn-success mx-4">
              <i className="fa fa-arrow-left"></i> Tiếp tục shopping thui!{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPostData = {
      ...postData,
      name,
      email,
      phone,
      location,
      total: subtotal,
      listCart: state,
    };
    setPostData(updatedPostData);
    openPopup();
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-7">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Danh sách sản phẩm</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item._id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.image}
                                  // className="w-100"
                                  alt={item.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.name}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus">
                                    <FaMinus />
                                  </i>
                                </button>

                                <p
                                  className="m-auto"
                                  style={{
                                    height: "100",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                  }}
                                >
                                  {item.qty}
                                </p>

                                <button
                                  className="btn btn-success"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus">
                                    <FaPlus />
                                  </i>
                                </button>
                              </div>
                            </div>
                            <p
                              className="text-end"
                              style={{ marginTop: "10px" }}
                            >
                              <strong>
                                <span className="text-muted">{item.qty}</span> x{" "}
                                {formatCurrency(item.price)}
                              </strong>
                            </p>
                            <p
                              className="text-end"
                              style={{ marginTop: "10px" }}
                            >
                              <strong>
                                <span className="text-muted">
                                  Tổng cộng:{" "}
                                  {formatCurrency(item.qty * item.price)}
                                </span>
                              </strong>
                            </p>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card mb-4 row">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">
                      <CiReceipt
                        style={{ color: "#808080", fontSize: "35px" }}
                      />
                      Đơn của bạn
                    </h5>
                  </div>
                  <form className="card-body" onSubmit={handleSubmit}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Số lượng:
                        <span>{totalItems} sản phẩm</span>
                      </li>
                      {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Phí ship
                        <span>{formatCurrency(shipping)}</span>
                      </li> */}
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Tổng cộng bạn phải trả là:</strong>
                        </div>
                        <span>
                          <strong>
                            {formatCurrency(Math.round(subtotal + shipping))}
                          </strong>
                        </span>
                      </li>
                    </ul>

                    {/* <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Mua thôi ❤️
                    </Link> */}
                    {/* <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Mua thôi ❤️
                      </button> */}
                  </form>
                </div>
                <div className="card mb-4 row">
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      <FaShippingFast
                        style={{ color: "#DAA520", fontSize: "35px" }}
                      />{" "}
                      Nhập thông tin trước khi thanh toán nào
                    </h5>
                  </div>
                  <form className="card-body" onSubmit={handleSubmit}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item border-0 px-0 pb-0">
                        <label style={{ width: "100%" }} htmlFor="">
                          <FaUserEdit style={{ color: "#A9A9A9" }} /> Họ và Tên:
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          class="form-control"
                          placeholder="Nhập họ và tên"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        ></input>
                      </li>
                      <li className="list-group-item border-0 px-0 pb-0">
                        <label style={{ width: "100%" }} htmlFor="">
                          <FaPhoneVolume style={{ color: "green" }} />
                          &nbsp;Liên hệ:
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          class="form-control"
                          placeholder="Nhập số điện thoại"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        ></input>
                      </li>
                      <li className="list-group-item border-0 px-0 mb-0">
                        <label style={{ width: "100%" }} htmlFor="">
                          <MdOutlineAlternateEmail
                            style={{ color: "#1E90FF" }}
                          />{" "}
                          Email:
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          style={{ width: "100%" }}
                          placeholder="Nhập email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        ></input>
                      </li>
                      <li className="list-group-item border-0 px-0 mb-0">
                        <label style={{ width: "100%" }} htmlFor="">
                          <GrMapLocation style={{ color: "DarkRed" }} /> Địa chỉ
                          giao hàng:
                          <span className="text-danger">*</span>
                        </label>
                        <textarea
                          type="text"
                          class="form-control"
                          style={{ width: "100%", height: "100px" }}
                          placeholder="Nhập địa chỉ"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </li>
                    </ul>

                    {/* <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Mua thôi ❤️
                    </Link> */}
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Mua thôi ❤️
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center my-4">
              {/* {showSuccess && (
                <div
                  className="position-fixed top-0 end-0 bg-success text-white px-4 py-3 rounded shadow-lg fs-5 fw-semibold"
                  style={{
                    top: "1rem",
                    right: "1rem",
                    transition: "opacity 0.3s",
                  }}
                >
                  Thanh toán thành công!
                </div>
              )} */}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Giỏ hàng của bạn</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <QrModal
        show={showPopup}
        setShow={setShowPopup}
        total={subtotal}
        uuid={uuidv4()}
        postData={postData}
      />
    </>
  );
};

export default Cart;
