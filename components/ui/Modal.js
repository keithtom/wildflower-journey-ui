import {
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Grid, Icon, IconButton, Typography } from "./index";

export default function Modal({
  title,
  toggle,
  children,
  noPadding,
  fixedDrawer,
  fixedActions,

  ...props
}) {
  const drawerWidth = 200;
  const dialogTitleHeight = 72;
  const fixedActionsHeight = 48;
  return (
    <Dialog
      fullWidth="sm"
      maxWidth="sm"
      onClose={toggle}
      {...props}
      PaperProps={{ style: { height: fixedDrawer ? "600px" : "auto" } }}
    >
      <DialogTitle sx={{ zIndex: 1, height: `${dialogTitleHeight}px` }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="bodyLarge" bold>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={toggle}>
              <Icon type="close" />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          paddingLeft: fixedDrawer && `${drawerWidth + 24}px`,
          zIndex: 0,
        }}
      >
        {fixedDrawer ? (
          <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{
              style: {
                position: "absolute",
                top: 72,
                boxSizing: "border-box",
                width: drawerWidth,
                height: `calc(100% - ${dialogTitleHeight}px - ${
                  fixedActions ? fixedActionsHeight : 0
                }px - 1px )`,

                borderLeft: "none",
                borderBottom: "none",
              },
            }}
          >
            {fixedDrawer}
          </Drawer>
        ) : null}
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      {fixedActions ? (
        <DialogActions sx={{ zIndex: 2, height: `${fixedActionsHeight}px` }}>
          {fixedActions}
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
