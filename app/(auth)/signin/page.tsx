"use client";
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
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/auth/hooks";
import { useFirebaseAuth } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
import { loginWithProvider } from "../firebase";

export default function Signin() {
  // const { loginUser, errMsg } = useFBAuth();
  const form = useForm({ initialValues: { email: "", password: "" } });
  const router = useRouter();

  const params = useSearchParams();
  const [hasLogged, setHasLogged] = useState(false);
  const { tenant } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);

  const loginUser = async (e) => {
    // const { signInWithEmailAndPassword } = await import("firebase/auth");
    setHasLogged(false);
    const auth = await getFirebaseAuth();
    // const result = await signInWithEmailAndPassword(auth, e.email, e.password);
    const tenant = await loginWithProvider(auth, e.email, e.password);
    console.log(tenant.idToken);
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
    setHasLogged(true);
    const redirect = params?.get("redirect");
    router.push(redirect ?? "/home");
  };

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
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
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
