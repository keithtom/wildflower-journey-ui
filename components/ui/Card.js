import { default as MaterialCard } from "@mui/material/Card";
import { styled, css } from "@mui/material/styles";

const CustomCard = styled(MaterialCard)`
  border-radius: ${({ theme }) => theme.radius.lg}px;
  border: 1px solid ${({ theme }) => theme.color.neutral.main};
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  background-color: ${({ theme }) => theme.color.neutral.light};

  /* Primary */
  ${(props) =>
    props.variant === "primary" &&
    css`
      background: ${props.theme.color.primary.main};
      border: 1px solid ${props.theme.color.primary.main};
    `}

  /* Lightened */
  ${(props) =>
    props.variant === "lightened" &&
    css`
      background: ${props.theme.color.neutral.lightened};
      border: 1px solid ${props.theme.color.neutral.lightened};
    `}

  /* Primary Lightened */
  ${(props) =>
    props.variant === "primaryLightened" &&
    css`
      background: ${props.theme.color.primary.lightest};
      border: 1px solid ${props.theme.color.primary.lightest};
    `}

  /* Primary Outlined */
  ${(props) =>
    props.variant === "primaryOutlined" &&
    css`
      border: 1px solid ${props.theme.color.primary.main};
    `}

  /* Success */
  ${(props) =>
    props.variant === "success" &&
    css`
      background: ${props.theme.color.success.lightest};
      border: 1px solid ${props.theme.color.success.lightest};
    `}

  /* Small */
  ${(props) =>
    props.size === "small" &&
    css`
      border-radius: ${props.theme.radius.md}px;
      padding: ${props.theme.util.buffer * 3}px;
    `}

  /* Large */
  ${(props) =>
    props.size === "large" &&
    css`
      border-radius: ${props.theme.radius.lg}px;
      padding: ${props.theme.util.buffer * 12}px;
    `}

  /* Elevated */
  ${(props) =>
    props.elevated &&
    css`
      box-shadow: ${props.theme.shadow.medium.lightened};
    `}

  /* No padding */
  ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}

  /* Hoverable */
  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}

  /* noBorder */
  ${(props) =>
    props.noBorder &&
    css`
      border: none;
    `}

  /* noRadius */
  ${(props) =>
    props.noRadius &&
    css`
      border-radius: 0;
      padding: ${props.theme.util.buffer * 2}px;
    `}
`;

const Card = ({ children, ...props }) => {
  return (
    <CustomCard {...props}>
      {children}
      {/* <CustomCardContent>{children}</CustomCardContent> */}
    </CustomCard>
  );
};

export default Card;
