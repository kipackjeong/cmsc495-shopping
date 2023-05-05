import LoginForm from "@/content/auth/LoginForm";
import AuthPageLayout from "@/layouts/AuthPageLayout";
import React from "react";

const LoginPage = () => {
  return (
    <AuthPageLayout>
      <LoginForm></LoginForm>
    </AuthPageLayout>
  );
};

export default LoginPage;
