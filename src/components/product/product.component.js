import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import "../css/home.css"

import productService from "../../services/product.service";
import { useNavigate } from "react-router-dom";

import CurrencyFormatter from "../common/CurrencyFormatter";
const ProductComponent = () => {
  const navigate = new useNavigate();
  const [productInfo, setProductInfo] = useState([]);
  const formatter = new CurrencyFormatter();

  const [productSearch, setProductSearch] = useState({
    page: 0,
    size: 12
  });


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
        <Row className="justify-content-center">
        <div>
          {/* <CCard style={{backgroundColor:"white"}}>
            <CCardBody> */}
              <Row>
                {productInfo.map((product, index) => (
                  <Col md={3} key={index}>
                    <Card style={{ width: '100%',height:"86%" }} onClick={() => cardProductClick(product.id)} >
                      <Card.Img variant="top" className="card-img" src={product.image} />
                      <Card.Body>
                      <hr color="brown" noshade="noshade" />
                        <Card.Title style={{fontSize:"22px"}}>{product.nameProduct}</Card.Title>
                        <Card.Text>
                          {product.description}
                        </Card.Text>
                        <Card.Title style={{color:"red"}}>{formatter.formatVND(product.price)}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            {/* </CCardBody>
          </CCard> */}
        </div>
        </Row>
    </div>
  );
};

export default ProductComponent;
