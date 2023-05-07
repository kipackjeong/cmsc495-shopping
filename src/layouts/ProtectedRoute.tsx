import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ProtectedRoute;
