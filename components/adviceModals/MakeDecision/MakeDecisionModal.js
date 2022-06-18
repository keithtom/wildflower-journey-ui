import { useState } from 'react'

import {
  Modal
} from "@ui"
import MakeDecisionContent from "./MakeDecisionContent"

const MakeDecisionModal = ({ open, toggle }) => {

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Make your decision"
    >
      <MakeDecisionContent toggle={toggle}/>
    </Modal>
  )
}

export default MakeDecisionModal
