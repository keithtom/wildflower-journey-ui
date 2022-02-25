import { default as MaterialButton } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(MaterialButton)(
  ({
    primary,
    outline,
    theme
  }) => `
  padding: ${theme.util.buffer*2}px ${theme.util.buffer*4}px;
  background-color: ${
    primary ? theme.color.primary.purple.main
    : outline ? theme.color.bg.light
    : theme.color.primary.purple.lightened
  };
  color: ${
    primary ? theme.color.text.light
    : theme.color.primary.purple.main
  };
  text-transform: none;

  :hover {
    background-color: ${theme.color.primary.purple.lightened};
    color: ${theme.color.primary.purple.main};
  }
`,
)

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