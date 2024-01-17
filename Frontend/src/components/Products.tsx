import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { BASE_URL } from '../config';
// import ProductDetail from './ProductDetails';
import { useNavigate } from 'react-router-dom';
import { productState } from "../store/atoms/product";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';


export default function Products() {
    const [products, setProducts] = useState([])
    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/products/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(response.data.products)
        setProducts(response.data);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
            {products.map((products) => {
                return <Product product={products} />;
            })}
        </div>
    );
};


export function Product({ product }) {
    const setProduct = useSetRecoilState(productState);

    const navigate = useNavigate()
    return (
        <Card
            style={{
                margin: 10,
                width: 300,
                minHeight: 200,
                padding: 20,
            }}
        >
            <Typography textAlign={"center"} variant="h5">
                {product.title}
            </Typography>
            <Typography textAlign={"center"} variant="subtitle1">
                {product.description}
            </Typography>
            <img src={product.imgLink} style={{ width: 300 }}></img>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>

                <Button
                    variant="contained"
                    size="large"

                >
                    Price: {product.price}
                </Button>


                <Button
                    variant="contained"
                    size="large"
                    onClick={async () => {

                        const response = await fetch(`http://localhost:3001/user/product/${product._id}`, {
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
                            navigate("/product/" + data._id)
                        }

                    }}
                >
                    Look
                </Button>
            </div>
        </Card >
    );
}
