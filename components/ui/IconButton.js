import { default as MaterialIconButton } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(MaterialIconButton)(({ theme }) => `
  text-transform: none;
  box-shadow: none;
`)

export default function IconButton({
  children,
  ...rest
}) {
  return (
    <CustomIconButton
      {...rest}
    >{children}</CustomIconButton>
  );
}
