import { handleSessionSsrWrapper } from "@/lib/session";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentPage = () => {
  const router = useRouter();

  const [time, setTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime: number) => {
        if (prevTime == 2) {
          setTime(0);
          router.push({
            pathname: "/cart/complete",
            query: { items: router.query.items },
          });
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Stack height="90vh" justifyContent="center" alignItems="center">
      <Typography>Payment in process...</Typography>
      <Box height="1em"></Box>
      <CircularProgress />
    </Stack>
  );
};

export const getServerSideProps = handleSessionSsrWrapper(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);

export default PaymentPage;
