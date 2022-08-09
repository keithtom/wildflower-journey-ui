import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { styled, css } from "@mui/material/styles";

import { theme } from "../styles/theme";
import {
  Avatar,
  Card,
  Typography,
  Stack,
  Grid,
  Divider,
  Link,
  Icon,
  Box,
} from "./ui/index";

import {
  Drawer,
  Toolbar,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  PeopleAlt,
  MeetingRoom,
  MenuOutlined,
  Quiz,
  Info,
  ArrowForward,
} from "@mui/icons-material";

const appBarHeight = 64;

const CustomAppBar = styled(AppBar)`
  outline: 1px solid ${({ theme }) => theme.color.neutral.main};
  border: none;
  padding: ${({ theme }) => theme.util.buffer * 4}px;
  background: white;
  margin: 0;
  position: fixed;
  height: ${appBarHeight}px;
`;

const Nav = ({}) => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileNavOpen, setProfileNavOpen] = useState(false);

  const router = useRouter();
  const isSm = useMediaQuery({ maxDeviceWidth: theme.breakpoints.values.sm });

  return (
    <CustomAppBar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="bodyLarge" bold>
            Wildflower Platform
          </Typography>
        </Grid>
        <Grid item>
          <Avatar size="sm" src={user.profileImage} />
        </Grid>
      </Grid>
    </CustomAppBar>
  );
};

export default Nav;

const user = {
  email: "laurinda_lockman@spencer-hickle.io",
  firstName: "Maya",
  lastName: "Walley",
  profileImage:
    "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  phoneNumber: "(917) 123-4567",
  location: "New York City",
  skills: ["Finance", "Home Schooling", "Real Estate"],
  bio: "Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
};
