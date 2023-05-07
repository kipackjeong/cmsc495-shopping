import MainLayout from "@/layouts/MainLayout";
import { connectMongoWrapper } from "@/lib/connect-mongo";
import ProductModel from "@/lib/models/product.model";
import { handleSessionSsrWrapper, sessionOptions } from "@/lib/session";
import { Product } from "@/lib/types";
import { BodyDefault, H3Text, H4Text, H5Text } from "@/theme/fonts";
import Card from "@/ui/Card";
import { Add, HdrPlus, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  TextField,
  makeStyles,
} from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import { session } from "passport";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";

const ProductPage = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  async function onAddToCartClick() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, quantity }),
    });

    const data = await res.json();
  }
  function onMinusClick() {
    if (quantity != 0) setQuantity(quantity - 1);
  }
  function onPlusClick() {
    if (quantity != 100) setQuantity(quantity + 1);
  }
  return (
    <MainLayout>
      <Card>
        <Stack
          sx={{ width: "900px" }}
          direction="column"
          justifyContent="center"
        >
          <H4Text>{product.title}</H4Text>
          <Box height="20px" />
          <Stack direction="row" justifyContent={"flex-start"} gap="22px">
            <Box
              sx={{
                width: "fit-content",
                height: "fit-content",
                border: "1px solid #DEE2E7",
                borderRadius: "5px",
              }}
            >
              <Image
                src={product.image}
                width={300}
                height={300}
                alt={""}
              ></Image>
            </Box>
            <Stack direction="column" flex={1} gap="12px">
              <Stack gap="10px">
                <H3Text>${product.price}</H3Text>
                <Stack direction="row">
                  <Rating
                    name="product-rating"
                    value={product.rating.rate}
                    readOnly
                    precision={0.25}
                  />
                  <Box width="6px" />
                  <BodyDefault color="#FF9017">
                    {product.rating.rate.toPrecision(2)}
                  </BodyDefault>
                </Stack>
                <BodyDefault>{product.description}</BodyDefault>
              </Stack>
            </Stack>

            <Stack width="242px" height="424px" p="14px 18px" gap="10px">
              <Stack direction="row" gap="4px" justifyContent={"center"}>
                <IconButton size="medium" onClick={onMinusClick}>
                  <Remove fontSize="medium" />
                </IconButton>
                <TextField
                  inputProps={{
                    style: {
                      textAlign: "center",
                      height: "20px",
                      width: "50px",
                      fontSize: "16px",
                    },
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  style={{ textAlign: "center" }}
                  value={quantity}
                />
                <IconButton size="medium" onClick={onPlusClick}>
                  <Add fontSize="medium" />
                </IconButton>
              </Stack>
              <Button variant="contained" onClick={onAddToCartClick}>
                Add to cart
              </Button>
              <Button variant="outlined">Checkout</Button>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </MainLayout>
  );
};

export default ProductPage;

export const getServerSideProps = handleSessionSsrWrapper(
  connectMongoWrapper(async (context: any) => {
    const { query, req, res } = context;
    const id = query.id;

    let product;
    try {
      product = await ProductModel.findOne({ id: id }, { _id: 0 });
    } catch (error) {
      res.writeHead(302, { Location: "/404" });
      res.end();
      return { props: {} };
    }

    return {
      props: { product: product.toObject() },
    };
  })
);
