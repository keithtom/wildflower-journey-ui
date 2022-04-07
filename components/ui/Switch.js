import { default as MaterialSwitch } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import {
  FormControlLabel
} from '@mui/material'

const CustomSwitch = styled(MaterialSwitch)(({ theme }) => ({
}));

const Switch = ({ label, ...rest }) => {
  return (
    <FormControlLabel control={<CustomSwitch {...rest} />} label={label} />
  );
}

export default Switch
