import { default as MaterialSelect } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const CustomSelect = styled(MaterialSelect)(({ theme }) => ({
}));

const Select = ({ children, ...rest }) => {
  return (
    <CustomSelect {...rest}>
      {children}
    </CustomSelect>
  );
}

export default Select
