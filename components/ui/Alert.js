import { default as MaterialAlert } from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const CustomAlert = styled(MaterialAlert)(({ theme }) => ({
}));

const Alert = ({ ...rest }) => {
  return (
    <CustomAlert {...rest} />
  );
}

export default Alert