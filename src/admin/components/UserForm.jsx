"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userId, onUserUpdated }) => {
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
        </form>
    );
};

export default UserForm;
