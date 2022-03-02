import { default as MaterialTextField } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(MaterialTextField)(({ theme }) => `
`)

export default function TextField({
  children,
  ...rest
}) {
  return (
    <CustomTextField
      {...rest}
    >{children}</CustomTextField>
  );
}
