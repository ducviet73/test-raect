//src/info/page.js
import React, { useState, useEffect } from 'react';

export default function Info() {
  // Get token from browser cookie
  const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
  const tokenValue = token?.split('=')[1];

  // Redirect to login page if token is not found
  useEffect(() => {
    if (!tokenValue) {
      window.location.href = '/dangnhap'; // Redirect to login page if token is missing
    }
  }, [tokenValue]);

  // Fetch user data using the token
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (tokenValue) {
        try {
          const res = await fetch('http://localhost:3000/users/detailuser', {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getUser();
  }, [tokenValue]);

  return (
    <div className='container'>
      <h2>Thông tin cá nhân</h2>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tên:</strong> {user.name}</p>
        <p><strong>Địa chỉ:</strong> {user.address}</p>
      </div>
    </div>
  );
}
