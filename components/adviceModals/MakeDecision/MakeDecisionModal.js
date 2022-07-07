import { useState } from "react";

import { Modal } from "@ui";
import MakeDecisionContent from "./MakeDecisionContent";

const MakeDecisionModal = ({ decisionId, open, toggle, stakeholders }) => {
  const pendingAdvice = stakeholders.length ? JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("pending"))
  ) : null;
  const hasObjections = stakeholders.length ? JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("objects"))
  ) : null;
  const noObjection = stakeholders.length ? JSON.parse(
    stakeholders.map((s) => s.attributes.status.includes("no objection"))
  ) : null;

  const [isValidDecision, setIsValidDecision] = useState(!pendingAdvice);
  const [isDeciding, setIsDeciding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
        decisionId={decisionId}
        toggle={toggle}
        stakeholders={stakeholders}
        pendingAdvice={pendingAdvice}
        hasObjections={hasObjections}
        noObjection={noObjection}
        isValidDecision={isValidDecision}
        isDeciding={isDeciding}
        isSuccess={isSuccess}
        setIsDeciding={setIsDeciding}
        setIsSuccess={setIsSuccess}
      />
    </Modal>
  );
};

export default MakeDecisionModal;
