import { default as MaterialButton } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(MaterialButton)(({ theme }) => `
  text-transform: none;
  box-shadow: none;
`)

export default function Button({
  children,
  variant = "contained",
  ...rest
}) {
  return (
    <CustomButton
      variant={variant}
      {...rest}
    >{children}</CustomButton>
  );
}
