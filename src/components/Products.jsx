import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { BACK_END } from "../utils/AppConfig.js";
import "./Text.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`${BACK_END}/product`);
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted.current = false;
      };
    };

    getProducts();
  }, []);

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.type === cat);
    setFilter(updatedList);
  };

  const filterProduct2 = (cat) => {
    const updatedList = data.filter((item) => item.special === cat);
    setFilter(updatedList);
  };
  //category == type
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            Tất cả
          </button>
          {/* <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Bánh CRACKER")}
          >
            Bánh Cracker
          </button> */}
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Ăn vặt")}
          >
            Đồ ăn vặt
          </button>
          {/* <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Bánh Quy")}
          >
            Bánh Quy
          </button> */}
          {/* <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Bánh Gạo")}
          >
            Bánh Gạo */}
          {/* </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Bánh Xốp")}
          >
            Bánh Xốp
          </button> */}
          {/* <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct2("Túi Xách")}
          >
            Túi Xách
          </button> */}
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct2("Hộp")}
          >
            Hộp
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct2("Gói")}
          >
            Gói
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product._id}
              key={product._id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div
                className="card text-center h-100"
                style={{ background: "#CCCCDF" }}
                key={product._id}
              >
                <img
                  className="card-img-top"
                  src={product.image}
                  alt="Card"
                  height={300}
                  style={{ padding: "0px", height: "100%", objectFit: "cover" }}
                />
                <div
                  className="card-body"
                  style={{
                    background: "#B0916E",
                    color: "white",
                  }}
                >
                  <h5
                    style={{ fontStyle: "bolder", color: "" }}
                    className="card-title"
                  >
                    {product.name.substring(0, 33)}
                    {product.name.length > 48 ? "..." : ""}
                  </h5>
                  <p style={{ fontStyle: "italic" }} className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead test">
                    {formatCurrency(product.price)}
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product._id}
                    className="btn btn-secondary m-1"
                    style={{ backgroundColor: "darkblue" }}
                  >
                    Mua Ngay
                  </Link>
                  <button
                    className="btn m-1"
                    onClick={() => addProduct(product)}
                    style={{ backgroundColor: "#B8860B", color: "white" }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>     
        <img
          style={{ width: "100%" }}
          src="https://res.cloudinary.com/dfkwgsfiy/image/upload/v1719503398/Screenshot_2024-06-27_224931_w2yhwi.png"
          alt="banner introduce"
        />
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">
              Những sản phẩm của chúng tôi
            </h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
