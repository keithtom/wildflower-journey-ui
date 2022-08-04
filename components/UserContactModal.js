import {
  Modal,
} from "@ui";
import UserContactInfo from './UserContactInfo'

const UserContactModal = ({ user, open, toggle }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title={`Contact ${user.firstName} ${user.lastName}`}
    >
      <UserContactInfo user={user} />
    </Modal>
  );
};

export default UserContactModal;
