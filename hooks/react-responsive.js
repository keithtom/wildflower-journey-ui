import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { theme } from "../styles/theme";
import _ from "lodash";

export const getScreenSize = () => {
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  const getXs = useMediaQuery({ maxWidth: theme.breakpoints.values.xs });
  const getSm = useMediaQuery({ maxWidth: theme.breakpoints.values.sm });
  const getMd = useMediaQuery({ maxWidth: theme.breakpoints.values.md });
  const getLg = useMediaQuery({ maxWidth: theme.breakpoints.values.lg });

  useEffect(() => {
    // Update the state initially
    setIsXs(getXs);
    setIsSm(getSm);
    setIsMd(getMd);
    setIsLg(getLg);

    // Add debounced event listener for window resize
    const handleResize = _.debounce(() => {
      setIsXs(getXs);
      setIsSm(getSm);
      setIsMd(getMd);
      setIsLg(getLg);
      // console.log("resizing")
    }, 200); // Adjust the debounce wait time as needed

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getXs, getSm, getMd, getLg]);

  return {
    screenSize: {
      isXs,
      isSm,
      isMd,
      isLg,
    },
  };
};
