import React from "react";
import Pro from "./components/pro";  // Ensure the path to the Pro component is correct

export default function Home() {
  return (
    <div className="container my-3">
      <div>
        <div className="row d-flex justify-content-between mx-1">
          <div className="p-1 w-auto">
            <h5 className="text-success">SẢN PHẨM</h5>
          </div>
        </div>
        <div className="row">
          <Pro key="hot" />
        </div>
      </div>
    </div>
  );
}
