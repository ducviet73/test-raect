import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

export default function Search({ searchParams }) {
    const [productSearch, setProductSearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const keyword = searchParams.keyword;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/products/search/${keyword}`, { cache: 'no-store' });

                // Check if the response is OK
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();

                setProductSearch(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Vui lòng thử lại sau');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [keyword]);

    // Loading state
    if (loading) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <p>Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }

    // If error occurs during fetch
    if (error) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h3>Kết quả tìm kiếm cho từ khóa: {keyword}</h3>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // No products found
    if (productSearch && productSearch.length === 0) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h3>Kết quả tìm kiếm cho từ khóa: {keyword}</h3>
                        <p>Không có sản phẩm nào phù hợp với từ khóa này.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Render product list if products are found
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <h3>Kết quả tìm kiếm cho từ khóa: {keyword}</h3>
                    <div className="row">
                        <ProductCard data={productSearch} />
                    </div>
                </div>
            </div>
        </div>
    );
}
