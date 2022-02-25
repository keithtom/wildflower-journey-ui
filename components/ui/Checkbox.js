import { default as MaterialCheckbox } from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const CustomCheckbox = styled(MaterialCheckbox)(({ theme }) => ({
  '&.Mui-checked': {
  },
}));

const Checkbox = ({ ...props }) => {
  return (
    <CustomCheckbox defaultChecked {...props} />
  );
}

export default Checkbox