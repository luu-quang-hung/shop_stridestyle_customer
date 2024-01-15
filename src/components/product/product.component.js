import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import "../css/home.css"

import productService from "../../services/product.service";
import { useNavigate } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CurrencyFormatter from "../common/CurrencyFormatter";
import { CButton, CCol, CFormInput, CRow } from "@coreui/react";
const ProductComponent = () => {
  const navigate = new useNavigate();
  const [productInfo, setProductInfo] = useState([]);
  const formatter = new CurrencyFormatter();
  const [priceRange, setPriceRange] = useState([100000, 10000000]); // Khoảng giá tiền mặc định

  const [productSearch, setProductSearch] = useState({
    page: 0,
    size: 12,
    nameProduct: null,
    minPrice: null,
    maxPrice: null
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
  const handleSliderChange = (value) => {
    setPriceRange(value);
    setProductSearch((prevProductSearch) => ({
      ...prevProductSearch,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };
  console.log('====================================');
  console.log(productSearch);
  console.log('====================================');
  const handleInputChange = (field, value) => {
    const nullValue = value === 'null' ? null : value;
    setProductSearch((prevSearchBill) => ({
      ...prevSearchBill,
      [field]: nullValue,
    }));
  };
  return (
    <div className="container">
      <div style={{ marginTop: "100px" }}>
        {/* <CCard style={{backgroundColor:"white"}}>
            <CCardBody> */}
        <CRow >
          <CCol md={2}>
            <CFormInput
              type="text"
              id="nameProduct"
              placeholder="Tên sản phẩm"
              onChange={(e) => handleInputChange('nameProduct', e.target.value)}
            />
          </CCol>
          <CCol md={2} className="mb-3">
            <Slider
              range
              min={100000}
              max={10000000}
              value={priceRange}
              onChange={handleSliderChange}
            />
            <p>
              Giá từ {formatter.formatVND(priceRange[0])} đến {formatter.formatVND(priceRange[1])}
            </p>
          </CCol>
          <CCol md={6}>
            <CButton type="submit" className="mb-3" onClick={getProductList}>
              Tìm Kiếm
            </CButton>
          </CCol>

          {productInfo.map((product, index) => (
            <Col md={3} key={index}>
              <Card style={{ width: '100%', height: "86%" }} onClick={() => cardProductClick(product.id)} >
                <Card.Img variant="top" className="card-img" src={product.image} />
                <Card.Body>
                  <hr color="brown" noshade="noshade" />
                  <Card.Title style={{ fontSize: "22px" }}>{product.nameProduct}</Card.Title>
                  <Card.Title style={{ color: "red" }}>{formatter.formatVND(product.price)}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CRow>

        {/* </CCardBody>
          </CCard> */}
      </div>
    </div>
  );
};

export default ProductComponent;
