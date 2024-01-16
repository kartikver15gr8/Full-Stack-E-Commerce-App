import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { productState } from "../store/atoms/product";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { productDetailsDescription, productDetailsImage, productDetailsTitle, productDetailsPrice} from "../store/selectors/getProduct"

export default function ProductDetail() {

  const[value, setValue] = useState();
  let { _id } = useParams();
    const setProduct = useSetRecoilState(productState);
    // const courseLoading = useRecoilValue(isCourseLoading);
    const init = async() =>{
      const response = await fetch(`http://localhost:3001/user/product/${_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (data) {
        setProduct({ isLoading: false, productDetails: data })
        console.log(data);
        
    }
    }

    useEffect(() => {
        init();
    }, []);

  return (
    <div className="container">
      <h1 style={{ color: "black", marginTop: "100px" }}>Product</h1>
      <ProductCard/>
    </div>
  );
}


function ProductCard(){
  const title= useRecoilValue(productDetailsTitle)
  const price= useRecoilValue(productDetailsPrice)
  const image= useRecoilValue(productDetailsImage)
  const description= useRecoilValue(productDetailsDescription)
  console.log(title);
  return (
    <>
    <div>
    <img style={{width:"400px"}} src={image} alt="" />
    <h1>{title}</h1>
    <h2>{price}</h2>
    <h3>{description}</h3>
    </div>
    
    </>
  )
}