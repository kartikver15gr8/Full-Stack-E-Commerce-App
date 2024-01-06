import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { productState } from "../store/atoms/product";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ProductDetail() {
  const pro = useRecoilValue(productState);
  const [product, setProduct] = useState(pro);

  console.log(product);
  return (
    <div className="container">
      <h1 style={{ color: "black", marginTop: "100px" }}>Product</h1>
      <h2>{product.productDetails._id}</h2>
      <h2>{product.productDetails.title}</h2>
      <h2>{product.productDetails.description}</h2>
      <h2>{product.productDetails.price}</h2>
      <img src={product.productDetails.imgLink} alt="" />
    </div>
  );
}
