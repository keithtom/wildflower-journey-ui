import { useMediaQuery } from "react-responsive";
import { theme } from "../styles/theme";

export const getScreenSize = () => {
  const isXs = useMediaQuery({ maxWidth: theme.breakpoints.values.xs });
  const isSm = useMediaQuery({ maxWidth: theme.breakpoints.values.sm });
  const isMd = useMediaQuery({ maxWidth: theme.breakpoints.values.md });
  const isLg = useMediaQuery({ maxWidth: theme.breakpoints.values.lg });

  return {
    screenSize: {
      isXs,
      isSm,
      isMd,
      isLg,
    },
  };
};
