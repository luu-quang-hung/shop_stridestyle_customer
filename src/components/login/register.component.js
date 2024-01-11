import React, { Component, useState } from "react";


import AuthService from "../../services/auth.service";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import userService from "../../services/user.service";


const Register = () => {
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: ''
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    if (!value) {
      return 'This field is required';
    }
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Email address is invalid';
        }
        break;
      case 'password':
        if (value.length < 6) {
          return 'Password must be 6 characters or more';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      if (formData.password !== formData.confirmPassword) {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
      }
    }

    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        setErrors(prevErrors => ({ ...prevErrors, [key]: error }));
        valid = false;
      }
    });
    if (valid) {
      console.log(formData);
      userService.createCustomer(formData)
        .then(res => {
          console.log(res);
          alert("Đăng kí thành công");
          window.location.href("/login")
        }).catch(err => {
          alert("Đăng kí thất bại");
        })


    }
  };

  return (
    <CCard className="text-center" style={{ width: "600px" }}>
      <CCardHeader>Đăng ký</CCardHeader>
      <CCardBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          {errors.address && <div className="text-danger">{errors.address}</div>}

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          {errors.fullName && <div className="text-danger">{errors.fullName}</div>}

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}

          </div>
          <button type="submit" style={{ width: "60%" }} className="btn btn-primary">Đăng ký</button>
        </form>
      </CCardBody>
    </CCard>
  );
};
export default Register;
