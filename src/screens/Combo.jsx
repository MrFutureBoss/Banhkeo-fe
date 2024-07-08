import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { BACK_END } from "../utils/AppConfig.js";

const Combo = () => {
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
  //category == type
  const ShowProducts = () => {
    return (
      <>
        {filter
          .filter((product) => product.special === "Combo")
          .map((product) => {
            return (
              <div
                id={product._id}
                key={product._id}
                className="col-md-5 col-sm-6 col-xs-8 col-12 mb-4"
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
                    style={{
                      padding: "0px",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
                    <li className="list-group-item lead fw-bold">
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
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            style={{ width: "100%" }}
            src="https://res.cloudinary.com/dfkwgsfiy/image/upload/v1719503398/Screenshot_2024-06-27_224931_w2yhwi.png"
            alt="banner introduce"
          />
        </div>
      </div>
      <div className="container my-3 py-3">
        <div
          className="row"
          style={{ marginTop: "30px", marginBottom: "50px" }}
        >
          <div className="col-12">
            <p
              style={{
                fontSize: "35px",
                width: "100%",
                padding: "10px 30px",
              }}
              className="display-5 text-center"
            >
              🌴Mùa EURO CUP🏆 đã tới hãy sôi động ⚽️ cùng Hatung foods với
              những ưu đãi cực kì sốc🔥và thời gian có hạn⏳
            </p>
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

export default Combo;
