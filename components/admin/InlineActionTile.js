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
  isLast,
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
        opacity: disabled ? 0.75 : 1,
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
          {showAdd && isLast && <AddChip onClick={add} isLast={isLast} />}
        </>
      )}
    </Stack>
  );
};

export default InlineActionTile;

const StatusLight = ({ status }) => {
  console.log({ status });
  return (
    <Stack
      sx={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor:
          status === "replicated"
            ? "gray"
            : status === "upgraded"
            ? "#F7D538"
            : status === "removed"
            ? "#F26C23"
            : status === "new" && "#BBD758",
      }}
    />
  );
};

const AddChip = ({ onClick, isLast }) => {
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
        top: isLast ? null : "-12px",
        bottom: isLast ? "-12px" : null,
        zIndex: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#eaeaea",
        },
      }}
      alignItems="center"
      justifyContent="center"
    >
      <AddIcon color="primary" fontSize="small" />
    </Stack>
  );
};
