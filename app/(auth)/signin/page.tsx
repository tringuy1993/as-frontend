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
import { useAuth } from "@/auth/hooks";
import { useSignIn } from "@/auth/signin";

export default function Signin() {
  const [hasLogged, setHasLogged] = useState(false);
  const form = useForm({ initialValues: { email: "", password: "" } });
  const { loginUser } = useAuth();

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
            return loginUser(values);
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
