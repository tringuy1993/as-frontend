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
import { sendContactForm } from "@/lib/api";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

//https://github.com/nikitapryymak/next-js-nodemailer/tree/finished-files

const initValues = { name: "", email: "", subject: "", message: "" };

const notificationMessage = {
  success: {
    title: "Your email is sent",
    message: "Thank you for your message and interest",
  },
  failed: {
    title: "Your message was not sent",
    message: "Please provide information for all required fields",
  },
};

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

  const sendMessage = async (data) => {
    try {
      await sendContactForm(data);
      notifications.show({
        id: "SubmitEmail",
        withCloseButton: true,
        autoClose: 7500,
        ...notificationMessage.success,
        loading: false,
      });
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
            form.reset();
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
                required
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
              required
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
