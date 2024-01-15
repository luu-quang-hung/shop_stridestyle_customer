import { CButton, CCol, CContainer, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React, { Component, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from "../../services/user.service";
const Profile = () => {

  const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer')));
  const [editMode, setEditMode] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {

  }, []);


  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setCustomer((prevCustomer) => {
      let updatedCustomer = { ...prevCustomer, [field]: value };

      if (field === 'passWord' && !value) {
        const { passWord, ...rest } = updatedCustomer;
        updatedCustomer = rest;
      }

      if (field === 'confirmPassword' && !value) {
        const { confirmPassword, ...rest } = updatedCustomer;
        updatedCustomer = rest;
      }
       if (field === 'passWord' || field === 'confirmPassword') {
      setPasswordsMatch(updatedCustomer.passWord === updatedCustomer.confirmPassword);
    }

      return updatedCustomer;
    });

   
  };

  const handleUpdate = () => {
    if (!passwordsMatch) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp", {
        position: "top-right",
        autoClose: 1000
      })
      return;
    }
    userService.updateCustomer(customer)
      .then(res => {
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 1000
        })
        setEditMode(false);
      }).catch(err => {
        console.log(err);
        toast.error("Cập nhật thật bại", {
          position: "top-right",
          autoClose: 1000
        })
      })
  };
  console.log(customer);
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
                <CFormInput label="User Name" value={customer.userEntity.username || null} disabled />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Họ và tên"
                  value={customer.fullName || ''}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Mật khẩu"
                  value={customer.passWord || ''}
                  onChange={(e) => handleInputChange(e, 'passWord')}
                  disabled={!editMode}
                />

              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Xác nhận mật khẩu"
                  value={customer.confirmPassword || ''}
                  onChange={(e) => handleInputChange(e, 'confirmPassword')}
                  disabled={!editMode}
                />
                {!passwordsMatch && <p style={{ color: 'red' }}>Mật khẩu không khớp</p>}
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Email"
                  value={customer.email || ''}
                  onChange={(e) => handleInputChange(e, 'email')}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="Số điện thoại"
                  value={customer.phone || ''}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  disabled={!editMode}
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CFormInput
                  label="Địa chỉ"
                  value={customer.address || ''}
                  onChange={(e) => handleInputChange(e, 'address')}
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