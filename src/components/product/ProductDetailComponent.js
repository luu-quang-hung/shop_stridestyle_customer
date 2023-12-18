import React, { useState, useEffect } from "react";
import { CRow, CCol, CButton, CImage, CFormInput, CFormLabel, CCard, CCardBody, CCardTitle, CCardText } from "@coreui/react";
import productService from "../../services/product.service";
import { useParams } from 'react-router-dom';
import "../css/product_detail.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyFormatter from "../common/CurrencyFormatter";
const ProductDetail = () => {
  const formatter = new CurrencyFormatter();
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState({
    nameProduct: null,
    size: null,
    property: null,
    quantity: 1
  });
  const [quantityProduct, setQuantityProduct] = useState(0)
  const [size, setSize] = useState([]);
  const [property, setProperty] = useState([]);
  useEffect(() => {
    getProducId();
    getProperty();
    window.scroll(0, 0)

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

  const getProperty = () => {
    const jsonPage = {
      page: 0,
      size: 1000
    }
    productService.findAllSize(jsonPage)
      .then(res => {
        setSize(res.data.content)
      })
      .catch(error => {
        console.log("Error load data Trademark", error);
      })

    productService.findAllProperty(jsonPage)
      .then(res => {
        setProperty(res.data.content)

      })
      .catch(error => {
        console.log("Error load data Trademark", error);
      })
  }


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
    const payload = { ...productDetail }
    payload.size = size;
    payload.nameProduct = product.id;
    if (productDetail.property != null && productDetail.size != null) {
      productService.findQuantityByName(payload)
        .then(res => {
          console.log(res);
          if (res.data.data === null) {
            setQuantityProduct(0)
          } else {
            setQuantityProduct(res.data.data.quantity)

          }
        }).catch(err => {
          console.log(err);
        })
    } else {
      setQuantityProduct(0)

    }
  };

  const handlePropertyClick = (property) => {

    setProductDetail(prevState => ({
      ...prevState,
      property: property.name
    }));
    
    const payload = { ...productDetail }
    payload.property = property.name;
    payload.nameProduct = product.id;
    if (productDetail.property != null && productDetail.size != null) {
      productService.findQuantityByName(payload)
        .then(res => {
          console.log(res);
          if (res.data.data === null) {
            setQuantityProduct(0)
          } else {
            setQuantityProduct(res.data.data.quantity)

          }
        }).catch(err => {
          console.log(err);
        })
    } else {
      setQuantityProduct(0)

    }

  };

  const addProductCard = () => {
    const cartItem = {
      orderDetailId: productDetail.id,
      productName: product.nameProduct,
      image: product.image,
      price: product.price,
      size: productDetail.size,
      property: productDetail.property,
      quantity: productDetail.quantity,
      productId: product.id
    };
    const existingCart = JSON.parse(localStorage.getItem('cartItem')) || [];

    const existingItemIndex = existingCart.findIndex(item => (
      item.orderDetailId === cartItem.orderDetailId &&
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

  console.log(productDetail);
  return (
    <div className="p-5 container">
      <ToastContainer position="top-right"></ToastContainer>
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CImage
            fluid
            src={product.image || ""}
          />
        </CCol>

        <CCol md={6}>
          <CRow>
            <CCol md={12}>
              <h2>{product.nameProduct}</h2>
            </CCol>
            <CCol md={12} >
              <CFormLabel style={{ color: "#c4996b", fontSize: "20px", fontWeight: "bold" }}>Giá: {formatter.formatVND(product.price)}</CFormLabel>
            </CCol>
            <CCol md={12} >
              <CFormLabel>{product.description}
              </CFormLabel>
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
                {
                  property.map((productDetailMap, index) => (
                    <div
                      key={index}
                      className={`property-item ${productDetail.property === productDetailMap.name ? 'selected' : ''}`}
                      onClick={() => handlePropertyClick(productDetailMap)}
                    >
                      {productDetailMap.name}
                    </div>
                  )
                  )}
              </div>
            </CCol>

            <CCol md={12}>
              <CFormLabel>Kích cỡ: </CFormLabel>
            </CCol>
            <CCol md={12}>
              <div className="horizontal-row">
                {
                  size.map((productDetailMap, index) => (
                    <div
                      key={index}
                      className={`size-item ${productDetail.size === productDetailMap.name ? 'selected' : ''}`}
                      onClick={() => handleSizeClick(productDetailMap.name)}
                    >
                      {productDetailMap.name}
                    </div>
                  )
                  )}
              </div>
            </CCol>
            <CCol md={2}>
              <CFormLabel>Số lượng: </CFormLabel>
            </CCol>
            <CCol md={10}>
              <CFormLabel>Tồn Kho: </CFormLabel>
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
            <CCol md={2}>
              <CFormInput
                type="number"
                id="quantity"
                value={quantityProduct}
                readOnly
                disabled
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
