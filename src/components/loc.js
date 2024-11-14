import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const Loc = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('asc');
  const [filters, setFilters] = useState({
    showAll: false,
    showPhone: false,
    showLaptop: false,
    showLinhKien: false,
  });

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('http://localhost:3000/products');
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    // Sorting logic based on selected sort option
    const sortedProducts = [...products];
    if (sortOption === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  }, [sortOption]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (filters.showAll) return true;
    if (filters.showPhone && product.category === 'Phone') return true;
    if (filters.showLaptop && product.category === 'Laptop') return true;
    if (filters.showLinhKien && product.category === 'Linh Kien') return true;
    return false;
  });

  return (
    <div className="container my-3">
      <div>
        <div className="d-flex justify-content-between mx-1">
          <div className="p-1 w-auto">
            <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
          </div>
          <div>
            <input
              type="checkbox"
              id="showAll"
              name="showAll"
              value="showAll"
              checked={filters.showAll}
              onChange={handleCheckboxChange}
              className="me-2"
            />
            <label htmlFor="showAll" className="me-2">
              Hiển thị tất cả
            </label>
            <input
              type="checkbox"
              id="showPhone"
              name="showPhone"
              value="showPhone"
              checked={filters.showPhone}
              onChange={handleCheckboxChange}
              className="me-2"
            />
            <label htmlFor="showPhone" className="me-2">
              Điện thoại
            </label>
            <input
              type="checkbox"
              id="showLaptop"
              name="showLaptop"
              value="showLaptop"
              checked={filters.showLaptop}
              onChange={handleCheckboxChange}
              className="me-2"
            />
            <label htmlFor="showLaptop" className="me-2">
              Laptop
            </label>
            <input
              type="checkbox"
              id="showLinhKien"
              name="showLinhKien"
              value="showLinhKien"
              checked={filters.showLinhKien}
              onChange={handleCheckboxChange}
              className="me-2"
            />
            <label htmlFor="showLinhKien" className="me-2">
              Linh kiện
            </label>
          </div>
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
        <div className="row">
          <ProductCard data={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Loc;
