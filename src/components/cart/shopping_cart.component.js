import React, { Component, useState, useEffect } from "react";
import "../css/shopping_cart.css"
const ShoppingCart = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.idProduct !== itemId);
    setCartItems(updatedCart);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    resetCart();
  };

  const resetCart = () => {
    setCartItems([]); // Reset lại giỏ hàng t                                                                 rong state
    sessionStorage.removeItem('cartItems'); // Xóa dữ liệu trong sessionStorage
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Bảng giỏ hàng sẽ hiển thị bên phải */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Địa chỉ giao hàng</h2>
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">Thành phố</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Nhập thành phố"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="zipCode">Mã bưu điện</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder="Nhập mã bưu điện"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Nhập địa chỉ email"
            />
          </div>

          <button style={{
            marginLeft: "550px",
            height: "60px"
          }} type="submit" className="btn btn-primary">
            Hoàn tất đặt hàng
          </button>
        </form>
      </div>

      {/* Form điền thông tin nhận hàng sẽ hiển thị bên trái */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Giỏ hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng rỗng.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="cart_table" key={item.idProduct}>
                  <td scope="row" style={{ width: "100px" }}>{item.name}</td>
                  <td scope="row" style={{ width: "100px" }}>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td scope="row">{item.price} ₫</td>
                  <td scope="row">{item.quantity}</td>
                  <td scope="row">{item.price * item.quantity} ₫</td>
                  <td scope="row">
                    <button onClick={() => handleRemoveItem(item.idProduct)}>
                      Xóa
                    </button>
                  </td>

                </tr>

              ))}
            </tbody>
          </table>
        )}
        <div>

        </div>
      </div>

    </div>
  );

}
export default ShoppingCart