import { styled, css } from "@mui/material/styles";
import { Box } from "./index";
import Nav from "../Nav";

// NOTE: This is not included in storybook

const PageWrapper = styled(Box)`
  display: flex;
`;
const PageContent = styled(Box)`
  flex-grow: 1;
  padding-top: ${({ theme }) => theme.util.buffer * 16}px;
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
