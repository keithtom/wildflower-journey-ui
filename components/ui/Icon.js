import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  RightArrowAlt,
  X,
  Menu,
  DotsVerticalRounded,
  Circle,
  Link,
  LinkExternal,
  RightArrowCircle,
  Plus,
} from "@styled-icons/boxicons-regular";
import {
  Bus,
  BookReader,
  Conversation,
  CheckCircle,
  Flag,
  Category,
  Label,
  Pencil,
} from "@styled-icons/boxicons-solid";
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
    dotsVertical: <DotsVerticalRounded />,
    chevronRight: <ChevronRight />,
    chevronLeft: <ChevronLeft />,
    rightArrow: <RightArrowAlt />,
    close: <X />,
    expandMore: <ChevronDown />,
    bus: <Bus />,
    bookReader: <BookReader />,
    conversation: <Conversation />,
    menu: <Menu />,
    circle: <Circle />,
    checkCircle: <CheckCircle />,
    flag: <Flag />,
    link: <Link />,
    linkExternal: <LinkExternal />,
    category: <Category />,
    rightArrowCircle: <RightArrowCircle />,
    label: <Label />,
    plus: <Plus />,
    pencil: <Pencil />,
  };

  return <StyledIcon {...props}>{icons[props.type]}</StyledIcon>;
}
