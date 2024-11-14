import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For routing in React (use react-router-dom)

const Category = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch categories data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>Loading...</p>;

  return (
    <ul>
      {data.map((item) => (
        <li className="nav-item" key={item._id}>
          <Link className="nav-link text-black dropdown-item" to={`/category/${item._id}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Category;
