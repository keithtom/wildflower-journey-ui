import { Icon, Chip, Stack, Typography } from "./ui";
import { useTranslation } from "next-i18next";

const WorktimeChip = ({ worktime, withIcon, ...props }) => {
  const { t } = useTranslation("common");
  // split the worktime string
  const splitWorktime = (worktime) => {
    if (typeof worktime !== "string") {
      throw new TypeError("Expected a string as input");
    }
    return worktime.split(" ");
  };
  // use the translations for specific words
  const worktimeItems = splitWorktime(worktime).map((item) => {
    if (item === "About") {
      return t("ssj_ui_content.about");
    } else if (item === "hours") {
      return t("ssj_ui_content.hours");
    }
    return item;
  });
  //log the output
  // console.log({ worktimeItems });

  return (
    <Chip
      icon={withIcon ? <Icon type="time" size="small" /> : null}
      label={worktimeItems.map((w, i) => (
        <span key={i}>{w} </span>
      ))}
      {...props}
    />
  );
};

export default WorktimeChip;
