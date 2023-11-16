import React, { useState, useEffect } from "react";
import { CRow, CCol, CButton, CImage, CFormInput, CFormLabel, CCard, CCardBody, CCardTitle, CCardText } from "@coreui/react";
import productService from "../../services/product.service";
import { useParams } from 'react-router-dom';
import "../css/product_detail.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetail = () => {

  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState({
    size: null,
    property: null,
    quantity: 1
  });
  useEffect(() => {
    getProducId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducId = () => {
    productService.getProductByID(productId)
      .then((res) => {
        setProduct(res.data.data[0])
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!(/^\d+$/.test(value)) || value < 1) {
      setProductDetail(prevState => ({
        ...prevState,
        quantity: ""
      }))
    } else {
      setProductDetail(prevState => ({
        ...prevState,
        quantity: value
      }))
    }
  };

  const handleSizeClick = (size) => {
    setProductDetail(prevState => ({
      ...prevState,
      size: size
    }));
  };

  const handlePropertyClick = (property) => {
    setProductDetail(prevState => ({
      ...prevState,
      property: property
    }));
  };

  const addProductCard = () => {
    const cartItem = {
      productId: product.id,
      productName: product.nameProduct,
      image: product.image,
      price: product.price,
      size: productDetail.size,
      property: productDetail.property,
      quantity: productDetail.quantity,
    };
    const existingCart = JSON.parse(localStorage.getItem('cartItem')) || [];

    const existingItemIndex = existingCart.findIndex(item => (
      item.productId === cartItem.productId &&
      item.size === cartItem.size &&
      item.property === cartItem.property
    ));

    if (existingItemIndex !== -1) {
      const quantityInCart = parseInt(existingCart[existingItemIndex].quantity, 10);
      const newQuantity = parseInt(cartItem.quantity, 10);
      existingCart[existingItemIndex].quantity = quantityInCart + newQuantity;
    } else {
      existingCart.push(cartItem);
    }
    toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
      position: "top-right",
      autoClose: 1000
    })
    localStorage.setItem('cartItem', JSON.stringify(existingCart));

  }
  return (
    <div className="p-5 container">
      <ToastContainer position="top-right"></ToastContainer>
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CImage
            fluid
            src={product.image}
          />
        </CCol>

        <CCol md={6}>
          <CRow>
            <CCol md={12}>
              <h2>{product.nameProduct}</h2>
            </CCol>
            <CCol md={12} >
              <CFormLabel style={{ color: "#c4996b", fontSize: "20px", fontWeight: "bold" }}>Giá: {product.price}</CFormLabel>
            </CCol>
            <CCol md={12}>
              <CFormLabel>Tình trạng:<span style={{ color: "#c4996b", fontSize: "20px", fontWeight: "bold" }}>Còn hàng</span> </CFormLabel>
            </CCol>
            <CCol md={12}>
              <hr color="brown" noshade="noshade" />
            </CCol>
            <CCol md={12}>
              <CFormLabel>Màu sắc: </CFormLabel>
            </CCol>
            <CCol md={12} className="horizontal-row">
              <div className="horizontal-row">
                {product.productDetailEntities && product.productDetailEntities.length > 0 && (
                  product.productDetailEntities.map((productDetailMap, index) => (
                    <div
                      key={index}
                      className={`property-item ${productDetail.property === productDetailMap.idProperty.name ? 'selected' : ''}`}
                      onClick={() => handlePropertyClick(productDetailMap.idProperty.name)}
                    >
                      {productDetailMap.idProperty.name}
                    </div>
                  ))
                )}
              </div>
            </CCol>

            <CCol md={12}>
              <CFormLabel>Kích cỡ: </CFormLabel>
            </CCol>
            <CCol md={12}>
              <div className="horizontal-row">
                {product.productDetailEntities && product.productDetailEntities.length > 0 && (
                  product.productDetailEntities.map((productDetailMap, index) => (
                    <div
                      key={index}
                      className={`size-item ${productDetail.size === productDetailMap.idSize.name ? 'selected' : ''}`}
                      onClick={() => handleSizeClick(productDetailMap.idSize.name)}
                    >
                      {productDetailMap.idSize.name}
                    </div>
                  ))
                )}
              </div>
            </CCol>
            <CCol md={12}>
              <CFormLabel>Số lượng: </CFormLabel>
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="number"
                id="quantity"
                value={productDetail.quantity}
                defaultValue={1}
                onChange={handleInputChange}
                min={1}
              ></CFormInput>
            </CCol>
            <CCol md={12}>
              <hr color="brown" noshade="noshade" />
            </CCol>
            <CCol>
              <CButton style={{ backgroundColor: "black", border: "none", marginRight: "1%" }}>
                Mua Ngay
              </CButton>

              <CButton
                style={{ backgroundColor: "#c4996b", border: "none" }}
                onClick={() => addProductCard()}
              >
                Thêm Vào Giỏ Hàng
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow >
      <CCard>
        <CCardBody>
          <CCardTitle>Mô tả sản phẩm</CCardTitle>
          <CCardText>
            {product.descriptionDetail}
          </CCardText>
        </CCardBody>
      </CCard>
    </div >
  );
};
export default ProductDetail;
