import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
const Header = () => {
  const state = useSelector((state) => state.handleCart);
  return (
    <>
      <Navbar
        expand="lg"
        style={{
          background:
            "rgb(255,255,255) linear-gradient(90deg, rgba(255,255,255,1) 17%, rgba(251,251,254,1) 34%, rgba(204,204,223,1) 91%)",
        }}
        className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top"
      >
        <Container fluid>
          <Row className="w-100">
            <Col
              xs={6}
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Navbar.Brand className="navbar-brand fw-bold fs-4 px-2" to="/">
                <img
                  src="https://res.cloudinary.com/dfkwgsfiy/image/upload/v1718877437/logo_n74mhd.jpg"
                  alt="Ha Tung logo"
                  style={{ height: "100px" }}
                />
              </Navbar.Brand>
            </Col>
            <Col
              xs={6}
              className="d-lg-none d-flex align-items-center justify-content-end"
            >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Navbar.Collapse id="responsive-navbar-nav">
                <div className="buttons text-center w-100 d-flex align-items-center justify-content-center">
                  <Nav
                    className="d-flex align-items-center justify-content-center w-100 gap-3"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <NavLink
                      style={{ textDecoration: "none", color: "#000" }}
                      to="/"
                    >
                      Trang chủ
                    </NavLink>
                    <NavLink
                      style={{ textDecoration: "none", color: "#000" }}
                      to="/product"
                    >
                      Sản phẩm
                    </NavLink>
                    <NavLink
                      style={{ textDecoration: "none", color: "#000" }}
                      to="/contact"
                    >
                      Phản hồi
                    </NavLink>
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <Navbar.Collapse id="responsive-navbar-nav">
                <div className="buttons text-center w-100 d-flex align-items-center justify-content-center">
                  <NavLink to="/cart" className="btn btn-outline-dark m-2">
                    <i className="fa fa-cart-shopping mr-1"></i>
                    <TiShoppingCart style={{ fontSize: "28px" }} /> Giỏ hàng (
                    {state.length}){" "}
                  </NavLink>
                </div>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
