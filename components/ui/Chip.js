import { default as MaterialChip } from "@mui/material/Chip";
import { styled, css } from "@mui/material/styles";

const CustomChip = styled(MaterialChip)`
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

  /* Primary */
  ${(props) =>
    props.variant === "primary" &&
    css`
      background: ${props.theme.color.primary.main};
      color: ${props.theme.color.text.light};
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

const Chip = ({ ...props }) => {
  return <CustomChip {...props} />;
};

export default Chip;
