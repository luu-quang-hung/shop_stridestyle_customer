import React, { Component, useState, useEffect } from "react";
import "../css/shopping_cart.css"
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCardTitle, CCol, CContainer, CFormInput, CFormLabel, CImage, CListGroup, CListGroupItem, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ShoppingCart = () => {
  const navigate = useNavigate();

  const [cartItem, setCartItem] = useState([]);
  const totalAmount = cartItem.reduce((total, item) => total + (item.quantity * item.price), 0);

  useEffect(() => {
    const storedCartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
    setCartItem(storedCartItem);
  }, []);


  const deleteProductCard = (indexToRemove) => {
    const updatedCartItem = [...cartItem];
    updatedCartItem.splice(indexToRemove, 1);
    
    setCartItem(updatedCartItem);
    localStorage.setItem('cartItem', JSON.stringify(updatedCartItem));
  };

  const checkOutCart = () => {
    navigate(`/checkout`);
  }
  return (
    <CContainer>
      <CRow>
        <CCol md={8}>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol md={7} className="mb-3">Sản phẩm</CCol>
                <CCol md={2}>Số lượng</CCol>
                <CCol md={2}>Đơn giá</CCol>
                <CCol md={1}></CCol>
              </CRow>
              {cartItem.map((cart, index) => (
                <>
                  <hr color="brown" noshade="noshade" />
                  <CRow key={index}>
                    <CCol md={2} className="mb-3"><CImage src={cart.image} /></CCol>
                    <CCol md={5}>
                      <CRow>
                        <CCol md={12}>
                          {cart.productName}
                        </CCol>
                        <CCol md={12}>
                          {cart.property}
                        </CCol>
                        <CCol md={12}>
                          {cart.size}
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol md={2}><CFormInput value={cart.quantity} type="number" /></CCol>
                    <CCol md={2}><CFormLabel style={{ color: "red" }}>{cart.price}</CFormLabel></CCol>
                    <CCol md={1}><AiFillDelete onClick={() => deleteProductCard(index)} /></CCol>
                  </CRow></>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard >
            <CCardHeader style={{ fontSize: "21px" }}>Thông tin đơn hàng</CCardHeader>
            <CCardBody>
              <CCardTitle>Tổng tiền: <span style={{ color: "red", fontSize: "21px" }}>{totalAmount} đ </span></CCardTitle>
              <CCardText>Phí vận chuyển sẽ được tính ở trang thanh toán.</CCardText>
            </CCardBody>
            <CCardFooter className="text-center">
              <CRow>
                <CCol md={12} className="mb-3">
                  <CButton style={{ width: "327px" }} color="dark" onClick={checkOutCart}>Thanh toán ngay</CButton>
                </CCol>
                <CCol md={12}>
                  <CButton color="light" style={{ width: "327px" }} >Tiếp tục mua hàng</CButton>
                </CCol>
              </CRow>

            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );

}
export default ShoppingCart

