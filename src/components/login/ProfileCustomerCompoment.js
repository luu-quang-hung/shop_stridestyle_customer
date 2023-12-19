import { CButton, CCol, CContainer, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React, { Component, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  const customer = JSON.parse(localStorage.getItem('customer'));
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
  }, []);

  const handleUpdate = () => {
    toast.success("Cập nhật thành thành công", {
      position: "top-right",
      autoClose: 1000
    })
    setEditMode(false);
  };


  return (
    <>
      <ToastContainer position="top-right"></ToastContainer>

      <CContainer style={{ marginTop: "110px" }} >
        <h2>Quản lý tài khoản</h2>
        <div className="row justify-content-md-center">
          <CCol xs lg={3}>
            <CRow>
              <CCol md={12}>
                <CFormInput label="Mã khách hàng" value={customer.id || null} disabled />
              </CCol>
              <CCol md={12}>
                <CFormInput label="User Name" value={customer.userEntity.username || null} disabled/>
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Họ và tên"
                  value={customer.fullName || ''}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Email"
                  value={customer.userEntity.email || ''}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Số điện thoại"
                  value={customer.userEntity.phone || ''}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CFormInput
                  label="Địa chỉ"
                  value={customer.address || ''}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12} style={{ textAlign: 'end' }} className="mb-3">
                {editMode ? (
                  <CButton
                    style={{ backgroundColor: '#c4996b', border: 'none' }}
                    onClick={handleUpdate}
                  >
                    Lưu
                  </CButton>
                ) : (
                  <CButton
                    style={{ backgroundColor: '#c4996b', border: 'none' }}
                    onClick={() => setEditMode(true)}
                  >
                    Cập nhật
                  </CButton>
                )}
              </CCol>

            </CRow>
          </CCol>
        </div>
      </CContainer>

    </>
  )
}

export default Profile;