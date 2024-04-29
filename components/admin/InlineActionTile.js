import { useState } from "react";
import { Stack, Tooltip } from "@mui/material";
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
  lastAdd,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Stack
      id={id}
      sx={{
        width: "48px",
        borderRight: "1px solid #eaeaea",
        height: "44px",
        cursor: isHovering && !disabled ? "pointer" : "default",
      }}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {blank ? null : (
        <>
          {showAdd && <AddChip onClick={add} />}
          {isHovering && !disabled ? (
            dragHandle
          ) : (
            <StatusLight status={status} disabled={disabled} />
          )}
          {showAdd && isLast && <AddChip onClick={lastAdd} isLast={isLast} />}
        </>
      )}
    </Stack>
  );
};

export default InlineActionTile;

const StatusLight = ({ status, disabled }) => {
  return (
    <ConditionalTooltip
      display={disabled}
      title={
        status === "replicated"
          ? "No Changes"
          : status === "upgraded"
          ? "Updated"
          : status === "removed"
          ? "Removed"
          : status === "new" && "New"
      }
    >
      <span>
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
                : status === "new"
                ? "#BBD758"
                : "gray",
          }}
        />
      </span>
    </ConditionalTooltip>
  );
};

const ConditionalTooltip = ({ title, children, display }) => {
  return display ? <Tooltip title={title}>{children}</Tooltip> : children;
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
        zIndex: 1,
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
