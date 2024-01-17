import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { productState } from "../store/atoms/product";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { productDetailsId, productDetailsDescription, productDetailsImage, productDetailsTitle, productDetailsPrice } from "../store/selectors/getProduct"
import { Button, Card, Typography } from "@mui/material";

export default function ProductDetail() {

  let { _id } = useParams();
  const setProduct = useSetRecoilState(productState);
  // const courseLoading = useRecoilValue(isCourseLoading);
  const init = async () => {
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
      <ProductCard />
    </div>
  );
}


function ProductCard() {
  const title = useRecoilValue(productDetailsTitle)
  const price = useRecoilValue(productDetailsPrice)
  const image = useRecoilValue(productDetailsImage)
  const description = useRecoilValue(productDetailsDescription)
  const _id = useRecoilValue(productDetailsId)

  return (
    <>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          padding: 20,
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {description}
        </Typography>
        <img src={image} style={{ width: 300 }}></img>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>

          <Button
            variant="contained"
            size="large"

          >
            add to cart {price}
          </Button>
          {/* <p>{_id}</p> */}
        </div>
      </Card>
    </>
  )
}