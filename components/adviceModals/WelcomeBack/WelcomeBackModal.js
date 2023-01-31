import { Modal } from "@ui";
import WelcomeBackContent from "./WelcomeBackContent";

const WelcomeBackModal = ({ open, toggle }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Welcome back to your decision!"
    >
      <WelcomeBackContent toggle={toggle} />
    </Modal>
  );
};

export default WelcomeBackModal;
