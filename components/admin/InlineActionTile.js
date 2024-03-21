import { useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon, DragHandle } from "@mui/icons-material";

const InlineActionTile = ({ reposition, status, showAdd, add }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Stack
      sx={{
        width: "48px",
        borderRight: "1px solid #eaeaea",
        height: "48px",
        cursor: isHovering ? "pointer" : "default",
      }}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showAdd && <AddChip onClick={add} />}
      {isHovering ? (
        <PositionGrabber onDrop={reposition} />
      ) : (
        <StatusLight status={status} />
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

const PositionGrabber = ({ onDrop }) => {
  return (
    <Stack onDrop={onDrop}>
      <DragHandle />
    </Stack>
  );
};
