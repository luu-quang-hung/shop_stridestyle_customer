import React, { useState, useEffect } from "react";
import { CRow, CCol, CButton, CImage, CFormInput, CFormLabel, CCard, CCardBody, CCardTitle, CCardText } from "@coreui/react";
import productService from "../../services/product.service";
import { useParams } from 'react-router-dom';
const ProductDetail = () => {

  let { productId } = useParams();


  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = ([])

  useEffect(() => {
    getProducId();
  }, [])

  const getProducId = () => {
    productService.getProductByID(productId).then((res) => {
      setProducts(res.data.data[0])
      setProductDetail(res.data.data[0].productDetailEntities);
      console.log(res.data);
      return
    })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="p-5 container">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CImage
            fluid
            src={products.image}
          />
        </CCol>
        <CCol md={6}>
          <CRow>
            <CCol md={12}>
              <h2>{products.nameProduct}</h2>
            </CCol>
            <CCol md={12} >
              <CFormLabel style={{ color: "#c4996b", fontSize: "20px", fontWeight: "bold" }}>Giá: {products.price}</CFormLabel>
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
            <CCol md={12}>
              {/* <ul>
                {productDetail.map((productDetail) => (
                  <li key={productDetail.id}>{productDetail.idSize.name}</li>
                ))}
              </ul> */}
            </CCol>
            <CCol md={12}>
              <CFormLabel>Kích cỡ: </CFormLabel>
            </CCol>
            <CCol md={12}>
              {/* <ul>
                {productDetail.map((productDetail) => (
                  <li key={productDetail.id}>{productDetail.idSize.name}</li>
                ))}
              </ul> */}
            </CCol>
            <CCol md={12}>
              <hr color="brown" noshade="noshade" />
            </CCol>
            <CCol>
              <CButton style={{ backgroundColor: "black", border: "none", marginRight: "1%" }}>
                Mua Ngay
              </CButton>

              <CButton style={{ backgroundColor: "#c4996b", border: "none" }}>
                Thêm Vào Giỏ Hàng
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <CCardTitle>Mô tả sản phẩm</CCardTitle>
          <CCardText>
            {products.descriptionDetail}
          </CCardText>
        </CCardBody>
      </CCard>
    </div>
  );
};
export default ProductDetail;
