import { useTranslation } from "next-i18next";
import { Icon, Chip, Stack, Typography } from "./ui";

const StatusChip = ({ status, withIcon, ...props }) => {
  // console.log("Status chip props", status, withIcon, props)
  const { t } = useTranslation("common");
  // console.log({ status });
  const translationObject = {
    "up next": "up_next",
    "to do": "to_do",
    "in progress": "in_progress",
    done: "done",
  };

  return (
    <Chip
      icon={
        withIcon ? (
          <Icon
            type={
              status === "done"
                ? "checkCircle"
                : status === "up next"
                ? "circle"
                : status === "to do"
                ? "rightArrowCircle"
                : status === "in progress" && "rightArrowCircleSolid"
            }
            variant={
              status === "done"
                ? "success"
                : status === "up next"
                ? "lightened"
                : (status === "to do" || status === "in progress") && "primary"
            }
            size="small"
          />
        ) : null
      }
      label={t(`statuses.${translationObject[status]}`).replace(/\b\w/g, (c) =>
        c.toUpperCase()
      )}
      {...props}
    />
  );
};

export default StatusChip;
