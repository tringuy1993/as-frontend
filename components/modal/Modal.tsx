import { Modal } from "@mantine/core";
import { useStyles } from "./ModalStyles";
export default function ModalComp({ children, opened, open, close }) {
  const { classes } = useStyles();
  return (
    <Modal
      classNames={{ body: classes.body, root: classes.root }}
      className={classes.wrapper}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      transitionProps={{
        transition: "fade",
        duration: 300,
        timingFunction: "linear",
      }}
      size="lg"
      bg="transparent"
    >
      {children}
    </Modal>
  );
}
