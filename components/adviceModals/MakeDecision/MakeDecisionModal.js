import { useState } from "react";

import { Modal } from "@ui";
import MakeDecisionContent from "./MakeDecisionContent";

const MakeDecisionModal = ({ decisionId, open, toggle, stakeholders }) => {
  const pendingAdvice = stakeholders.length ?
    stakeholders.map((s) => s.attributes.status.includes("pending")
  ) : null;
  const hasObjections = stakeholders.length ?
    stakeholders.map((s) => s.attributes.status.includes("objects")
  ) : null;
  const noObjection = stakeholders.length ?
    stakeholders.map((s) => s.attributes.status.includes("no objection")
  ) : null;

  const [isValidDecision, setIsValidDecision] = useState(true);
  const [isDeciding, setIsDeciding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // console.log("in the modal stakeholders", stakeholders)
  // console.log(isValidDecision)

  return (
    <Modal
      open={open}
      toggle={toggle}
      title={
        isValidDecision
          ? hasObjections
            ? "Make your decision"
            : isDeciding || isSuccess
            ? "Make your decision"
            : "You've received advice from everyone!"
          : "You haven't received advice from everyone!"
      }
    >
      <MakeDecisionContent
        decisionId={decisionId}
        toggle={toggle}
        stakeholders={stakeholders}
        pendingAdvice={pendingAdvice}
        hasObjections={hasObjections}
        noObjection={noObjection}
        isValidating={isValidating}
        isValidDecision={isValidDecision}
        isDeciding={isDeciding}
        isSuccess={isSuccess}
        setIsDeciding={setIsDeciding}
        setIsSuccess={setIsSuccess}
        setIsValidating={setIsValidating}
      />
    </Modal>
  );
};

export default MakeDecisionModal;
