import { Typography, styled } from "@mui/material";
import React from "react";

export const H1Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 48,
  fontWeight: 600,
  lineHeight: 58,
  letterSpacing: -1.600000023841858,
}));

export const H2Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 38.73,
  letterSpacing: 0,
}));

export const H3Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 32,
  letterSpacing: 0,
}));

export const H4Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 28,
  letterSpacing: 0,
}));

export const H5Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 21.78,
  letterSpacing: 0,
}));

export const H6Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 19.36,
  letterSpacing: 0,
}));

export const BodyDefault = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: 0,
}));

export const BodySmall = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "15.73px",
  letterSpacing: 0,
}));

export const BodyMicro = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: "15.73px",
  letterSpacing: 0,
}));

export const BodyMicroMuted = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 14.52,
  letterSpacing: 0,
  color: "#8B96A5",
}));
