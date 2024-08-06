import { default as MaterialModal } from "@mui/material/Modal";
import { Card, Grid, Icon, Stack, IconButton, Typography, Box } from "./index";
import { styled, css } from "@mui/material/styles";

const CustomModal = styled(MaterialModal)``;
const ModalCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "fixedActions",
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 640px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-width: 90%;
  ${(props) =>
    props.fixedActions &&
    css`
      padding-bottom: 0;
    `}
`;
const FixedActions = styled(Box)`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.color.neutral.lightest};
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  padding: ${({ theme }) => theme.util.buffer * 3}px;
`;
const FixedMenu = styled(Box)`
  position: sticky;
  top: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.color.neutral.lightest};
`;

export default function Modal({
  title,
  toggle,
  children,
  noPadding,
  fixedActions,
  fixedMenu,
  ...props
}) {
  return (
    <CustomModal {...props} onClose={toggle}>
      <ModalCard elevated noPadding fixedActions={fixedActions}>
        <Stack spacing={4}>
          <Card noBorder sx={{ paddingBottom: 0 }}>
            <Grid container alignItems="center" justifyContent="flex-end">
              {title && (
                <Grid item flex={1}>
                  <Typography variant="h4" bold>
                    {title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <IconButton size="small" onClick={toggle}>
                  <Icon type="close" />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
          <Grid container>
            {fixedMenu ? (
              <Grid item xs={4} sx={{ borderRight: "1px solid #f1f1f1" }}>
                <FixedMenu>{fixedMenu}</FixedMenu>
              </Grid>
            ) : null}
            <Grid item flex={1}>
              <Card noPadding={noPadding} noBorder noRadius>
                {children}
              </Card>
            </Grid>
          </Grid>
        </Stack>
        {fixedActions ? <FixedActions>{fixedActions}</FixedActions> : null}
      </ModalCard>
    </CustomModal>
  );
}
