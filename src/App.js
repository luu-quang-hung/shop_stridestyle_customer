import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BsFillCartFill, BsPersonCircle, BsFacebook, BsTwitter, BsTelegram, BsInstagram } from "react-icons/bs";
// import AuthVerify from "./common/auth-verify";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const customer = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.roles.includes("ROLE_ADMIN"));
    }

    const logoutListener = () => {
      logOut();
    };

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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#works">Works</Nav.Link>
            <Nav.Link href="#teams">Teams</Nav.Link>
            <Nav.Link href="#testimonials">Testimonials</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      <BsPersonCircle className="custom-cart-icon" /> {customer.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/shopping-cart" className="nav-link">
                      <BsFillCartFill className="custom-cart-icon" /> </a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      <i className="fas fa-sign-out-alt"></i> Đăng xuất
                    </a>
                  </li>

                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      <i className="fas fa-user-plus"></i> Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<Product />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
        </Routes>
      </div>

      <div class="footer-dark">
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
            <p class="copyright">Company Name © 2018</p>
          </div>
        </footer>
      </div>
    </div>

  );
}

export default App;
