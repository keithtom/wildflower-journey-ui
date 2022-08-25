import { default as MaterialTypography } from "@mui/material/Typography";
import { styled, css } from "@mui/material/styles";

const CustomTypography = styled(MaterialTypography)`
  /* Default */
  text-decoration: none;
  color: ${({ theme }) => theme.color.text.main};
  font-weight: ${({ theme }) => theme.typography.weight.main};
  font-family: ${({ theme }) => theme.typography.family};

  /* H1 */
  ${(props) => props.variant === "h1" && css``}
  /* H2 */
  ${(props) => props.variant === "h2" && css``}
  /* H3 */
  ${(props) => props.variant === "h3" && css``}
  /* H4 */
  ${(props) => props.variant === "h4" && css``}
  /* bodyLarge */
  ${(props) => props.variant === "bodyLarge" && css``}
  /* bodyRegular */
  ${(props) => props.variant === "bodyRegular" && css``}
  /* bodySmall */
  ${(props) => props.variant === "bodySmall" && css``}
  /* bodyMini */
  ${(props) => props.variant === "bodyMini" && css``}

  /* bold */
  ${(props) =>
    props.bold &&
    css`
      font-weight: ${props.theme.typography.weight.bold};
    `}

  /* light */
  ${(props) =>
    props.light &&
    css`
      color: ${props.theme.color.text.light};
    `}

  /* lightened */
  ${(props) =>
    props.lightened &&
    css`
      color: ${props.theme.color.text.lightened};
    `}

  /* highlight */
  ${(props) =>
    props.highlight &&
    css`
      color: ${props.theme.color.primary.main};
    `}

  /* transparent */
  ${(props) =>
    props.transparent &&
    css`
      opacity: 0.7;
    `}

  /* error */
  ${(props) =>
    props.error &&
    css`
      color: ${props.theme.color.error.dark};
    `}

  /* warning */
  ${(props) =>
    props.warning &&
    css`
      color: ${props.theme.color.warning.dark};
    `}

  /* success */
  ${(props) =>
    props.success &&
    css`
      color: ${props.theme.color.success.dark};
    `}

  /* capitalize */
  ${(props) =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `}

  /* center */
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}

  /* link */
  ${(props) =>
    props.link &&
    css`
      color: ${props.theme.color.primary.main};
      cursor: pointer;
      &:hover {
        color: ${props.theme.color.primary.darkened};
        cursor: pointer;
      }
    `}

  /* hoverable */
  ${(props) =>
    props.hoverable &&
    css`
      cursor: pointer;
      &:hover {
        cursor: pointer;
      }
    `}
`;

const Typography = ({ children, ...props }) => {
  return <CustomTypography {...props}>{children}</CustomTypography>;
};

export default Typography;
