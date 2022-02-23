import { default as MaterialCheckbox } from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const CustomCheckbox = styled(MaterialCheckbox)(({ theme }) => ({
  color: theme.color.primary.yellow.main,
  '&.Mui-checked': {
    color: theme.color.primary.purple.main,
  },
}));

export default function Checkbox() {
  return (
    <CustomCheckbox defaultChecked />
  );
}