import { default as MaterialPopover } from '@mui/material/Popover';
import { styled } from '@mui/material/styles';

const CustomPopover = styled(MaterialPopover)(({ theme }) => ``)

export default function Popover({
  children,
  ...rest
}) {
  return (
    <CustomPopover
      {...rest}
    >{children}</CustomPopover>
  );
}
