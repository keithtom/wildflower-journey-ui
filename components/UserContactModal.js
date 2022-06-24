import {
  Modal,
} from "@ui";
import UserContactInfo from './UserContactInfo'

const UserContactModal = ({ user, open, toggle }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title={`Contact ${user.attributes.firstName} ${user.attributes.lastName}`}
    >
      <UserContactInfo user={user} />
    </Modal>
  );
};

export default UserContactModal;
