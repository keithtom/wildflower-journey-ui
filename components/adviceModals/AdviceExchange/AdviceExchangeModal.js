import { Modal } from "@ui";
import AdviceExchangeContent from "./AdviceExchangeContent";

const AdviceExchangeModal = ({ open, toggle, stakeholder, decision }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title={`Advice with ${stakeholder ? stakeholder.attributes.name : 'stakeholder'}`}
    >
      <AdviceExchangeContent
        toggle={toggle}
        stakeholder={stakeholder}
        decision={decision}
      />
    </Modal>
  );
};

export default AdviceExchangeModal;
