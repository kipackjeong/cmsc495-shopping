import React from "react";
import {
  Card as MuiCard,
  styled,
  CardProps as MuiCardProps,
} from "@mui/material";

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: "6px",
  boxShadow: "0px 0.5px 1px rgba(0, 0, 0, 0.25)",
  padding: "20px",
  width: "fit-content",
  background: "white",
}));

type CardProps = { flex?: number } & MuiCardProps;

const Card = ({ flex, children, ...rest }: CardProps) => {
  return (
    <StyledCard sx={{ flex: flex }} {...rest}>
      {children}
    </StyledCard>
  );
};

export default Card;
