import { useState } from "react";

import { Modal } from "@ui";
import RequestAdviceContent from "./RequestAdviceContent";

const RequestAdviceModal = ({ open, toggle, requestIsValid, requestAgain }) => {
  const hasContext = requestIsValid.context;
  const hasProposal = requestIsValid.proposal;
  const hasStakeholders = requestIsValid.stakeholders;

  return (
    <Modal
      open={open}
      toggle={toggle}
      title={
        hasContext && hasProposal && hasStakeholders
          ? "Request advice"
          : requestAgain
          ? "Request advice again"
          : "Oops, you can't request advice yet"
      }
    >
      <RequestAdviceContent
        toggle={toggle}
        hasContext={hasContext}
        hasProposal={hasProposal}
        hasStakeholders={hasStakeholders}
        requestAgain={requestAgain}
      />
    </Modal>
  );
};

export default RequestAdviceModal;
