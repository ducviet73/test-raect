import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from 'react-router-dom';
import Category from "../category"; // Adjust import path as necessary

const Header = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCartPreview, setShowCartPreview] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const cartItems = useSelector(state => state.cart.items) || [];
  const uniqueProductIds = new Set(cartItems.map(item => item._id));
  const cartCount = uniqueProductIds.size;

  return (
    <div>
      <header className="position-relative bg-white border">
        <div className="bg-black d-none d-sm-block">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-6 pt-3">
                <p className="text-white fs-8">
                  <img
                    src="https://file.hstatic.net/1000402464/file/output-onlinegiftools_9bbbf15c266044699bca3a5635e05246.gif"
                    width="30px"
                    alt=""
                  />{" "}
                  Nền tảng đấu giá hàng đầu Việt Nam
                </p>
              </div>
              <div className="col-md-6 pt-1 d-flex align-items-end justify-content-end">
                <p className="fs-8">
                  <i className="bi bi-telephone-fill me"></i> HOTLINE: 0987654321{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-2 d-flex justify-content-between align-items-center">
          <div>
            <img src="/img/logoK.jpg" className="d-block w-100" alt="..." />
          </div>
          <nav className="navbar navbar-expand-lg bg-white p-2 d-flex flex-column">
            <div className="container px-0 mx-0">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-uppercase">
                  <li className="nav-item">
                    <Link className="nav-link text-black" to="/">
                      Trang chủ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-black" to="/">
                      giới thiệu
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="../products"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      sản phẩm
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="../products">
                          Tất cả sản phẩm
                        </a>
                      </li>
                      <Category />
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black">tin tức</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-black">liên hệ</a>
                  </li>
                </ul>
              </div>
              <form className="d-flex ms-4" action="/search">
                <input
                  className="form-control me-2"
                  name="keyword"
                  placeholder="Nhập tên sản phẩm"
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </nav>
          <div className="d-flex align-items-center ms-5">
            <div
              id="cart"
              className="position-relative d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10 px-2 py-1"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <Link to="../cart">
                <i className="bi bi-cart fs-5 fw-bolder text-dark" />
              </Link>
              <div className="">
                <span
                  id="amount-cart"
                  className="text-white position-absolute top-0 start-75 translate-middle bg-success px-2 rounded-circle"
                >
                  {cartCount}
                </span>
              </div>
            </div>
            {showCartPreview && (
              <div
                className="cart-preview position-absolute top-100 end-0 bg-white shadow-sm p-2 mt-1"
                style={{
                  width: '250px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                }}
              >
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <img
                          src={`http://localhost:3000/img/${item.image}`}
                          alt={item.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                          }}
                          className="me-2"
                        />
                        <div>
                          <p className="mb-0 font-weight-bold">{item.name}</p>
                          <small>
                            {item.quantity} x{' '}
                            {item.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </small>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-3">
                      <Link to="/cart" className="btn btn-primary btn-sm">
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-center mb-0">Giỏ hàng trống</p>
                )}
              </div>
            )}
          </div>
          <div
            id="account"
            className="d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10 mx-2 px-2 py-1"
          >
            
            <li className="nav-item dropdown taikhoan-icon">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Đăng nhập
                <i className="bi bi-person-circle fs-5 fw-bolder text-dark" />{' '}
                <span>{user ? `${user.username}` : ""}</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/register">
                    Đăng ký
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../login">
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Thoát
                  </button>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
