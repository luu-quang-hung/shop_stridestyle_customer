import React, { useState,useEffect } from "react";
import { CRow, CCol, CButton, CImage, CFormInput } from "@coreui/react";
import productService from "../../services/product.service";

const ProductDetail = () => {
  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducId();
  })

  const getProducId = () => {
    productService.getProductByID(1).then((res) => {
      setProducts(res.data)
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  };

  return (
    <div className="p-5 container">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CImage
            fluid
            src="https://sneakerdaily.vn/wp-content/uploads/2023/10/Giay-Air-Jordan-12-Retro-Cherry-2023-CT8013-116-7.jpg"
          />
        </CCol>
        <CCol md={6}>
          <CRow>
            <CCol md={12}>
              <h4>{products.nameProduct}</h4>
            </CCol>

            <CCol md={12}>
              <h3 className="text-danger">giá tiền </h3>
            </CCol>

            <CCol md={12}>
              <h3>size : </h3>
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                min="1"
                className="form-control quantity-selector"
                size="lg"
              />
            </CCol>

            <CButton
              className="mr-3"
              color="success"
              variant="outline"
              size="lg"
            >
              Thêm Vào Giỏ Hàng
            </CButton>

            <CButton color="warning" variant="outline" size="lg">
              Mua Ngay
            </CButton>
          </CRow>
        </CCol>
      </CRow>
    </div>
  );
};
export default ProductDetail;
