import { default as MaterialModal } from "@mui/material/Modal";
import { Card, Grid, Icon, Stack, IconButton, Typography } from "./index";
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
`;

export default function Modal({
  title,
  toggle,
  children,
  noPadding,
  ...props
}) {
  return (
    <CustomModal {...props} onClose={toggle}>
      <ModalCard elevated noPadding={noPadding}>
        <Stack spacing={4}>
          <Grid container alignItems="center" justifyContent="flex-end">
            {title && (
              <Grid item flex={1}>
                <Typography variant="h4">{title}</Typography>
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
      </ModalCard>
    </CustomModal>
  );
}
