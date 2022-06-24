import { useState, useEffect } from "react";

import {
  Box,
  Grid,
  TextField,
  Select,
  MultiSelect,
  Button,
  Card,
  Typography,
  Stack,
  Switch,
  Checkbox,
} from "@ui";
import NetworkContent from '../../page-content/NetworkContent'

const AddStakeholderContent = ({ toggle }) => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <NetworkContent asStakeholderSelection/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddStakeholderContent;
