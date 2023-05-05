import SignupForm from "@/content/auth/SignupForm";
import AuthPageLayout from "@/layouts/AuthPageLayout";
import React from "react";

const SignupPage = () => {
  return (
    <AuthPageLayout>
      <SignupForm />
    </AuthPageLayout>
  );
};

export default SignupPage;
