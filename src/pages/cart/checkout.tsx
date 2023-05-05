import Brand from "@/components/Brand";
import Card from "@/ui/Card";
import { Box, Button, Divider, Stack, Typography, styled } from "@mui/material";
import React, { useMemo } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import BpCheckbox from "@/ui/CheckBox";
import { CartItem } from "@/lib/types";
import { Typography1824, Typography1420, Typography1214 } from "@/theme/fonts";

const CheckoutPage = () => {
  const router = useRouter();
  const checkingOutItems = useMemo(() => {
    return router.query.items ? JSON.parse(router.query.items as string) : [];
  }, [router.query.items]);

  const todayDate = useMemo(() => {
    return new Date();
  }, []);

  const todayString = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
  const threeDayLaterString = new Date(
    todayDate.setDate(todayDate.getDate() + 3)
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });

  const itemsTotalPrice = useMemo(() => {
    return checkingOutItems.reduce(
      (count: number, item: CartItem) =>
        count + item.product.price * item.quantity,
      0
    );
  }, [checkingOutItems]).toFixed(2);
  // Rest of the component logic

  function onProceedPayClick() {
    router.push({
      pathname: "/cart/processing",
      query: { items: JSON.stringify(checkingOutItems) },
    });
  }

  return (
    <Stack
      sx={{
        height: "98vh",
        padding: "18px 0px",
        backgroundColor: "mygrey.100",
      }}
    >
      <Stack direction="row" sx={{ height: "60px" }} alignItems={"center"}>
        <Stack flex={1} alignItems="center">
          <Brand />
        </Stack>
        <Stack flex={1} alignItems="center">
          <Typography fontSize="28px" lineHeight={"36px"} fontWeight={400}>
            Checkout (2 items)
          </Typography>
        </Stack>
        <Box flex={1}></Box>
      </Stack>

      <Stack
        flex={1}
        direction="row"
        sx={{
          width: "96%",
          backgroundColor: "white",
          padding: "18px 18px 18px 14px",
        }}
      >
        {/* left */}
        <Stack flex={1} sx={{ paddingRight: "10px" }}>
          <Stack direction="row">
            <Typography1824 width="2.1875em">1</Typography1824>

            <Typography1824 width="6.75em">Shipping address</Typography1824>
            <Box sx={{ paddingLeft: "2.5em" }}>
              {/* TODO */}
              <Typography>Customer Name</Typography>
              <Typography>
                13264 24TH DR SE TACOMA, <br /> WA 98208-8809
              </Typography>
              <Typography color="#007185">Add delivery instructions</Typography>
            </Box>
          </Stack>
          <Divider sx={{ marginY: "14px" }} />
          <Stack direction="row">
            <Typography1824 width="2.1875em">2</Typography1824>

            <Typography1824 width="6.75em">Payment method</Typography1824>
            <Stack sx={{ paddingLeft: "2.5em" }}>
              <Typography>{}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ marginY: "14px" }} />

          <Stack direction="row">
            <Typography1824 width="2.1875em">3</Typography1824>
            <Stack flex={1}>
              <Typography1824 width="10em">
                Review items and shipping
              </Typography1824>
              {checkingOutItems.map((item: any, i: number) => (
                <Card
                  key={i}
                  flex={1}
                  sx={{ width: "-webkit-fill-available", marginBottom: "8px" }}
                >
                  <Stack>
                    <Typography1824 color="primary">
                      Estimated delivery: May 12, 2023 - May 15, 2023
                    </Typography1824>
                    <Typography1420
                      color="#565959!important"
                      sx={{
                        marginBottom: "8px",
                      }}
                    >
                      Item shipped from ...
                    </Typography1420>
                  </Stack>
                  <Stack direction="row">
                    <Image
                      width={90}
                      height={90}
                      src={item.product.image}
                      alt={item.product.title}
                    />
                    <Stack sx={{ width: "185px" }} paddingX="10px" gap={1}>
                      <Typography1420 fontWeight={700}>
                        {item.product.title}
                      </Typography1420>
                      <Typography1420 fontWeight={700} color="orange.main">
                        ${item.product.price * item.quantity}
                      </Typography1420>
                    </Stack>
                    <Stack>
                      <Typography1420 fontWeight={700} color="#0F1111">
                        Choose a delivery option:
                      </Typography1420>
                      <Stack direction="row">
                        <BpCheckbox defaultChecked={true} />
                        <Stack>
                          <Typography1420 color="green.main">
                            {todayString} - {threeDayLaterString}
                          </Typography1420>
                          <Stack direction="row" gap={1}>
                            <Typography1420 fontWeight={500}>
                              FREE
                            </Typography1420>
                            <Typography1420>Standard Shipping</Typography1420>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Stack>
        {/* right */}
        <Stack sx={{ width: "20em" }}>
          <Card sx={{ padding: "18px 14px" }}>
            <Stack gap="8px">
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={onProceedPayClick}
              >
                Proceed your order and pay
              </Button>
              <Typography1420 color="#565933!important">
                You&apos;ll be securely redirected to Visa to complete this
                transaction.
              </Typography1420>

              <Divider />

              <Typography1824 sx={{ marginBotton: "4px" }}>
                Order Summary
              </Typography1824>
              <Stack direction="row" justifyContent="flex-start">
                <Typography1214>
                  items(
                  {checkingOutItems.reduce(
                    (count: number, item: CartItem) => count + item.quantity,
                    0
                  )}
                  ):
                </Typography1214>
                <Typography1214 flex={1} textAlign={"right"}>
                  ${itemsTotalPrice}
                </Typography1214>
              </Stack>
              <Stack direction="row" justifyContent="flex-start">
                <Typography1214>Shipping & handling:</Typography1214>
                <Typography1214 flex={1} textAlign={"right"}>
                  FREE
                </Typography1214>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Divider sx={{ width: "3.5em" }} />
              </Stack>
              <Stack direction="row">
                <Typography1214>Total before tax:</Typography1214>
                <Typography1214 flex={1} textAlign={"right"}>
                  ${itemsTotalPrice}
                </Typography1214>
              </Stack>
              <Divider />

              <Stack direction="row">
                <Typography1824>Order total:</Typography1824>
                <Typography1824
                  flex={1}
                  textAlign={"right"}
                  color="primary.main"
                >
                  ${itemsTotalPrice}
                </Typography1824>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutPage;
