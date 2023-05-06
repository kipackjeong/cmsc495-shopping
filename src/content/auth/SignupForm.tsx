import React, { FormEventHandler, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Brand from "@/components/Brand";
import { useRouter } from "next/router";

const SignupForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: any) => {
    switch (e.currentTarget.id) {
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      case "firstname":
        setFirstName(e.currentTarget.value);
        break;
      case "lastname":
        setLastName(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    event
  ) => {
    event.preventDefault();
    const response = await signup({ firstName, lastName, email, password });
    if (response.status === 409) {
      // already exists
      const message = (await response.json()).message;

      setError(message);

      return;
    }

    router.push("/auth/login");
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
          alignItems={"center"}
          sx={{ width: "300px", height: "300px" }}
        >
          <FormControl fullWidth required>
            <FormLabel>First name</FormLabel>
            <TextField
              id="firstname"
              type="text"
              placeholder="John"
              onChange={onChange}
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel>Last name</FormLabel>
            <TextField
              id="lastname"
              type="text"
              placeholder="Doe"
              onChange={onChange}
            />
          </FormControl>

          <FormControl fullWidth required error={error.length != 0}>
            <FormLabel>Email</FormLabel>
            <TextField
              id="email"
              type="text"
              placeholder="john.doe@gmail.com"
              onChange={onChange}
              error={error.length != 0}
            />
          </FormControl>

          <FormControl fullWidth required>
            <FormLabel>Password</FormLabel>
            <TextField
              id="password"
              type="password"
              placeholder="********"
              onChange={onChange}
            />
          </FormControl>

          <Button type="submit" color="primary" className="form__custom-button">
            Sign up
          </Button>
          <Link
            style={{ cursor: "pointer", color: "mygrey.200" }}
            href="/auth/login"
          >
            Already have an account? login
          </Link>
        </Stack>
      </form>
    </>
  );
};

export default SignupForm;

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export async function signup(payload: SignupPayload): Promise<Response> {
  console.log(payload);

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    }),
  });

  return response;
}
