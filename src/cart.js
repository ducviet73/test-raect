//src/cart.js

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/counterSlice'; // Adjust path as necessary
import { useHistory } from 'react-router-dom';
import "../public/bootstrap/css/cart.css";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items) || [];
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user);

    const handleRemoveFromCart = (itemId, size, color) => {
        dispatch(removeFromCart({ _id: itemId, size, color }));
    };

    const handleCheckout = () => {
        if (user) {
            if (cartItems.length === 0) {
                alert("Giỏ hàng của bạn không có sản phẩm để thanh toán.");
                return;
            }
            history.push('/checkout');
        } else {
            alert("Vui lòng đăng nhập trước khi thanh toán.");
            history.push('/login');
        }
    };

    const total = useMemo(() => 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
        [cartItems]
    );

    return (
        <div className="container">
            <h3>Giỏ hàng của bạn</h3>
            <div className="thongtin-sp">
                <ul className="thongtin-all">
                    <li>Sản phẩm</li>
                    <li>Đơn giá</li>
                    <li>Số lượng</li>
                    <li>Thành tiền</li>
                    <li>Xóa</li>
                </ul>
            </div>
            <form action="#">
                <table>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr className="thanhtoan-all" key={`${item._id}-${item.size}-${item.color}`}>
                                <td className="thanhtoan-1">
                                    <img src={`http://localhost:3000/img/${item.image}`} alt={item.name} />
                                </td>
                                <td className="thanhtoan-2">
                                    <span className="ten-sp">{item.name}</span>
                                    <span className="size-th">Phiên bản: {item.size} / {item.color}</span>
                                    <span className="size-th">Thương hiệu: NEM</span>
                                </td>
                                <td className="thanhtoan-3">
                                    <p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </td>
                                <td className="thanhtoan-4">
                                    <div className="thanhtoan-4-1">
                                        <input
                                            min="1"
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => dispatch(updateCartItemQuantity({ _id: item._id, size: item.size, color: item.color, quantity: parseInt(e.target.value, 10) }))}
                                        />
                                    </div>
                                </td>
                                <td className="thanhtoan-5">
                                    {(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </td>
                                <td className="thanhtoan-6">
                                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id, item.size, item.color)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
            <div className="ghichu-all">
                <div className="ghichu">
                    <div className="ghichu-1">
                        <textarea
                            id="note"
                            name="note"
                            rows="4"
                            cols="50"
                            placeholder="Ghi chú"
                        ></textarea>
                    </div>
                    <div className="ghichu-2">
                        <div className="tong-all">
                            <p className="tong">Tổng: <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                        </div>
                        <div className="thanhtoan-btn">
                            <button className="thanhtoan-btn-1">Cập nhật giỏ hàng</button>
                            <button className="thanhtoan-btn-2" onClick={handleCheckout}>
                                Tiến hành thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tieptuc">
                <Link to="/">
                    <p><i className="fa-solid fa-reply"></i>Tiếp tục mua hàng</p>
                </Link>
            </div>
        </div>
    );
};

export default CartPage;
