import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { FormControlLabel, RadioGroup } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Drawer } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import useWorkflow from "@hooks/workflow/definition/useWorkflow";
import useMilestones from "@hooks/workflow/definition/useMilestones";
import useStep from "@hooks/workflow/definition/useStep";

import ProcessOrStepGroup from "@components/admin/workflow/ProcessOrStepGroup";
import ProcessItem from "@components/admin/workflow/ProcessItem";
import {
  Box,
  PageContainer,
  Button,
  Grid,
  Typography,
  Stack,
  Card,
  Icon,
  Avatar,
  Modal,
  TextField,
  Radio,
  Spinner,
  Link,
  Divider,
  IconButton,
  Select,
  Switch,
  MultiSelect,
} from "@ui";

const EditWorkflowPage = () => {
  const router = useRouter();
  const { workflowId } = router.query;

  const { milestonesByPhase, isLoading: milestonesByPhaseLoading } =
    useMilestones();
  const { workflow, isLoading, isError } = useWorkflow(workflowId);

  // console.log({ workflow });
  // console.log({ milestonesByPhase });

  return (
    <PageContainer isAdmin>
      <Stack spacing={6}>
        <Grid container>
          <Grid item>
            <Typography variant="bodyLarge" bold>
              Workflow Definition
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          {milestonesByPhase?.map((m, i) => (
            <Grid item xs={12}>
              <Stack spacing={6}>
                <Typography variant="bodyLarge" bold>
                  {m.phase}
                </Typography>
                <ProcessOrStepGroup key={i}>
                  {m.milestones.map((p, i) => (
                    <ProcessItem
                      isLoading={milestonesByPhaseLoading}
                      key={i}
                      number={i}
                      process={p}
                      listLength={m.milestones.length}
                    />
                  ))}
                </ProcessOrStepGroup>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default EditWorkflowPage;
