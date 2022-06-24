import { Modal } from "@ui";
import AddStakeholderContent from "./AddStakeholderContent";

const AddStakeholderModal = ({ open, toggle }) => {
  return (
    <Modal open={open} toggle={toggle} title="Add a stakeholder">
      <AddStakeholderContent toggle={toggle} />
    </Modal>
  );
};

export default AddStakeholderModal;
