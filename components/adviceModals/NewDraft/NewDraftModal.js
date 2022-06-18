
import {
  Modal
} from "@ui"
import NewDraftContent from "./NewDraftContent"

const NewDraftModal = ({ open, toggle }) => {
  return (
    <Modal
      open={open}
      toggle={toggle}
      title="New draft"
    >
      <NewDraftContent toggle={toggle} />
    </Modal>
  )
}

export default NewDraftModal
