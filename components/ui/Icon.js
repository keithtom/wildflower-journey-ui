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
  Check,
  Extension,
  Palette,
  Pause,
  Play,
  WindowClose,
  Glasses,
  CheckDouble,
  CalendarCheck,
  Layer,
  FileBlank,
  Copy,
  Search,
  ShapePolygon,
  Filter,
  Minus,
} from "@styled-icons/boxicons-regular";
import {
  BuildingHouse,
  Bus,
  BookReader,
  Conversation,
  CheckCircle,
  Flag,
  Category,
  Label,
  Pencil,
  PieChart,
  Zap,
  Star,
  Message,
  CommentError,
  RightArrowCircle as RightArrowCircleSolid,
  Circle as CircleSolid,
  Time,
  Home,
  Wrench,
  Lock,
  Map,
  CalendarAlt,
} from "@styled-icons/boxicons-solid";
import { styled, css } from "@mui/material/styles";

const StyledIcon = styled("span", {
  shouldForwardProp: (prop) =>
    prop !== "type" &&
    prop !== "filled" &&
    prop !== "hoverable" &&
    prop !== "variant",
})`
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

  /* Medium */
  ${(props) =>
    props.size === "medium" &&
    css`
      width: ${props.theme.util.buffer * 6}px;
      height: ${props.theme.util.buffer * 6}px;
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
    props.variant === "lightest" &&
    css`
      svg {
        color: ${props.theme.color.neutral.lightened};
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

  /* Hoverable */
  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}

  /* Filled */
  ${(props) =>
    props.filled &&
    css`
      background: ${props.theme.color.neutral.lightest};
      border-radius: ${props.theme.radius.full}px;
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
    circleSolid: <CircleSolid />,
    checkCircle: <CheckCircle />,
    flag: <Flag />,
    link: <Link />,
    linkExternal: <LinkExternal />,
    category: <Category />,
    rightArrowCircle: <RightArrowCircle />,
    rightArrowCircleSolid: <RightArrowCircleSolid />,
    label: <Label />,
    plus: <Plus />,
    pencil: <Pencil />,
    pieChart: <PieChart />,
    zap: <Zap />,
    check: <Check />,
    buildingHouse: <BuildingHouse />,
    extension: <Extension />,
    palette: <Palette />,
    star: <Star />,
    message: <Message />,
    pause: <Pause />,
    play: <Play />,
    windowClose: <WindowClose />,
    glasses: <Glasses />,
    checkDouble: <CheckDouble />,
    commentError: <CommentError />,
    home: <Home />,
    time: <Time />,
    calendarCheck: <CalendarCheck />,
    layer: <Layer />,
    fileBlank: <FileBlank />,
    copy: <Copy />,
    search: <Search />,
    wrench: <Wrench />,
    shapePolygon: <ShapePolygon />,
    lock: <Lock />,
    filter: <Filter />,
    minus: <Minus />,
    map: <Map />,
    calendar: <CalendarAlt />,
  };

  return <StyledIcon {...props}>{icons[props.type]}</StyledIcon>;
}
