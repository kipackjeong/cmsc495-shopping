import MainLayout from "@/layouts/MainLayout";
import { handleSessionSsrWrapper } from "@/lib/session";
import { CartItem } from "@/lib/types";
import { Typography1214, Typography1420, Typography1824 } from "@/theme/fonts";
import Card from "@/ui/Card";
import { CheckRounded } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const CheckoutCompletePage = () => {
  const router = useRouter();
  const checkedoutItems = useMemo(() => {
    return router.query.items ? JSON.parse(router.query.items as string) : [];
  }, [router.query.items]);
  console.log(checkedoutItems);

  return (
    <MainLayout>
      <Card sx={{ minWidth: "30em", maxWidth: "60em" }}>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <CheckRounded sx={{ color: "green.main" }} />
            <Typography1824 color="green.main">
              Thank you for your purchase!
            </Typography1824>
          </Stack>
          <Typography1420>
            Your order has been placed and is being processed. You will receive
            an email confirmation shortly.
          </Typography1420>

          <Typography1420>
            <b>Shipping to Customer Name,</b> Address, City, State, Zip Code,
            Country
          </Typography1420>
          <Divider />
          {checkedoutItems.map((item: CartItem, i: number) => (
            <Stack key={i} direction="row">
              <Image
                src={item.product.image}
                width={60}
                height={60}
                alt={item.product.title}
              />
              <Stack sx={{ paddingX: "12px" }}>
                <Typography1420 fontWeight={700}>
                  {item.product.title}
                </Typography1420>
                <Typography1420>Qty: {item.quantity}</Typography1420>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Card>
    </MainLayout>
  );
};

export const getServerSideProps = handleSessionSsrWrapper(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);

export default CheckoutCompletePage;
