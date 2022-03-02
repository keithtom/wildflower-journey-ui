import { default as MaterialToggleButton } from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';

const CustomToggleButton = styled(MaterialToggleButton)(({ theme }) => `
`)

export default function ToggleButton({
  children,
  ...rest
}) {
  return (
    <CustomToggleButton
      {...rest}
    >{children}</CustomToggleButton>
  );
}
