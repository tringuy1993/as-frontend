import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import { useStyles } from "./ContactStyle";
import { useState } from "react";
import { sendContactForm } from "@/lib/api";
import { useForm } from "@mantine/form";

const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export function Contact() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const [state, setState] = useState(initState);
  const { values, isLoading, error } = state;
  const [touched, setTouched] = useState({});

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const sendMessage = async (data) => {
    console.log(data);
    try {
      await sendContactForm(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Contact information
          </Text>

          <ContactIconsList variant="white" />
        </div>

        <form
          className={classes.form}
          onSubmit={form.onSubmit((values) => {
            sendMessage(values);
          })}
        >
          <Text fz="lg" fw={700} className={classes.title}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <TextInput
                {...form.getInputProps("name")}
                label="Your name"
                placeholder="Your name"
              />
              <TextInput
                type="email"
                label="Your email"
                placeholder="hello@mantine.dev"
                required
                {...form.getInputProps("email")}
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              label="Subject"
              placeholder="Subject"
              required
              {...form.getInputProps("subject")}
            />

            <Textarea
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              {...form.getInputProps("message")}
              minRows={3}
            />

            <Group position="right" mt="md">
              <Button type="submit" className={classes.control}>
                Send message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
