import { Icon, Chip, Stack } from "./ui";
import { theme } from "../styles/theme";

const CategoryChip = ({ category, withIcon, ...props }) => {
  const categories = {
    Finance: theme.color.highlights.brown,
    Facilities: theme.color.highlights.red,
    "Governance & Compliance": theme.color.highlights.yellow,
    "Human Resources": theme.color.highlights.green,
    "Community & Family Engagement": theme.color.highlights.blue,
    "Classroom & Program Practices": theme.color.highlights.purple,
    Albums: theme.color.highlights.pink,
    "Advice & Affiliation": theme.color.highlights.brown,
    "WF Community & Culture": theme.color.highlights.gray,
  };

  return (
    <Chip
      label={
        withIcon ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <Icon type="category" size="small" />
            <span>{category}</span>
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
