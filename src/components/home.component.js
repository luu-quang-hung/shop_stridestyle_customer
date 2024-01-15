import React, { Component, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import "../components/css/home.css"
import { BsFillCartFill } from "react-icons/bs";
import AlertMessage from "./common/message";
import productService from "../services/product.service";
import { CButton, CCard, CCardBody, CCol, CFormLabel } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import banner1 from "../image/1.png"
import banner2 from "../image/2.png"
import banner3 from "../image/3.png"
import CurrencyFormatter from "./common/CurrencyFormatter";
const Home = () => {
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
                if (err.code === "ERR_BAD_REQUEST" ) {
                    navigate(`/login`);

                }
                console.error('Error fetching products:', err);
            })
    }

    const cardProductClick = (productId) => {
        navigate(`/product-detail/${productId}`);
    }

    return (
        <div className="container">
            <Row className="justify-content-center">
                <Carousel className="w-100">
                    <Carousel.Item>
                        <img className="d-block w-100" style={{height:"700px"}} src={banner1} alt="Slide 1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" style={{height:"700px"}} src={banner2} alt="Slide 2" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" style={{height:"700px"}} src={banner3} alt="Slide 3" />
                    </Carousel.Item>
                </Carousel>
                <div>
                    {/* <CCard style={{backgroundColor:"white"}}>
            <CCardBody> */}
                    <CFormLabel className="spNew">Sản phẩm mới</CFormLabel>
                    <Row>
                        {productInfo.map((product, index) => (
                            <Col md={3} key={index} onClick={() => cardProductClick(product.id)} >
                                <Card style={{ width: '100%',height:"86%" }} >
                                    <Card.Img variant="top" className="card-img" src={product.image} />
                                    <Card.Body>
                                        <hr color="brown" noshade="noshade" />
                                        <Card.Title style={{fontSize:"22px"}}>{product.nameProduct}</Card.Title>

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

export default Home;
