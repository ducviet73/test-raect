"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// UserForm Component
const UserForm = ({ userId, onUserUpdated, onClose }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'user'
    });

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Có lỗi xảy ra:", error));
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = userId ? axios.put(`http://localhost:3000/users/${userId}`, user) : axios.post('http://localhost:3000/users', user);
        request.then(response => {
            onUserUpdated();
        }).catch(error => console.error("Có lỗi xảy ra:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" className="form-control" value={user.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" className="form-control" value={user.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" className="form-control" value={user.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Role</label>
                <select name="role" className="form-control" value={user.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
        </form>
    );
};

// RoleUpdateForm Component
const RoleUpdateForm = ({ userId, onRoleUpdated, onClose }) => {
    const [role, setRole] = useState('user');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/users/${userId}`)
                .then(response => setRole(response.data.role))
                .catch(error => console.error("Có lỗi xảy ra:", error));
        }
    }, [userId]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/users/${userId}`, { role })
            .then(response => {
                onRoleUpdated();
            })
            .catch(error => console.error("Có lỗi xảy ra:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Role</label>
                <select name="role" className="form-control" value={role} onChange={handleRoleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Update Role</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
        </form>
    );
};

// UserList Component
const UserListWithRoleUpdate = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        admins: 0,
        regularUsers: 0,
    });
    const [showForm, setShowForm] = useState(false);
    const [showRoleUpdateForm, setShowRoleUpdateForm] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatingRoleUserId, setUpdatingRoleUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                const userList = response.data;
                setUsers(userList);
                setUserStats({
                    totalUsers: userList.length,
                    admins: userList.filter(user => user.role === 'admin').length,
                    regularUsers: userList.filter(user => user.role === 'user').length,
                });
            } catch (error) {
                console.error("Có lỗi xảy ra:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await axios.delete(`http://localhost:3000/users/${id}`);
                alert('Người dùng đã được xóa thành công.');
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                setUserStats(prevStats => ({
                    ...prevStats,
                    totalUsers: prevStats.totalUsers - 1,
                    admins: prevStats.admins - (prevUsers.find(user => user._id === id)?.role === 'admin' ? 1 : 0),
                    regularUsers: prevStats.regularUsers - (prevUsers.find(user => user._id === id)?.role === 'user' ? 1 : 0),
                }));
            } catch (error) {
                console.error("Có lỗi xảy ra khi xóa người dùng:", error);
                alert('Có lỗi xảy ra khi xóa người dùng. Vui lòng thử lại.');
            }
        }
    };

    const handleAddUserClick = () => {
        setEditingUserId(null); // Clear the editing user ID
        setShowForm(true); // Show the form
    };

    const handleEditUserClick = (userId) => {
        setEditingUserId(userId); // Set the user ID for editing
        setShowForm(true); // Show the form
    };

    const handleRoleUpdateClick = (userId) => {
        setUpdatingRoleUserId(userId);
        setShowRoleUpdateForm(true);
    };

    const handleUserUpdated = () => {
        setShowForm(false); // Hide the form after updating
        setUsers(prevUsers => [...prevUsers]); // Trigger re-render
    };

    const handleRoleUpdated = () => {
        setShowRoleUpdateForm(false);
        setUsers(prevUsers => [...prevUsers]); // Trigger re-render
    };

    const handleCloseForm = () => {
        setShowForm(false); // Hide the form without saving
    };

    const handleCloseRoleUpdateForm = () => {
        setShowRoleUpdateForm(false); // Hide the role update form without saving
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Danh sách Người Dùng</h2>
            <div className="mb-4">
                <button className="btn btn-primary mb-3" onClick={handleAddUserClick}>
                    Thêm Người Dùng
                </button>
                <h4>Thống Kê Người Dùng</h4>
                <p><strong>Tổng số người dùng:</strong> {userStats.totalUsers}</p>
                <p><strong>Quản trị viên:</strong> {userStats.admins}</p>
                <p><strong>Người dùng bình thường:</strong> {userStats.regularUsers}</p>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEditUserClick(user._id)}>Sửa</button>
                                <button className="btn btn-info btn-sm ml-2" onClick={() => handleRoleUpdateClick(user._id)}>Cập nhật Role</button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteUser(user._id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showForm && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingUserId ? 'Chỉnh sửa Người Dùng' : 'Thêm Người Dùng'}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseForm}></button>
                            </div>
                            <div className="modal-body">
                                <UserForm userId={editingUserId} onUserUpdated={handleUserUpdated} onClose={handleCloseForm} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showRoleUpdateForm && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập nhật Role</h5>
                                <button type="button" className="btn-close" onClick={handleCloseRoleUpdateForm}></button>
                            </div>
                            <div className="modal-body">
                                <RoleUpdateForm userId={updatingRoleUserId} onRoleUpdated={handleRoleUpdated} onClose={handleCloseRoleUpdateForm} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserListWithRoleUpdate;
