import NextLink from "next/link";

// NOTE: This is not included in storybook

const Link = ({ children, ...props }) => {
  return <NextLink {...props}>{children}</NextLink>;
};

export default Link;
