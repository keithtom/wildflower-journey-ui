import { useState } from "react";

import { Modal } from "@ui";
import MakeDecisionContent from "./MakeDecisionContent";

const MakeDecisionModal = ({ open, toggle, stakeholders }) => {
  const pendingAdvice = JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("pending"))
  );
  const hasObjections = JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("objects"))
  );
  const noObjection = JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("no objection"))
  );

  const [isValidDecision, setIsValidDecision] = useState(!pendingAdvice);
  const [isValidating, setIsValidating] = useState(true);
  const [isDeciding, setIsDeciding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValidate = () => {
    setIsValidating(false);
    setIsDeciding(true);
    setIsSuccess(false);
  };
  const handleDecide = () => {
    setIsValidating(false);
    setIsDeciding(false);
    setIsSuccess(true);
  };

  return (
    <Modal
      open={open}
      toggle={toggle}
      title={
        isValidDecision
          ? hasObjections
            ? "Your decision has objections"
            : isDeciding || isSuccess
            ? "Make your decision"
            : "You've received advice from everyone!"
          : "You haven't received advice from everyone!"
      }
    >
      <MakeDecisionContent
        toggle={toggle}
        stakeholders={stakeholders}
        pendingAdvice={pendingAdvice}
        hasObjections={hasObjections}
        noObjection={noObjection}
        isValidDecision={isValidDecision}
        isValidating={isValidating}
        isDeciding={isDeciding}
        isSuccess={isSuccess}
        handleValidate={handleValidate}
        handleDecide={handleDecide}
      />
    </Modal>
  );
};

export default MakeDecisionModal;
