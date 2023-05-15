import { Icon, Chip, Stack, Typography } from "./ui";
import { theme } from "../styles/theme";
import ssj_categories from "@lib/ssj/categories";

const CategoryChip = ({ category, withIcon, ...props }) => {
  const categories = {
    [ssj_categories.ALBUMS_ADVICE]: theme.color.highlights.pink,
    [ssj_categories.FINANCE]: theme.color.highlights.brown,
    [ssj_categories.FACILITIES]: theme.color.highlights.red,
    [ssj_categories.GOVERNANCE_COMPLIANCE]: theme.color.highlights.yellow,
    [ssj_categories.HUMAN_RESOURCES]: theme.color.highlights.green,
    [ssj_categories.COMMUNITY_FAMILY_ENGAGEMENT]: theme.color.highlights.blue,
    [ssj_categories.CLASSROOM_PROGRAM_PRACTICES]: theme.color.highlights.purple,
  };

  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="category" size="small" />
            <Typography noWrap variant="bodyMini" bold>
              {category}
            </Typography>
          </Stack>
        ) : (
          category
        )
      }
      {...props}
      bgColor={categories[category]}
    />
  );
};

export default CategoryChip;
