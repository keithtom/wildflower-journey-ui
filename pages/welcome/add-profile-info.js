import { useEffect, useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Box,
  Icon,
  Avatar,
  Link,
  IconButton,
  TextField,
  Select,
  MultiSelect,
  Radio,
  Divider,
} from "@ui";
import Header from "@components/Header";

const PageContent = styled(Box)`
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.util.appBarHeight}px;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
`;
const StyledFilePond = styled(FilePond)`
  .filepond--root {
    font-family: ${({ theme }) => theme.typography.family};
  }
  .filepond--panel-root {
    background-color: ${({ theme }) => theme.color.neutral.lightened};
  }
`;

const AddProfileInfo = ({}) => {
  const [profilePicture, setProfilePicture] = useState();

  // console.log({ profilePicture });

  const isExistingTL = false;

  return (
    <>
      <Header user={false} />
      <PageContent>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Stack spacing={6}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="h4" bold>
                      Add a profile picture
                    </Typography>
                  </Grid>
                </Grid>
                {isExistingTL ? null : (
                  <>
                    <Card variant="primaryLightened" size="small">
                      <Stack direction="row" spacing={3}>
                        <Icon type="star" variant="primary" />
                        <Typography variant="bodySmall">
                          This helps other members of the Wildflower Schools
                          network better connect with you!
                        </Typography>
                      </Stack>
                    </Card>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar
                        size="sm"
                        src="https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
                      />
                      <Stack>
                        <Typography variant="bodySmall" bold>
                          Mary Truman
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          Operations Guide
                        </Typography>
                      </Stack>
                    </Stack>
                  </>
                )}

                <Divider />

                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={8} md={6}>
                    <StyledFilePond
                      files={profilePicture}
                      allowReorder={false}
                      allowMultiple={false}
                      onupdatefiles={setProfilePicture}
                      stylePanelAspectRatio="1:1"
                      stylePanelLayout="circle"
                      credits={false}
                      labelIdle='Drag & Drop your profile picture or <span class="filepond--label-action">Browse</span>'
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={3} justifyContent="space-between">
                  <Grid item xs={6}>
                    <Link href="/welcome/confirm-demographic-info">
                      <Button full variant="secondary">
                        <Typography variant="bodyRegular">Back</Typography>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    {/* TODO: Change the destination depending on existing vs new TL */}
                    <Link href="/ssj">
                      <Button full disabled={!profilePicture}>
                        <Typography variant="bodyRegular" light>
                          Confirm
                        </Typography>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

export default AddProfileInfo;

const user = {
  language: "English",
  ethnicity: ["Asian", "White"],
  lgbtqia: true,
  genderIdentity: "Gender Non-Conforming",
  pronouns: "They/Them/Theirs",
  householdIncome: "Middle Income",
};
