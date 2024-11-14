// "use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminOrderManagement = () => {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/orders');
//                 setOrders(response.data);
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//                 setError('Failed to fetch orders');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleStatusChange = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`http://localhost:3000/orders/${orderId}/status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: newStatus }) // Chỉ gửi trạng thái
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             // Cập nhật trạng thái đơn hàng trong state
//             setOrders(orders.map(order =>
//                 order._id === orderId ? { ...order, status: newStatus } : order
//             ));
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             setError('Failed to update status');
//         }
//     };
    

//     const handleDeleteOrder = async (orderId) => {
//         if (window.confirm('Are you sure you want to delete this order?')) {
//             try {
//                 await axios.delete(`http://localhost:3000/orders/${orderId}`);
//                 setOrders(orders.filter(order => order._id !== orderId));
//                 if (selectedOrder && selectedOrder._id === orderId) {
//                     setSelectedOrder(null);
//                 }
//             } catch (error) {
//                 console.error('Error deleting order:', error);
//                 setError('Failed to delete order');
//             }
//         }
//     };

//     if (isLoading) return <p>Loading...</p>;

//     return (
//         <div className="container mt-5">
//             <h1>Order Management</h1>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <table className="table table-striped table-bordered">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Total Amount</th>
//                         <th>Shipping Address</th>
//                         <th>Payment Method</th>
//                         <th>Status</th>
//                         <th>Update Status</th>
//                         <th>Details</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map(order => (
//                         <tr key={order._id}>
//                             <td>{order._id}</td>
//                             <td>{order.totalAmount.toFixed(2)} đ</td>
//                             <td>
//                                 {order.shippingAddress.street}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
//                             </td>
//                             <td>{order.paymentMethod}</td>
//                             <td>{order.status}</td>
//                             <td>
//                                 <select
//                                     className="form-select"
//                                     value={order.status}
//                                     onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                                 >
//                                     <option value="">Chọn trạng thái</option>
//                                     <option value="pending">Đang chờ xử lý</option>
//                                     <option value="processing">Đang xử lý</option>
//                                     <option value="shipped">Đã giao hàng</option>
//                                     <option value="delivered">Đã giao tận nơi</option>
//                                     <option value="cancelled">Đã hủy</option>
//                                 </select>
//                             </td>
//                             <td>
//                                 <button
//                                     className="btn btn-info"
//                                     onClick={() => setSelectedOrder(order)}
//                                 >
//                                     Xem Chi Tiết
//                                 </button>
//                             </td>
//                             <td>
//                                 <button
//                                     className="btn btn-danger"
//                                     onClick={() => handleDeleteOrder(order._id)}
//                                 >
//                                     Xóa
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedOrder && (
//                 <div className="mt-4">
//                     <h2>Chi Tiết Đơn Hàng</h2>
//                     <ul>
//                         {selectedOrder.details && selectedOrder.details.map(product => (
//                             <li key={product._id}>
//                                 <strong>Product ID:</strong> {product.name} <br />
//                                 <strong>Số lượng:</strong> {product.quantity} <br />
//                                 <strong>Giá:</strong> {product.price.toFixed(2)} đ
//                             </li>
//                         ))}
//                     </ul>
//                     <button
//                         className="btn btn-secondary mt-3"
//                         onClick={() => setSelectedOrder(null)}
//                     >
//                         Đóng Chi Tiết
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminOrderManagement;
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/orders');
                setOrders(response.data);
                setFilteredOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchTotalIncome = async () => {
            try {
                const response = await axios.get('http://localhost:3000/orders/incomes/total');
                setTotalIncome(response.data.total);
            } catch (error) {
                console.error('Error fetching total income:', error);
                setError('Failed to fetch total income');
            }
        };

        fetchOrders();
        fetchTotalIncome();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Failed to update status');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`http://localhost:3000/orders/${orderId}`);
                setOrders(orders.filter(order => order._id !== orderId));
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder(null);
                }
            } catch (error) {
                console.error('Error deleting order:', error);
                setError('Failed to delete order');
            }
        }
    };

    const handleFilterByStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/orders/status/${status}`);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders by status:', error);
            setError('Failed to fetch orders by status');
        }
    };

    const handleFilterByDate = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/orders/date/${date}`);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders by date:', error);
            setError('Failed to fetch orders by date');
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>Order Management</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-4">
                <h2>Tổng Doanh Thu</h2>
                <p>{totalIncome.toLocaleString()} đ</p>
            </div>
            
            <div className="mb-4">
                <h2>Lọc Đơn Hàng</h2>
                <div className="mb-2">
    <select
        className="form-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    >
        <option value="">Chọn trạng thái</option>
        <option value="pending">Đang chờ xử lý</option>
        <option value="processing">Đang xử lý</option>
        <option value="shipped">Đã giao hàng</option>
        <option value="delivered">Đã giao tận nơi</option>
        <option value="cancelled">Đã hủy</option>
    </select>
    <button className="btn btn-primary ml-2" onClick={handleFilterByStatus}>
        Lọc Theo Trạng Thái
    </button>
</div>
                <div className="mb-2">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <button className="btn btn-primary ml-2" onClick={handleFilterByDate}>
                        Lọc Theo Ngày
                    </button>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Total Amount</th>
                        <th>Shipping Address</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Update Status</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.totalAmount.toFixed(2)} đ</td>
                            <td>
                                {order.shippingAddress.street}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                            </td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.status}</td>
                            <td>
                                <select
                                    className="form-select"
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="">Chọn trạng thái</option>
                                    <option value="pending">Đang chờ xử lý</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="shipped">Đã giao hàng</option>
                                    <option value="delivered">Đã giao tận nơi</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-info"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    Xem Chi Tiết
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteOrder(order._id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="mt-4">
                    <h2>Chi Tiết Đơn Hàng</h2>
                    <ul>
                        {selectedOrder.details && selectedOrder.details.map(product => (
                            <li key={product._id}>
                                <strong>Product ID:</strong> {product.name} <br />
                                <strong>Số lượng:</strong> {product.quantity} <br />
                                <strong>Giá:</strong> {product.price.toFixed(2)} đ
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-secondary mt-3"
                        onClick={() => setSelectedOrder(null)}
                    >
                        Đóng Chi Tiết
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminOrderManagement;
