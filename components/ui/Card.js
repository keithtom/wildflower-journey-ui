import React from "react";
import { default as MaterialCard } from "@mui/material/Card";
import { styled, css } from "@mui/material/styles";

const CustomCard = styled(MaterialCard, {
  shouldForwardProp: (prop) =>
    prop !== "elevated" &&
    prop !== "noPadding" &&
    prop !== "hoverable" &&
    prop !== "noBorder" &&
    prop !== "noRadius",
})`
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

      /* Error */
      ${(props) =>
    props.variant === "error" &&
    css`
      background: ${props.theme.color.error.lightest};
      border: 1px solid ${props.theme.color.error.medium};
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
    `}
`;

const Card = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <CustomCard ref={ref} {...props}>
      {children}
    </CustomCard>
  );
});

export default Card;
