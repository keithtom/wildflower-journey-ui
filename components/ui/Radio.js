import { default as MaterialRadio } from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const CustomRadio = styled(MaterialRadio)(({ theme }) => ({
  '&.Mui-checked': {
  },
}));

const Radio = ({ ...props }) => {
  return (
    <CustomRadio defaultChecked {...props} />
  );
}

export default Radio