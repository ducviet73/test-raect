import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Adjust the import path as needed

export default function ProductBestselling() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/products/bestselling", { cache: 'no-store' });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="container my-3">
      <div>
        <div className="container-nav-brand-table-title">
          <div className="nav-brand-table-title-animated">
            <h3>Sản phẩm bán chạy</h3>
          </div>
        </div>
        <div className="row">
          {/* Passing the fetched data to ProductCard component */}
          <ProductCard data={data} />
        </div>
      </div>
    </div>
  );
}
