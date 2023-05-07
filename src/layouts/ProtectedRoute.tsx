import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ProtectedRoute;
