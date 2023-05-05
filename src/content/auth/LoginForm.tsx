import React, { FormEventHandler, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Brand from "@/components/Brand";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "@/lib/types";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: any) => {
    if (e.currentTarget.id === "email") {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    event
  ) => {
    event.preventDefault();

    //TODO[epic=login] implement call api
    const payload: LoginPayload = { email, password };
    const response = await login(payload);
    if (response.status !== 200) {
      const result: { message: string } = await response.json();
      setError(result.message);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error.length > 0}
        onClose={() => {
          setError("");
        }}
        autoHideDuration={4000}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Brand />
      <form className="form" onSubmit={onSubmit}>
        <Stack
          direction="column"
          alignItems="center"
          sx={{ width: "300px", height: "300px" }}
        >
          <FormControl fullWidth required>
            <FormLabel>Email</FormLabel>
            <TextField
              id="email"
              type="text"
              placeholder="john.doe@gmail.com"
              onChange={onChange}
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel>Password</FormLabel>
            <TextField
              type="password"
              placeholder="*******"
              onChange={onChange}
            />
          </FormControl>

          <Button type="submit" color="primary" className="form__custom-button">
            Log in
          </Button>
          <Box height="20px"></Box>
          <Link
            style={{ cursor: "pointer", color: "mygrey.200" }}
            href="/auth/signup"
          >
            Don&apos;t have an account? sign up
          </Link>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<Response> {
  console.log("api request to /api/login");

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: payload.email, password: payload.password }),
  });

  return response;
}
