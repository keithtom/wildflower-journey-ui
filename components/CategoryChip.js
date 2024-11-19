import { useTranslation } from "next-i18next";

import { Icon, Chip, Stack, Typography } from "./ui";
import { theme } from "../styles/theme";
import ssj_categories from "@lib/ssj/categories";

const CategoryChip = ({ category, withIcon, ...props }) => {
  const { t } = useTranslation("common");
  // console.log("Category chip props", category, withIcon, props)
  // console.log({ category });

  const categories = {
    [ssj_categories.ALBUMS_ADVICE]: theme.color.highlights.pink,
    [ssj_categories.FINANCE]: theme.color.highlights.brown,
    [ssj_categories.FACILITIES]: theme.color.highlights.red,
    [ssj_categories.GOVERNANCE_COMPLIANCE]: theme.color.highlights.yellow,
    [ssj_categories.HUMAN_RESOURCES]: theme.color.highlights.green,
    [ssj_categories.COMMUNITY_FAMILY_ENGAGEMENT]: theme.color.highlights.blue,
    [ssj_categories.CLASSROOM_PROGRAM_PRACTICES]: theme.color.highlights.purple,
    [ssj_categories.FUNDRAISING]: theme.color.highlights.brown,
  };
  const translationObject = {
    [ssj_categories.ALBUMS_ADVICE]: "albums_advice",
    [ssj_categories.FINANCE]: "finance",
    [ssj_categories.FACILITIES]: "facilities",
    [ssj_categories.GOVERNANCE_COMPLIANCE]: "governance_compliance",
    [ssj_categories.HUMAN_RESOURCES]: "human_resources",
    [ssj_categories.COMMUNITY_FAMILY_ENGAGEMENT]: "community_family_engagement",
    [ssj_categories.CLASSROOM_PROGRAM_PRACTICES]: "classroom_program_practices",
    [ssj_categories.FUNDRAISING]: "fundraising",
    [ssj_categories.NO_CATEGORY]: "no_category",
  };

  return (
    <Chip
      icon={withIcon ? <Icon type="category" size="small" /> : null}
      label={t(`categories.${translationObject[category]}`)}
      {...props}
      bgColor={categories[category]}
    />
  );
};

export default CategoryChip;
