import React, { Component, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import "../components/css/home.css"
import { BsFillCartFill } from "react-icons/bs";
import AlertMessage from "./common/message";
import productService from "../services/product.service";
import { CButton, CCard, CCardBody, CCol } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import banner1 from "../image/1.png"
import banner2 from "../image/2.png"
import banner3 from "../image/3.png"

const Home = () => {
  const navigate = new useNavigate();
  const [productInfo, setProductInfo] = useState([]);

  const [productSearch, setProductSearch] = useState({
    page: 0,
    size: 12
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    productService.getProduct(productSearch)
      .then(res => {
        setProductInfo(res.data.content);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      })
  }

  const cardProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  }

  return (
    <div className="container">
      <div>
        <Row className="justify-content-center">
          <Carousel className="w-100">
            <Carousel.Item>
              <img className="d-block w-100" style={{ height: "531px" }} src={banner1} alt="Slide 1" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" style={{ height: "531px" }} src={banner2} alt="Slide 2" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" style={{ height: "531px" }} src={banner3} alt="Slide 3" />
            </Carousel.Item>
          </Carousel>
        </Row>
        <div>
          <CCard>
            <CCardBody>
              <h1 className="spNew">NEW ARRIVALS</h1>
              <Row>
                {productInfo.map((product, index) => (
                  <Col md={3} key={index}>
                    <Card style={{ width: '18rem' }} >
                      <Card.Img variant="top" className="card-img" src={product.image} />
                      <hr color="brown" noshade="noshade" />
                      <Card.Body style={{ textAlign: "center" }} onClick={() => cardProductClick(product.id)}>
                        <Card.Title>{product.nameProduct}</Card.Title>
                        <Card.Text>
                          {product.description}
                        </Card.Text>
                        <Card.Title>{product.price} đ</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
