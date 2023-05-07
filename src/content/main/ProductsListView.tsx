import { BodyDefault } from "@/theme/fonts";
import { Box, Pagination, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { ReactNode, useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { useRouter } from "next/router";

const Product = ({ product, ...rest }: { product: Product }) => {
  const router = useRouter();
  return (
    <Stack
      {...rest}
      direction="row"
      justifyContent={"flex-start"}
      sx={{
        width: "920px",
        cursor: "pointer",
        "&:hover": { opacity: 0.8, backgroundColor: "mygrey.200" },
      }}
      onClick={() => {
        router.push(`/products/${product.id}`);
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        minWidth={240}
        minHeight={240}
      >
        <Image src={product.image} width={160} height={160} alt={""}></Image>
      </Stack>
      <Box width="12px" />
      <Stack direction="column" gap="12px">
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: "500px",
            lineHeight: "22px",
          }}
        >
          {product.title}
        </Typography>

        <Stack>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: "600px",
              lineHeight: "28px",
              letterSpacing: "-0.2px",
            }}
          >
            ${product.price}
          </Typography>
          <Box height="4px" />
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
        </Stack>
        <Box minWidth="607px" textOverflow={"ellipsis"}>
          <Typography>{product.description}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

const ProductsListView = ({ products }: { products: Product[] }) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 10;
  const maxPage = Math.ceil(products.length / productsPerPage);
  const pagedProducts = useMemo(() => {
    return products.slice((page - 1) * productsPerPage, page * productsPerPage);
  }, [page, products]);

  return (
    <Stack
      direction="column"
      maxHeight="40em"
      alignItems="center"
      overflow="scroll"
    >
      {pagedProducts.map((p, i) => (
        <Product key={i} product={p} />
      ))}

      <Pagination
        sx={{ marginTop: "30px" }}
        variant="outlined"
        color="primary"
        count={maxPage}
        page={page}
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </Stack>
  );
};

export default ProductsListView;
