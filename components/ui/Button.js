import { default as MaterialButton } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(MaterialButton)(({ theme }) => `
  text-transform: none;
  box-shadow: none;
`)

export default function Button({
  children,
  ...rest
}) {
  return (
    <CustomButton
      {...rest}
    >{children}</CustomButton>
  );
}
