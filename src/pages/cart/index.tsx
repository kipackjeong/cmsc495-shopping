import MainLayout from "@/layouts/MainLayout";
import UserModel from "@/lib/models/user.model";
import { sessionOptions } from "@/lib/session";
import { Cart } from "@/lib/types";
import { H1Text, H5Text } from "@/theme/fonts";
import Card from "@/ui/Card";
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { withIronSessionSsr } from "iron-session/next";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LinkProps } from "next/link";
import BpCheckbox from "@/ui/CheckBox";
import router, { useRouter } from "next/router";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#007185",
  cursor: "pointer",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));
const CartPage = ({ cart }: { cart: Cart }) => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState(cart.items);
  const [checkedItemsIndexes, setCheckedItemsIndexes] = useState(
    Array.from({ length: cartItems.length }, (_, i) => i)
  );

  const subtotal = useMemo(() => {
    return checkedItemsIndexes
      .reduce((totalPrice, idx) => {
        return (
          totalPrice + cartItems[idx]?.product.price * cartItems[idx]?.quantity
        );
      }, 0)
      .toFixed(2);
  }, [cartItems, checkedItemsIndexes]);

  useEffect(() => {
    setCheckedItemsIndexes(
      Array.from({ length: cartItems.length }, (_, i) => i)
    );
  }, [cartItems]);

  function onDeselectAllItemsClick() {
    setCheckedItemsIndexes([]);
  }
  function onSelectAllItemsClick() {
    setCheckedItemsIndexes(
      Array.from({ length: cartItems.length }, (_, i) => i)
    );
  }

  function onProceedToCheckoutClick() {
    const checkingOutItems = cartItems.filter((_, i) =>
      checkedItemsIndexes.includes(i)
    );
    router.push({
      pathname: "/cart/checkout",
      query: { items: JSON.stringify(checkingOutItems) },
    });
  }

  function onDeleteClick(i: number) {
    setCartItems((prev) => {
      const newCartItems = [...prev];
      newCartItems.splice(i, 1);
      return newCartItems;
    });
  }
  return (
    <MainLayout>
      <Stack direction="row" width="90vw" paddingTop="20px">
        <Card flex={2}>
          <Stack pt="20px" pb="16px">
            <Typography
              fontFamily={"inherit"}
              fontSize="28px"
              fontWeight={400}
              lineHeight="36psx"
            >
              Shopping Cart
            </Typography>

            {checkedItemsIndexes.length != cartItems.length ? (
              <StyledLink onClick={onSelectAllItemsClick}>
                Select all items
              </StyledLink>
            ) : (
              <StyledLink onClick={onDeselectAllItemsClick}>
                Deselect all items
              </StyledLink>
            )}

            <Stack
              height="16px"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Typography
                fontSize="14px"
                lineHeight="20px"
                color="#565959!important"
              >
                Price
              </Typography>
            </Stack>
            <Divider
              sx={{
                borderBottomWidth: "1px",
                borderBottomColor: "#DDD",
              }}
            />

            <Stack paddingTop="20px" gap="12px">
              {cartItems.map((item, i) => (
                <Stack
                  key={i}
                  direction="row"
                  sx={{
                    padding: "12px 0px 12px 12px",
                    borderBottom: "1px solid #DDD",
                  }}
                >
                  <BpCheckbox
                    sx={{ marginRight: "8px", width: "fit-content" }}
                    checked={checkedItemsIndexes.includes(i)}
                    onChange={() => {
                      if (checkedItemsIndexes.includes(i))
                        setCheckedItemsIndexes((prev) => {
                          return prev.filter((idx) => idx !== i);
                        });
                      else setCheckedItemsIndexes((prev) => [...prev, i]);
                    }}
                  />

                  <Image
                    src={item.product.image}
                    width={160}
                    height={160}
                    alt={item.product.title}
                  />
                  <Stack sx={{ width: "250px" }} paddingX="10px" gap={1}>
                    <Stack flex={1}>
                      <Typography fontSize="18px" lineHeight="1.2em">
                        {item.product.title}
                      </Typography>
                    </Stack>

                    <Typography
                      fontSize="12px"
                      lineHeight="16px"
                      color="#007600!important"
                    >
                      In Stock
                    </Typography>
                    <Stack direction="row" gap={1}>
                      <Typography
                        fontSize="14px"
                        lineHeight="20px"
                        color="#0F1111"
                      >
                        Qty: {item.quantity}
                      </Typography>
                      <Divider orientation="vertical" />
                      <StyledLink
                        fontSize="12px"
                        lineHeight="20px"
                        onClick={() => onDeleteClick(i)}
                      >
                        Delete
                      </StyledLink>
                    </Stack>
                  </Stack>

                  <Stack flex={1} alignItems={"flex-end"}>
                    <Typography
                      fontSize="18px"
                      lineHeight="24px"
                      fontWeight={700}
                      letterSpacing={"0.5px"}
                    >
                      ${item.product.price}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>

        <Box width="20px" />

        <Card flex={1}>
          <Stack sx={{ paddingY: "20px" }} gap="4px">
            <Stack direction="row" alignItems="center">
              <Typography fontSize="18px" lineHeight="24px" color="#0F1111">
                Subtotal ({cartItems.length} items):
              </Typography>
              <Typography
                fontSize="18px"
                fontWeight={700}
                lineHeight="24px"
                color="black"
                sx={{ marginLeft: "3px" }}
              >
                $ {subtotal}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={onProceedToCheckoutClick}>
              Proceed to checkout
            </Button>
          </Stack>
        </Card>
      </Stack>
    </MainLayout>
  );
};

export default CartPage;

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const cart = (await UserModel.findOne({ id: user.id })).cart;

  return {
    props: { cart },
  };
}, sessionOptions);
