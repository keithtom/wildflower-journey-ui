import { default as MaterialAlertTitle } from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

const CustomAlertTitle = styled(MaterialAlertTitle)(({ theme }) => ({
}));

const AlertTitle = ({ ...rest }) => {
  return (
    <CustomAlertTitle {...rest} />
  );
}

export default AlertTitle