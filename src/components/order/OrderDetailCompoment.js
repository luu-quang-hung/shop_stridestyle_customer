import { CButton, CCard, CCardBody, CCardImage, CCol, CContainer, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CImage, CInputGroup, CRow } from "@coreui/react";
import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/shopping_cart.css"
import OrderDetailSerivce from "../../services/order_detail.service";
import CurrencyFormatter from "../common/CurrencyFormatter";
const OrderCompoment = () => {
    const formatter = new CurrencyFormatter();

    const [cartItem, setCartItem] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [toDistrict, setToDistrict] = useState(null)
    const totalAmount = cartItem.reduce((total, item) => total + (item.quantity * item.price), 0);
    const totalSl = cartItem.reduce((total, item) => total + (item.quantity), 0);
    const [shipping, setShipping] = useState(null)
    useEffect(() => {
        const storedCartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        setCartItem(storedCartItem);
        getProvinces()
    }, []);

    const getProvinces = () => {
        OrderDetailSerivce.getProvinces()
            .then(res => {
                setProvinces(res.data.data)
            }).catch(err => {
                console.log(err);
            })
    }

    const handleProvinceChange = (event) => {
        const provincesId = event.target.value;
        const json = {
            province_id: parseInt(provincesId)
        }
        OrderDetailSerivce.getDistrict(json)
            .then(res => {
                setDistrict(res.data.data)
            }).catch(err => {
                console.log(err);
            })

    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        setToDistrict(districtId)
        const json = {
            district_id: parseInt(districtId)
        }
        OrderDetailSerivce.getWard(json)
            .then(res => {
                setWard(res.data.data)
            }).catch(err => {
                console.log(err);
            })
    };

    const handleWardChange = (event) => {
        const wardId = event.target.value;
        const jsonShipping = {
            service_id: 53321,
            insurance_value: parseInt(totalAmount),
            coupon: null,
            from_district_id: 3440,
            to_district_id: parseInt(toDistrict),
            to_ward_code: wardId,
            height: totalSl * 5,
            length: totalSl * 5,
            weight: totalSl * 1,
            width: totalSl * 5
        }
        OrderDetailSerivce.getShipping(jsonShipping)
            .then(res => {
                setShipping(res.data.data.total)
                console.log(res.data.data.total);
            }).catch(err => {
                console.log(err);
            })
    };
    return (
        <CContainer style={{ marginTop: "100px", marginBottom: "100px" }}>
            <CRow>

                <CCol md={1}></CCol>
                <CCol md={6}>
                    <h4>Thông tin giao hàng</h4>
                    <CForm className="row g-3 mb-3">
                        <CCol md={12} className="mb-3">
                            <CFormInput
                                type="text"
                                id="name"
                                placeholder="Họ và Tên"
                            />
                        </CCol>
                        <CCol md={8} className="mb-3">
                            <CFormInput
                                type="email"
                                id="email"
                                placeholder="Email"
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                id="telephone"
                                placeholder="Số điện thoại"
                            />
                        </CCol>
                        <CCol md={12} className="mb-3">
                            <CFormInput
                                type="text"
                                id="address"
                                placeholder="Địa chỉ"
                            />
                        </CCol>
                        <CCol md={4} className="mb-3">
                            <CFormSelect
                                className="select_form"
                                options={[
                                    'Chọn tỉnh/ thành',
                                    ...provinces.map(province => ({
                                        label: province.ProvinceName,
                                        value: province.ProvinceID,
                                    })),
                                ]}
                                onChange={handleProvinceChange}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormSelect
                                className="select_form"
                                onChange={handleDistrictChange}
                                options={[
                                    'Chọn quận/ huyện',
                                    ...district.map(district => ({
                                        label: district.DistrictName,
                                        value: district.DistrictID,
                                    })),
                                ]}
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormSelect
                                className="select_form"
                                onChange={handleWardChange}
                                options={[
                                    'Chọn phường/ xã',
                                    ...ward.map(ward => ({
                                        label: ward.WardName,
                                        value: ward.WardCode,
                                    })),
                                ]}
                            />
                        </CCol>
                    </CForm>
                    <h4>Phương thức vận chuyển</h4>
                    <CCol md={12} className="mb-3" >
                        <CFormCheck className="radioPayment" type="radio" name="radioVc" value="option1" defaultChecked />
                        <div className="cardPayment">
                            <CCardImage style={{ width: "55px" }} src="https://play-lh.googleusercontent.com/oPEbg7Lgj98vzT9qmq9sOiY-t6IR_frAY-ON7KHOBMqQpt_qxDQmom8lCWlNM1cJIIZ2" />
                            <span>Giao hàng nhanh toàn quốc()</span>
                        </div>

                    </CCol>
                    <h4>Phương thức thanh toán</h4>
                    <CCol md={12} className="mb-3" >
                        <CFormCheck className="radioPayment" type="radio" name="exampleRadios" value="option1" defaultChecked />
                        <div className="cardPayment">
                            <CCardImage style={{ width: "55px" }} src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6" />
                            <span>Thanh toán khi giao hàng (COD)</span>
                        </div>

                    </CCol>
                    <CCol md={12} className="mb-3">
                        <CFormCheck className="radioPayment" type="radio" name="exampleRadios" value="option3" />
                        <div className="cardPayment">
                            <CCardImage style={{ width: "55px" }} src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" />
                            <span>Cổng VNPAY</span>
                        </div>
                    </CCol>
                    <CCol md={12} className=" mb-3">
                        <CFormCheck className="radioPayment" type="radio" name="exampleRadios" value="option2" />
                        <div className="cardPayment">
                            <CCardImage style={{ width: "55px" }} src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6" />
                            <span>Chuyển khoản qua ngân hàng</span>
                        </div>
                    </CCol>
                    <CRow>
                        <CCol md={6} >
                            <CButton type="button"  color="info" variant="outline" style={{  border: "none" }}>Giỏ hàng</CButton>
                        </CCol>
                        <CCol md={6} style={{ textAlign: "end" }}>
                            <CButton type="button" style={{ backgroundColor: "#c4996b", border: "none" }}>Hoàn tất đơn hàng</CButton>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md={4}>
                    <CCard style={{ marginTop: "0px" }}>
                        <CCardBody>
                            {cartItem.map((cart, index) => (
                                <>
                                    <CRow key={index} className="mb-3">
                                        <CCol md={2} className="mb-3"><CImage src={cart.image} /></CCol>
                                        <CCol md={5} >
                                            <CRow>
                                                <CCol md={12} >
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
                                        <CCol md={2}><CFormLabel style={{ color: "Black", fontWeight: "bold" }}>x{cart.quantity}</CFormLabel></CCol>
                                        <CCol md={3}><CFormLabel style={{ color: "red" }}>{cart.price}</CFormLabel></CCol>
                                    </CRow>

                                </>
                            ))}
                        </CCardBody>
                        <CCol md={12}>
                            <hr color="#e1e1e1" noshade="noshade" />
                            <CInputGroup className="mb-3">
                                <CFormInput placeholder="Mã giảm giá" />
                                <CButton type="button" style={{ backgroundColor: "#c4996b", border: "none" }}>Sử dụng</CButton>
                            </CInputGroup>
                        </CCol>
                        <CCol md={12}>
                            <hr color="#e1e1e1" noshade="noshade" />

                            <CRow>
                                <CCol md={6}>Tạm tính</CCol>
                                <CCol md={6} style={{ textAlign: "end" }}>{totalAmount}</CCol>
                                <CCol md={6}>Phí vận chuyển</CCol>
                                <CCol md={6} style={{ textAlign: "end" }}>{shipping ? formatter.formatVND(shipping) : "---"}</CCol>
                            </CRow>
                            <hr color="#e1e1e1" noshade="noshade" />
                            <CRow>
                                <CCol md={6}>Tổng cộng</CCol>
                                <CCol md={6} style={{ textAlign: "end" }}>{totalAmount}</CCol>
                            </CRow>
                        </CCol>

                    </CCard>

                </CCol>
                <CCol md={1}></CCol>

            </CRow>
        </CContainer>
    );
};

export default OrderCompoment;
