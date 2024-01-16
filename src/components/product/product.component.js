import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Card, Form } from 'react-bootstrap';
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
  const [trademarks, setTrademark] = useState([]);
  const [size, setSize] = useState([]);
  const [property, setProperty] = useState([]);

  const [productSearch, setProductSearch] = useState({
    page: 0,
    size: 12,
    nameProduct: null,
    minPrice: null,
    maxPrice: null,
    categoryName: null,
    idColor: null,
    idSize: null
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

    const jsonPage = {
      page: 0,
      size: 1000
    }
    productService.findCategory()
      .then(res => {
        setTrademark(res.data)
      })
      .catch(error => {
        console.log("Error load data Trademark", error);
      })

    productService.findAllSize(jsonPage)
      .then(res => {
        console.log(res.data.content);
        setSize(res.data.content)
      })
      .catch(error => {
        console.log("Error load data Trademark", error);
      })
    productService.findAllProperty(jsonPage)
      .then(res => {
        console.log(res.data.content);
        setProperty(res.data.content)

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
          <CCol md={3} className="mb-3">
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
          <CCol md={2}>
            <Form.Group controlId="formTrademark">
              <Form.Control
                as="select"
                name="categoryName"
                onChange={(e) => handleInputChange('categoryName', e.target.value)}

              >
                <option value={""}>Chọn danh mục</option>
                {trademarks.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.nameCategory}
                  </option>
                ))}

              </Form.Control>
            </Form.Group>
          </CCol>
          <CCol md={2}>
            <Form.Control
              as="select"
              name="idSize"
              onChange={(e) => handleInputChange('idSize', e.target.value)}
            >
              <option value={""}>Chọn kích thước</option>
              {size.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>

          </CCol>
          <CCol md={2}>
            <Form.Control
              as="select"
              name="idColor"
              onChange={(e) => handleInputChange('idColor', e.target.value)}
            >
              <option value={""}>Chọn màu sắc</option>
              {property.map((item) => (
                <option key={item.idProperty} value={item.idProperty}>
                  {item.name}
                </option>
              ))}

            </Form.Control>
          </CCol>
          <CCol md={1}>
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
