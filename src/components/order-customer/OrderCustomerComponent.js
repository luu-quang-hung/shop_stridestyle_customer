import { CButton, CCard, CCardBody, CCardText, CCol, CContainer, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import orderBillService from "../../services/order-bill-service";
import PaginationCustom from "../pagination/PaginationCustom";
import CurrencyFormatter from "../common/CurrencyFormatter";
import { Button, Modal, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderCustomerComponent = () => {
    const formatter = new CurrencyFormatter();
    const [orderDetail, setOrderDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [searchBill, setSearchBill] = useState(
        {
            id_customer: JSON.parse(localStorage.getItem('customer')).id,
            page: 0,
            size: 10,

        }
    );
    const [listBill, setListBill] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const statusStyles = {
        'CHUA_XAC_NHAN': {
            backgroundColor: "#f7f6ad",
            borderRadius: "7px",
            textAlign: "center",
            color: "black",
            fontSize: "14px",
        },

        'DA_XAC_NHAN_VA_DONG_GOI': {
            backgroundColor: "#c688eb",
            borderRadius: "7px",
            textAlign: "center",
            color: "white",
            fontSize: "14px",
        },
        'DA_GIAO_BEN_VAN_CHUYEN': {
            backgroundColor: "#92b9e4",
            borderRadius: "7px",
            textAlign: "center",
            color: "white",
            fontSize: "14px",
        },
        'KHACH_DA_NHAN_HANG': {
            backgroundColor: "#19AD54",
            borderRadius: "7px",
            textAlign: "center",
            color: "white",
            fontSize: "14px",
        },
        'HUY': {
            backgroundColor: "#fe4a49",
            borderRadius: "7px",
            textAlign: "center",
            color: "white",
            fontSize: "14px",
        },
    };
    useEffect(() => {
        getOrderList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBill.page]);

    const getOrderList = () => {
        orderBillService.getOrderBill(searchBill)
            .then(res => {
                console.log(res);
                setListBill(res.data.data.content)
                setTotalPages(res.data.data.totalPages);
            })
            .catch(err => {
                console.error('Error fetching order:', err);
            })
    }

    const handlePageChange = (page) => {
        setSearchBill({ ...searchBill, page: page - 1 })
        setCurrentPage(page)
    };

    const cancelShowModal = () => {
        setShowModal(false);
    };

    const handleModal = (idBill) => {
        getBillById(idBill)
        setShowModal(true);
    };


    const getBillById = (idBill) => {
        orderBillService.findByIdBill(idBill)
            .then(res => {
                console.log(res);
                setOrderDetail(res.data);
            })
            .catch(err => {
                console.error('Error fetching bill by id:', err);
            })

    }

    const cancelOrderBill = () => {
        const json = {
            idBill: orderDetail.id,
            status: "HUY"
        }
        orderBillService.updateBill(json)
            .then(res => {
                toast.success("Hủy đơn hàng thành công", {
                    position: "top-right",
                    autoClose: 1000
                })
                getBillById()
                getOrderList()
            })
            .catch(err => {
                toast.error("Hủy đơn hàng thất bại", {
                    position: "top-right",
                    autoClose: 1000
                })
                console.error('Error fetching:', err);
            })
    }

    return (
        <CContainer style={{ marginTop: "100px", marginBottom: "100px" }}>
            <ToastContainer position="top-right"></ToastContainer>

            <h3>Quản lý đặt hàng</h3>
            <div class="table" style={{ backgroundColor: "" }}>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Trạng thái đơn hàng</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Họ Và Tên</th>
                            <th>Phương thức thanh toán</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBill.map((orders, index) => (
                            <tr key={index} onClick={() => handleModal(orders.id)}>
                                <td> {currentPage < 2
                                    ? index + 1
                                    : index + 1 + (currentPage - 1) * 10}
                                </td>
                                <td >
                                    <CCardText style={statusStyles[orders.statusShipping]}>
                                        {orders.statusShipping === 'CHUA_XAC_NHAN' && 'Chưa xác nhận'}
                                        {orders.statusShipping === 'DA_XAC_NHAN_VA_DONG_GOI' && 'Đã xác nhận và đóng gói'}
                                        {orders.statusShipping === 'DA_GIAO_BEN_VAN_CHUYEN' && 'Đã giao bên vận chuyển'}
                                        {orders.statusShipping === 'KHACH_DA_NHAN_HANG' && 'Khách đã nhận hàng'}
                                        {orders.statusShipping === 'HUY' && 'Hủy'}
                                    </CCardText>

                                </td>
                                <td>{orders.sdt}</td>
                                <td>{orders.customerEntity.email || ""}</td>
                                <td>{orders.address}</td>
                                <td>{orders.fullName}</td>
                                <td>
                                    {orders.payment === 0 && 'COD'}
                                    {orders.payment === 1 && 'VNPAY'}
                                    {orders.payment === 2 && 'Banking'}
                                </td>                    <td>{orders.createAt}</td>
                                <td>{formatter.formatVND(orders.downTotal)}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </div>
            <PaginationCustom
                currentPageP={currentPage}
                maxPageNumber={5}
                total={totalPages}
                onChange={handlePageChange}
            />

            <Modal show={showModal} onHide={cancelShowModal}
                size="xl"
                style={
                    { marginTop: "30px" }
                }
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CRow>
                        <CCol md={12} className='mb-3'>
                            <CCol >
                                {orderDetail.statusShipping === "CHUA_XAC_NHAN" ?
                                    <CButton color="danger" onClick={cancelOrderBill}>Hủy đơn hàng</CButton>
                                    : <div>
                                        <CRow>
                                            <CCol md={12}>
                                            <CFormLabel>
                                            Trạng thái đơn hàng: 
                                        </CFormLabel>
                                            </CCol>
                                            <CCol md={2}>
                                            <CCardText style={statusStyles[orderDetail.statusShipping]}>
                                            {orderDetail.statusShipping === 'DA_XAC_NHAN_VA_DONG_GOI' && 'Đã xác nhận và đóng gói'}
                                            {orderDetail.statusShipping === 'DA_GIAO_BEN_VAN_CHUYEN' && 'Đã giao bên vận chuyển'}
                                            {orderDetail.statusShipping === 'KHACH_DA_NHAN_HANG' && 'Khách đã nhận hàng'}
                                            {orderDetail.statusShipping === 'HUY' && 'Hủy'}
                                        </CCardText>
                                            </CCol>
                                        </CRow>
                                       
                                       
                                    </div>
                                }
                            </CCol>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Mã hóa đơn: " value={orderDetail.id || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Phương thức thanh toán: "
                                value={orderDetail.payment === 0 ? 'COD' :
                                    orderDetail.payment === 1 ? 'VNPAY' :
                                        orderDetail.payment === 2 ? 'Banking' :
                                            'Unknown'} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Tên người nhận: " value={orderDetail.fullName || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Số điện thoại: " value={orderDetail.sdt || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Email: " value={orderDetail.customerEntity && orderDetail.customerEntity.email || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Ngày tạo: " value={orderDetail.createAt || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={6} className='mb-3'>
                            <CFormInput className='inputDetail' label="Địa chỉ: " value={orderDetail.address || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Tổng tiền sản phẩm: " value={formatter.formatVND(orderDetail.total) || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Phí giao hàng: " value={formatter.formatVND(orderDetail.transportFee) || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput
                                className='inputDetail'
                                label="Mã giảm giá: "
                                value={
                                    (orderDetail.voucherEntities &&
                                        orderDetail.voucherEntities[0] &&
                                        orderDetail.voucherEntities[0].amount &&
                                        orderDetail.voucherEntities[0].name) ? (
                                        formatter.formatVND(orderDetail.voucherEntities[0].amount) +
                                        "_" +
                                        orderDetail.voucherEntities[0].name
                                    ) : "Không có"
                                }
                                readOnly
                            ></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                            <CFormInput className='inputDetail' label="Tổng tiền thực nhận: " value={formatter.formatVND(orderDetail.downTotal) || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={3} className='mb-3'>
                        <CFormInput className='inputDetail' label="Mã Vận Đơn GHN: " value={orderDetail.orderCode || null} readOnly></CFormInput>
                        </CCol>
                        <CCol md={7} className='mb-3'>
                            <CFormTextarea className='inputDetail' label="Ghi chú: " value={orderDetail.note || null} readOnly></CFormTextarea>
                        </CCol>
                    </CRow>
                    <Table bordered hover responsive>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Màu</th>
                                <th>Kích cỡ</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Đơn giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.oderDetailEntities && orderDetail.oderDetailEntities.map((orders, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{orders.productDetailEntities.idProduct.nameProduct || null}</td>
                                    <td>{orders.productDetailEntities.idProperty.name || null}</td>
                                    <td>{orders.productDetailEntities.idSize.name}</td>
                                    <td>{orders.quantity_oder}</td>
                                    <td>{formatter.formatVND(orders.productDetailEntities.idProduct.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelShowModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </CContainer>
    )
}

export default OrderCustomerComponent;