import MainLayout from "@/layouts/MainLayout";
import { Typography1420, Typography1824 } from "@/theme/fonts";
import Card from "@/ui/Card";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const FAQPage = () => {
  return (
    <MainLayout>
      <Card sx={{ marginTop: "5em" }}>
        <Stack
          justifyContent="center"
          sx={{ padding: "12px", width: "40em" }}
          gap={2}
        >
          <Typography fontSize="24px" lineHeight="30px" fontWeight={700}>
            FAQ
          </Typography>
          <Box>
            <Typography1824>
              How do I get in touch with your staff for support?
            </Typography1824>
            <Typography1420>
              You can email us at cmsc495group7@gmail.com or call us at
              1-800-555-5555.
            </Typography1420>
          </Box>
          <Box>
            <Typography1824>
              When will an out-of-stock item be restocked?
            </Typography1824>
            <Typography1420>
              We aim to restock popular items as soon as possible, but please
              contact us for an estimated restock date or for suggestion on
              similar products that are in stock.
            </Typography1420>
          </Box>
          <Box>
            <Typography1824>How do I track my order?</Typography1824>
            <Typography1420>
              You will receive an email with a tracking number once your order
              has been shipped. You can also track your order&apos;s status by
              logging into your account on our website.
            </Typography1420>
          </Box>
          <Box>
            <Typography1824>What is your return policy</Typography1824>
            <Typography1420>
              We accept returns within 30 days of purchase for a refund or
              exchange, as long as the item is unused and in its original
              packaging. Please contact us for further instructions on how to
              return an item.
            </Typography1420>
          </Box>
        </Stack>
      </Card>
    </MainLayout>
  );
};

export default FAQPage;
