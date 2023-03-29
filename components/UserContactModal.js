import { Modal } from "@ui";
import UserContactInfo from "./UserContactInfo";

const UserContactModal = ({
  firstName,
  lastName,
  phone,
  email,
  open,
  toggle,
}) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title={`Contact ${firstName} ${lastName}`}
    >
      <UserContactInfo email={email} phone={phone} />
    </Modal>
  );
};

export default UserContactModal;
