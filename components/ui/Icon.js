import {
  MoreVert,
  ChevronRight,
  ArrowForward,
  Close,
  ExpandMore,
  DirectionsBus,
  ImportContacts,
  QuestionAnswer,
  Menu,
  Info,
  Circle,
  CheckCircle,
} from "@mui/icons-material";
import { styled, css } from "@mui/material/styles";

const StyledIcon = styled("span")`
  width: ${({ theme }) => theme.util.buffer * 6}px;
  height: ${({ theme }) => theme.util.buffer * 6}px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.color.text.main};
  }

  /* Small */
  ${(props) =>
    props.size === "small" &&
    css`
      width: ${props.theme.util.buffer * 4}px;
      height: ${props.theme.util.buffer * 4}px;
    `}

  /* Large */
  ${(props) =>
    props.size === "large" &&
    css`
      width: ${props.theme.util.buffer * 8}px;
      height: ${props.theme.util.buffer * 8}px;
    `}

  /* Primary */
  ${(props) =>
    props.variant === "primary" &&
    css`
      svg {
        color: ${props.theme.color.primary.main};
      }
    `}

  /* Lightened */
  ${(props) =>
    props.variant === "lightened" &&
    css`
      svg {
        color: ${props.theme.color.text.lightened};
      }
    `}

  /* Light */
  ${(props) =>
    props.variant === "light" &&
    css`
      svg {
        color: ${props.theme.color.text.light};
      }
    `}

  /* Transparent */
  ${(props) =>
    props.variant === "transparent" &&
    css`
      svg {
        color: transparent;
      }
    `}

  /* Success */
  ${(props) =>
    props.variant === "success" &&
    css`
      svg {
        color: ${props.theme.color.success.medium};
      }
    `}
`;

export default function Icon({ ...props }) {
  const icons = {
    moreVert: <MoreVert />,
    chevronRight: <ChevronRight />,
    arrowForward: <ArrowForward />,
    close: <Close />,
    expandMore: <ExpandMore />,
    directionsBus: <DirectionsBus />,
    importContacts: <ImportContacts />,
    questionAnswer: <QuestionAnswer />,
    menu: <Menu />,
    info: <Info />,
    circle: <Circle />,
    checkCircle: <CheckCircle />,
  };

  return <StyledIcon {...props}>{icons[props.type]}</StyledIcon>;
}
