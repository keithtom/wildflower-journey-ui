import { styled, css } from "@mui/material/styles";
import { ListItem } from "@mui/material";

import { Typography, Grid, Link, Icon } from "./index";

const NavLink = ({ to, icon, active, secondary, label }) => {
  const CustomListItem = styled(ListItem)`
    padding: ${({ theme }) => theme.util.buffer * 4}px;
    &:hover {
      background: ${({ theme }) => theme.color.neutral.lightened};
    }

    //Active
    ${(props) =>
      props.active &&
      css`
        background: ${props.theme.color.neutral.lightened};
      `}

    //Secondary
    ${(props) =>
      props.secondary &&
      css`
        padding: ${props.theme.util.buffer * 2}px
          ${props.theme.util.buffer * 4}px;
        border-bottom: 1px solid ${props.theme.color.neutral.lightened};
      `}
  `;

  return (
    <Link href={to}>
      <CustomListItem button active={active} secondary={secondary}>
        <Grid container spacing={secondary ? 5 : 3} alignItems="center">
          {icon && (
            <Grid item>
              <Icon
                type={icon}
                variant={active ? "primary" : secondary && "transparent"}
                size={secondary && "small"}
              />
            </Grid>
          )}
          <Grid item>
            <Typography highlight={active} bold={!secondary}>
              {label}
            </Typography>
          </Grid>
        </Grid>
      </CustomListItem>
    </Link>
  );
};

export default NavLink;
