import { default as MaterialChip } from "@mui/material/Chip";
import { styled, css } from "@mui/material/styles";

const CustomChip = styled(MaterialChip, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})`
  border-radius: ${({ theme }) => theme.radius.md}px;
  background: ${({ theme }) => theme.color.neutral.main};

  /* Small */
  ${(props) =>
    props.size === "small" &&
    css`
      padding: ${props.theme.util.buffer * 1}px 0;
      font-size: ${props.theme.typography.bodyMini.fontSize};
      font-weight: ${props.theme.typography.weight.bold};
    `}

  /* Large */
  ${(props) =>
    props.size === "large" &&
    css`
      padding: ${props.theme.util.buffer * 2}px 0;
      font-size: ${props.theme.typography.bodyLarge.fontSize};
      font-weight: ${props.theme.typography.weight.bold};
    `}

  /* Primary */
  ${(props) =>
    props.variant === "primary" &&
    css`
      background: ${props.theme.color.primary.main};
      color: ${props.theme.color.text.light};
      &:hover {
        background: ${props.theme.color.primary.darkened};
      }
    `}
  /* PrimaryLightened */
  ${(props) =>
    props.variant === "primaryLightened" &&
    css`
      background: ${props.theme.color.primary.lightest};
      color: ${props.theme.color.text.main};
      &:hover {
        background: ${props.theme.color.primary.lightest};
      }
    `}

  /* Filled */
  ${(props) =>
    props.variant === "filled" &&
    css`
      background: ${props.theme.color.neutral.dark};
      color: ${props.theme.color.text.light};
    `}

  /* Bg color */
  ${(props) =>
    props.bgColor &&
    css`
      background: ${props.bgColor};
    `}
`;

const Chip = ({ variant, size, label, ...props }) => {
  return (
    <CustomChip
      variant={variant ? variant : "lightened"}
      size={size}
      label={label}
      {...props}
    />
  );
};

export default Chip;
