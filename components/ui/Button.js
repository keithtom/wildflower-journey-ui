import { default as MaterialButton } from "@mui/material/Button";
import { styled, css } from "@mui/material/styles";

const CustomButton = styled(MaterialButton)`
  padding: ${({ theme }) => theme.util.buffer * 3}px
    ${({ theme }) => theme.util.buffer * 6}px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background: ${({ theme }) => theme.color.primary.main};
  * {
    color: ${({ theme }) => theme.color.text.light};
  }
  border: none;
  text-transform: none;
  &:hover {
    border: none;
    background: ${({ theme }) => theme.color.primary.darkened};
    * {
      color: ${({ theme }) => theme.color.primary.light};
    }
  }

  /* Text */
  ${(props) =>
    props.variant === "text" &&
    css`
      background: transparent;
      * {
        color: ${props.theme.color.primary.main};
      }
      &:hover {
        background: ${props.theme.color.primary.lightest};
        * {
          color: ${props.theme.color.primary.light};
        }
      }
    `}

  /* Secondary */
  ${(props) =>
    props.variant === "secondary" &&
    css`
      background: ${props.theme.color.primary.lightest};
      * {
        color: ${props.theme.color.primary.main};
      }
      &:hover {
        background: ${props.theme.color.primary.lightened};
        * {
          color: ${props.theme.color.primary.darkened};
        }
      }
    `}

  /* Light */
  ${(props) =>
    props.variant === "light" &&
    css`
      background: ${props.theme.color.neutral.lightest};
      * {
        color: ${props.theme.color.primary.main};
      }
      &:hover {
        background: ${props.theme.color.neutral.lightened};
        * {
          color: ${props.theme.color.primary.main};
        }
      }
    `}

  /* Danger */
  ${(props) =>
    props.variant === "danger" &&
    css`
      background: ${props.theme.color.error.light};
      * {
        color: ${props.theme.color.error.dark};
      }
      &:hover {
        background: ${props.theme.color.error.medium};
        * {
          color: ${props.theme.color.error.darkened};
        }
      }
    `}

  /* small */
  ${(props) =>
    props.small &&
    css`
      padding: ${props.theme.util.buffer * 1}px ${props.theme.util.buffer * 3}px;
      font-size: ${props.theme.typography.bodySmall.fontSize};
    `}

  /* Disabled */
  ${(props) =>
    props.disabled &&
    css`
      background: ${props.theme.color.neutral.lightened};
      * {
        color: ${props.theme.color.neutral.main};
      }
    `}

  /* Full */
  ${(props) =>
    props.full &&
    css`
      width: 100%;
    `}
`;

export default function Button({ children, ...props }) {
  return <CustomButton {...props}>{children}</CustomButton>;
}
