import { useState } from 'react'

import {
  Modal
} from "@ui"
import MakeDecisionContent from "./MakeDecisionContent"

const MakeDecisionModal = ({ open, toggle, stakeholders }) => {

  // Include logic for determining if has objections
  // const hasPendingAdvice = true

  return (
    <Modal
      open={open}
      toggle={toggle}
      title="Make your decision"
    >
      <MakeDecisionContent toggle={toggle} stakeholders={stakeholders}/>
    </Modal>
  )
}

export default MakeDecisionModal
