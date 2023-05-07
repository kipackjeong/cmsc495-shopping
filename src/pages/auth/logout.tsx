import AuthPageLayout from "@/layouts/AuthPageLayout";
import { CircularProgress } from "@mui/material";
import { getIronSession } from "iron-session";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const logoutRequest = async () => {
      // clears the session
      await fetch("/api/logout");

      // clears the client state

      router.push("/auth/login");
    };

    logoutRequest();
  }, [dispatch, router]);
  return (
    <AuthPageLayout>
      <CircularProgress color="primary" />;
    </AuthPageLayout>
  );
};

export default LogoutPage;
