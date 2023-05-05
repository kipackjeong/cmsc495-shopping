import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentPage = () => {
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
    // const paymentRequest = async () => {
    //   await fetch("api/payment");
    //   router.push("/cart/confirmation");
    // };
    // paymentRequest();
  }, []);

  return (
    <Stack height="90vh" justifyContent="center" alignItems="center">
      <Typography>Payment in process...</Typography>
      <Box height="1em"></Box>
      <CircularProgress />
    </Stack>
  );
};

export default PaymentPage;
