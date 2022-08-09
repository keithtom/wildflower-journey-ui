import { styled, css } from "@mui/material/styles";
import { Box } from "./index";
import Nav from "../Nav";

// NOTE: This is not included in storybook

const PageWrapper = styled(Box)`
  display: flex;
`;
const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;

const PageContainer = ({ children }) => {
  return (
    <PageWrapper>
      <Nav />
      <PageContent>{children}</PageContent>
    </PageWrapper>
  );
};

export default PageContainer;
