import AuthPageLayout from "@/layouts/AuthPageLayout";
import { CircularProgress } from "@mui/material";
import { getIronSession } from "iron-session";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const logoutRequest = async () => {
      // clears the session
      await fetch("/api/logout");

      router.push("/auth/login");
    };

    logoutRequest();
  }, [router]);
  return (
    <AuthPageLayout>
      <CircularProgress color="primary" />;
    </AuthPageLayout>
  );
};

export default LogoutPage;
