import { default as MaterialModal } from '@mui/material/Modal';
import {
  Card,
  Grid,
  ToggleButton,
  Typography
} from '@ui'
import { styled } from '@mui/material/styles';
import {
  Close
} from '@mui/icons-material'

const CustomModal = styled(MaterialModal)(({ theme }) => `
`)

export default function Modal({
  title,
  toggle,
  children,
  ...rest
}) {
  return (
    <CustomModal
      {...rest}
      onClose={toggle}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          {title &&<Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>}
          <Grid item>
            <ToggleButton
              size="small"
              onChange={toggle}
            >
              <Close />
            </ToggleButton>
          </Grid>
        </Grid>
        {children}</Card>
    </CustomModal>
  );
}
