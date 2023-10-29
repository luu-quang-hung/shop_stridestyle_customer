import React, { Component, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AuthService from "../services/auth.service";
import "../components/css/home.css";
import { BsFillCartFill } from "react-icons/bs";
import AlertMessage from "./common/message";
import Card from "@mui/material/Card";
import {CardActions,CardContent,CardMedia,Typography} from "@mui/material";
import productService from "../services/product.service";
import { Grid } from "@mui/material";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    productService
      .getProduct()
      .then((response) => {
        const data = response.data; // Truy cập thuộc tính "data" từ phản hồi API
        // Kiểm tra xem data có phải là mảng không
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

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
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/4PP7wHy.jpg"
                  alt="Slide 1"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/avpwAJP.jpg"
                  alt="Slide 2"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.imgur.com/fxfPITL.jpg"
                  alt="Slide 3"
                />
              </Carousel.Item>
            </Carousel>
          </Row>
        </section>
        <Grid container spacing={6}>
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 445, marginTop: "20px", marginBottom: "20px" }}>
                <CardMedia
                  sx={{ height: 340 }}
                  image={product.images.url}
                  title={product.nameProduct}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.nameProduct}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <button type="button" className="btn btn-outline-warning">Thêm vào giỏ hàng</button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
