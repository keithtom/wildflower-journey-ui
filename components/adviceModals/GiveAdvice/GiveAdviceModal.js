import { useState } from "react";
import { Modal } from "@ui";
import GiveAdviceContent from "./GiveAdviceContent";

const GiveAdviceModal = ({ open, toggle, adviceSeeker, decision }) => {
  const [isTextStep, setIsTextStep] = useState(true);
  const [isMultipleChoiceStep, setIsMultipleChoiceStep] = useState(false);
  const [isObjectionStep, setIsObjectionStep] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [adviceGiverPosition, setAdviceGiverPosition] = useState("");
  const handleAdviceGiverPositionChange = (event) => {
    setAdviceGiverPosition(event.target.value);
  };

  const handleSubmitText = () => {
    setIsTextStep(false);
    setIsMultipleChoiceStep(true);
    setIsObjectionStep(false);
    setIsSuccess(false);
  };
  const handleSubmitMultipleChoice = ({ objection }) => {
    setIsTextStep(false);
    setIsMultipleChoiceStep(false);
    handleAdviceGiverPositionChange
    {
      adviceGiverPosition === "objection"
        ? setIsObjectionStep(true)
        : setIsSuccess(true) && setIsObjectionStep(false);
    }
  };
  const handleSubmitObjectionStep = () => {
    setIsTextStep(false);
    setIsMultipleChoiceStep(false);
    setIsObjectionStep(false);
    setIsSuccess(true);
  }

  return (
    <Modal open={open} toggle={toggle} title="Give advice to Maya Walley">
      <GiveAdviceContent
        toggle={toggle}
        adviceSeeker={adviceSeeker}
        decision={decision}
        adviceGiverPosition={adviceGiverPosition}
        handleAdviceGiverPositionChange={handleAdviceGiverPositionChange}
        isTextStep={isTextStep}
        isMultipleChoiceStep={isMultipleChoiceStep}
        isObjectionStep={isObjectionStep}
        isSuccess={isSuccess}
        handleSubmitText={handleSubmitText}
        handleSubmitMultipleChoice={handleSubmitMultipleChoice}
        handleSubmitObjectionStep={handleSubmitObjectionStep}
      />
    </Modal>
  );
};

export default GiveAdviceModal;
