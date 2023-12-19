import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import AuthService from "./services/auth.service";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from "./components/login/login.component";
import Register from "./components/login/register.component";
import Home from "./components/home.component";
import Profile from "./components/login/profile.component";
import Product from "./components/product/product.component";
import ShoppingCart from "./components/cart/shopping_cart.component";
import ProductDetail from "./components/product/ProductDetailComponent";
import OrderCompoment from "./components/order/OrderDetailCompoment";
import OrderCustomerComponent from "./components/order-customer/OrderCustomerComponent";
import ContactComponent from "./components/contact/ContactComponent";
import IntroduceComponent from "./components/introduce/IntroduceComponent";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import OrderDone from "./components/order/order-done";
import { BsFillCartFill, BsPersonCircle, BsFacebook, BsTwitter, BsTelegram, BsInstagram } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
// import AuthVerify from "./common/auth-verify";
const App = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  const customer = JSON.parse(localStorage.getItem('user'));
  const [indexCart, setIndexCart] = useState(0);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.roles.includes("ROLE_USER"));
    }

    if (!customer || !customer.accessToken) {
      navigate("/login")
    }
    const cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];

    // Cập nhật trạng thái với độ dài của mảng cartItem
    setIndexCart(cartItem.length);
  }, []);





  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div >
      <div id="header">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Logo ne</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Trang chủ</Nav.Link>
                <Nav.Link href="/introduce">Giới thiệu</Nav.Link>
                <Nav.Link href="/product">Sản phẩm</Nav.Link>
                <Nav.Link href="/contact">Liên hệ</Nav.Link>
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <Nav.Link href="/contact">
                      <a href="/shopping-cart" >
                        <BsFillCartFill className="custom-cart-icon" />
                        <div className="custom-badge">{indexCart || 0}</div>
                      </a>
                    </Nav.Link>
                    <Dropdown>
                      <Dropdown.Toggle style={{ backgroundColor: "white", border: "none", width: "70px" }}>
                        <BsPersonCircle className="custom-cart-icon" />
                        <span style={{ color: "black" }}>{customer.username}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ right: 0, left: "auto" }}>
                        <Dropdown.Item eventKey="1" href="/profile">
                          Tài khoản
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" href="/order-customer">Quản lý đơn hàng</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onClick={logOut} href="/login">
                          Đăng xuất
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        <i className="fas fa-sign-in-alt"></i> Đăng nhập
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/sigin"} className="nav-link">
                        <i className="fas fa-sign-in-alt"></i> Đăng ký
                      </Link>
                    </li>

                  </div>
                )}
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="container_body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<Product />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<OrderCompoment />} />
          <Route path="/introduce" element={<IntroduceComponent />} />
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/order-customer" element={<OrderCustomerComponent />} />
          <Route path="/checkout-done" element={<OrderDone />} />

        </Routes>
      </div>

      <div class="footer-dark" >
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>Web design</li>
                  <li>Development</li>
                  <li>Hosting</li>
                </ul>
              </div>
              <div class="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>Company</li>
                  <li>Team</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div class="col-md-6 item text">
                <h3>Company Name</h3>
                <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
              </div>
              <div class="col item social"><BsFacebook></BsFacebook>   <BsTelegram />   <BsInstagram />  <BsTwitter /> </div>
            </div>
            <p class="copyright">Dự án tốt nghiệp © 2023</p>
          </div>
        </footer>
      </div>
    </div>

  );
}

export default App;
