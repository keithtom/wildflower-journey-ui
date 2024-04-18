import { useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const InlineActionTile = ({
  id,
  status,
  showAdd,
  add,
  dragHandle,
  blank,
  disabled,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Stack
      id={id}
      sx={{
        width: "48px",
        borderRight: "1px solid #eaeaea",
        height: "48px",
        cursor: isHovering ? "pointer" : "default",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {blank ? null : (
        <>
          {showAdd && <AddChip onClick={add} />}
          {isHovering ? dragHandle : <StatusLight status={status} />}
        </>
      )}
    </Stack>
  );
};

export default InlineActionTile;

const StatusLight = ({ status }) => {
  return (
    <Stack
      sx={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: "gray",
      }}
    />
  );
};

const AddChip = ({ onClick }) => {
  return (
    <Stack
      onClick={onClick}
      sx={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#fafafa",
        border: "1px solid #eaeaea",
        position: "absolute",
        top: "-12px",
        zIndex: 2,
        cursor: "pointer",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <AddIcon color="primary" fontSize="small" />
    </Stack>
  );
};
