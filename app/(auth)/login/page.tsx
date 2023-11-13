"use client";
import { useFirebaseAuth } from "@/auth/firebase";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLoadingCallback } from "react-loading-hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface PasswordFormValue {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [hasLogged, setHasLogged] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");

  const form = useForm({ initialValues: { email: "", password: "" } });
  // const { loginUser } = useAuth();
  // const { loginUser } = useFBAuth();
  // const FBAuth = FBAuth;
  // let loginUser = async (e) => {
  //   await signInWithEmailAndPassword(FBAuth, e.email, e.password)
  //     // .then(() => router.push("/home"))
  //     .catch((error) => {
  //       // setErrMsg(error.code);
  //       console.error(error);
  //     });
  // };
  const [handleLoginWithEmailAndPassword, isEmailLoading, error] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idTokenResult = await credential?.user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });

      setHasLogged(true);
      router.push(redirect ?? "/about");
    });

  return (
    <Container size={420} my={150}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <h1> TESTING </h1>
        <form
          onSubmit={form.onSubmit((values) => {
            // signIn(values.email, values.password);
            return handleLoginWithEmailAndPassword({
              email: values.email,
              password: values.password,
            });
          })}
        >
          <TextInput
            label="Email"
            type="email"
            placeholder="Your@email.com"
            {...form.getInputProps("email")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>

          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
