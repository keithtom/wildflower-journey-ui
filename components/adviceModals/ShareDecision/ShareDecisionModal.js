import { Modal } from "@ui";
import ShareDecisionContent from "./ShareDecisionContent";

const ShareDecisionModal = ({ open, toggle }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Share this decision with someone you trust"
    >
      <ShareDecisionContent toggle={toggle} />
    </Modal>
  );
};

export default ShareDecisionModal;
