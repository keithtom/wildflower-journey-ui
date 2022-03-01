import { default as MaterialRadio } from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const CustomRadio = styled(MaterialRadio)(({ theme }) => ({
  '&.Mui-checked': {
  },
}));

const Radio = ({ ...rest }) => {
  return (
    <CustomRadio defaultChecked {...rest} />
  );
}

export default Radio