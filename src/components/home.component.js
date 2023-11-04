import React, { Component, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import "../components/css/home.css"
import { BsFillCartFill } from "react-icons/bs";
import AlertMessage from "./common/message";
import productService from "../services/product.service";
const Home = () => {
 0
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  
  

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();
  //   getProductList();
    
  // }, []);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // const getProductList = () => {
  //   UserService.getProduct()
  //     .then(res => {
  //       setProducts(res.data.data);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching products:', err);
  //     })
  // }




  return (
    <div className="container">
        <div>
          <section className="hero">
              <Row className="justify-content-center">
                <Carousel className="w-100">
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://i.imgur.com/4PP7wHy.jpg" alt="Slide 1" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://i.imgur.com/avpwAJP.jpg" alt="Slide 2" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://i.imgur.com/fxfPITL.jpg" alt="Slide 3" />
                  </Carousel.Item>
                </Carousel>
              </Row>
          </section>
          <section>
            <h1 className="spNew">Sản phẩm mới</h1>
            <section className="features">
              <Container>
                <Row>
                  {products.map((product) => (
                    <Col md={3} key={product.idProduct}>
                      <div className="product-card" onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.name} />
                        <h5>{product.name}|{product.color}</h5>
                        <p>{product.price} ₫</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </section>

            {/* Modal */}
            <Modal show={!!selectedProduct} >

              <Modal.Header >
                <Modal.Title>{selectedProduct?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {showAlert && (
                  <AlertMessage
                    message={`Thêm sản phẩm  vào giỏ hàng thành công`}
                    duration={2} // Thời gian tồn tại thông báo (số giây)
                  />
                )}
                <img className="product_image" src={selectedProduct?.image} alt={selectedProduct?.name} />
                <p>{selectedProduct?.price} ₫</p>
                <p>Size: {selectedProduct?.size}</p>
                <p>Tồn kho: {selectedProduct?.quantity}</p>
                {/* Add more product details as needed */}
                {/* <Button id="button" variant="info" onClick={() => { addToCart(selectedProduct); }}>              <BsFillCartFill className="custom-cart-icon" />
                  Thêm vào giỏ hàng</Button> */}

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>

              </Modal.Footer>
            </Modal>

          </section>



        </div>
    </div>
  );
};

export default Home;
