import { default as MaterialModal } from "@mui/material/Modal";
import { Card, Grid, Icon, Stack, IconButton, Typography, Box } from "./index";
import { styled, css } from "@mui/material/styles";

const CustomModal = styled(MaterialModal)``;
const ModalCard = styled(Card)`
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

export default function Modal({
  title,
  toggle,
  children,
  noPadding,
  fixedActions,
  ...props
}) {
  return (
    <CustomModal {...props} onClose={toggle}>
      <ModalCard elevated noPadding fixedActions={fixedActions}>
        <Card noPadding={noPadding} noBorder>
          <Stack spacing={4}>
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
            {children}
          </Stack>
        </Card>
        {fixedActions ? <FixedActions>{fixedActions}</FixedActions> : null}
      </ModalCard>
    </CustomModal>
  );
}
