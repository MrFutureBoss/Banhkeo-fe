import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Navbar } from "../components";
import { BACK_END } from "../utils/AppConfig.js";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showSameTypeProducts, setShowSameTypeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const response = await fetch(`${BACK_END}/product/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(`${BACK_END}/product/type/${data.type}`);
      // const response2 = await fetch(
      //   `https://fakestoreapi.com/products/category/${data.category}`
      // );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setShowSameTypeProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const formatDescription = (description) => {
    // Kiểm tra nếu description không tồn tại hoặc là undefined
    if (!description) return null;

    // Tách văn bản thành các dòng bằng cách tách theo ký tự '\n'
    const lines = description.split("\n");

    // Sử dụng map để hiển thị từng dòng
    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.image}
                alt={product.name}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.type}</h4>
              <h1 className="display-5">{product.name}</h1>
              {/* <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p> */}
              <h3 className="display-6 my-4">
                {product.price && formatCurrency(product.price)}
              </h3>
              <p className="lead">{formatDescription(product.description)}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Thêm vào Giỏ hàng
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Đi tới Giỏ hàng
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="d-none d-md-block" style={{ marginTop: "20px" }}>
              <div>
                <Marquee pauseOnHover={false} pauseOnClick={true} speed={100}>
                  {loading2 ? <Loading2 /> : <ShowSameTypeProduct />}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    const baseProductName =
      product?.name.split("vị")[0] && product?.name.split("vị")[0];

    const filteredProducts = similarProducts.filter(
      (item) =>
        !item.name.includes(baseProductName) && item.name !== product.name
    );
    return (
      <>
        <div className="py-4 my-4" style={{ height: "70%" }}>
          <div className="d-flex">
            {filteredProducts.map((item) => {
              return (
                <div key={item._id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.name.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item._id}
                      className="btn btn-dark m-1"
                      style={{ backgroundColor: "darkblue" }}
                    >
                      Mua ngay
                    </Link>
                    <button
                      className="btn m-1"
                      onClick={() => addProduct(item)}
                      style={{ backgroundColor: "#B8860B", color: "white" }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const ShowSameTypeProduct = () => {
    const baseProductName =
      product?.name.split("vị")[0] &&
      product?.name.split("vị")[0] &&
      product?.name.split("vị")[0] &&
      product?.name.split("vị")[0];

    // Lọc danh sách sản phẩm tương tự
    const filteredProducts = showSameTypeProducts.filter(
      (item) =>
        item.name.includes(baseProductName) &&
        item.name !== product.name
    );
    return (
      <>
        <div
          className="py-4 my-4"
          style={{ display: filteredProducts.length === 0 ? "none" : "block" }}
        >
          <h2 className="">Sản phẩm cùng loại</h2>
          <div className="d-flex">
            {filteredProducts.map((item) => {
              return (
                <div key={item._id} className="card mx-4 text-center">
                  <img
                    className="card-img-top"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  {/* <p>{baseProductName}</p> */}
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.name.substring(0, 28)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item._id}
                      className="btn btn-dark m-1"
                      style={{ backgroundColor: "darkblue" }}
                    >
                      Mua ngay
                    </Link>
                    <button
                      className="btn m-1"
                      onClick={() => addProduct(item)}
                      style={{ backgroundColor: "#B8860B", color: "white" }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">Bạn cũng có thể thích nó (sản phẩm tương tự)</h2>
            <Marquee pauseOnHover={false} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
