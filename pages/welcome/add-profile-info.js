import { useState } from "react";
import { styled } from "@mui/material/styles";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);
import { getCookie } from "cookies-next";
import { FileChecksum } from "@lib/rails-filechecksum";
import { useRouter } from "next/router";
import axios from "axios";
import { useUserContext } from "@lib/useUserContext";
import peopleApi from "../../api/people";

const token = getCookie("auth");

import {
  Button,
  Grid,
  Stack,
  Typography,
  Card,
  Icon,
  Avatar,
  Link,
  IconButton,
  TextField,
  Select,
  MultiSelect,
  Radio,
  Divider,
  PageContainer,
} from "@ui";
import Header from "@components/Header";
import { PinDropSharp } from "@mui/icons-material";

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
  const [profileImage, setProfileImage] = useState();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUserContext();

  const handleSubmit = () => {
    peopleApi
      .update(currentUser.id, {
        person: {
          profile_image: profileImage,
        },
      })
      .then((response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          const personAttributes = response.data.attributes;
          currentUser.attributes.imageUrl = personAttributes.imageUrl;
          setCurrentUser(currentUser);
          router.push("/ssj");
        }
      });
  };

  const handleFileError = (error) => {
    alert(`Error: ${error.main}. ${error.sub}`);
  };

  const isExistingTL = false;
  const opsGuide = currentUser?.attributes?.ssj?.opsGuide?.data?.attributes;

  return (
    <PageContainer isLoading={!currentUser} hideNav>
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
                      <Grid item>
                        <Icon type="star" variant="primary" />
                      </Grid>
                      <Typography variant="bodySmall">
                        This helps other members of the Wildflower Schools
                        network better connect with you!
                      </Typography>
                    </Stack>
                  </Card>
                  {opsGuide ? (
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar size="sm" src={opsGuide?.imageUrl} />
                      <Stack>
                        <Typography variant="bodySmall" bold>
                          {opsGuide?.firstName} {opsGuide?.lastName}
                        </Typography>
                        <Typography variant="bodySmall" lightened>
                          Operations Guide
                        </Typography>
                      </Stack>
                    </Stack>
                  ) : null}
                </>
              )}

              <Divider />

              <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                  <StyledFilePond
                    files={profilePicture}
                    allowReorder={false}
                    allowMultiple={false}
                    maxFileSize="5MB"
                    acceptedFileTypes={['image/*']}
                    onupdatefiles={setProfilePicture}
                    stylePanelAspectRatio="1:1"
                    onerror={handleFileError}
                    stylePanelLayout="circle"
                    server={{
                      process: (
                        fieldName,
                        file,
                        metadata,
                        load,
                        error,
                        progress,
                        abort,
                        transfer,
                        options
                      ) => {
                        // https://github.com/pqina/filepond/issues/279#issuecomment-479961967
                        FileChecksum.create(
                          file,
                          (checksum_error, checksum) => {
                            if (checksum_error) {
                              console.error(checksum_error);
                              error();
                            }
                            axios
                              .post(
                                `${process.env.API_URL}/rails/active_storage/direct_uploads`,
                                {
                                  blob: {
                                    filename: file.name,
                                    content_type: file.type,
                                    byte_size: file.size,
                                    checksum: checksum,
                                  },
                                }
                              )
                              .then((response) => {
                                if (!response.data) {
                                  return error;
                                }
                                const signed_id = response.data.signed_id;
                                axios
                                  .put(response.data.direct_upload.url, file, {
                                    headers:
                                      response.data.direct_upload.headers,
                                    onUploadProgress: (progressEvent) => {
                                      progress(
                                        progressEvent.lengthComputable,
                                        progressEvent.loaded,
                                        progressEvent.total
                                      );
                                    },
                                    // need to remove default Authorization header when sending to s3
                                    transformRequest: (data, headers) => {
                                      delete headers.common["Authorization"];
                                      return data;
                                    },
                                  })
                                  .then((response) => {
                                    setProfileImage(signed_id);
                                    load(signed_id);
                                  })
                                  .catch((error) => {
                                    if (!axios.isCancel(error)) {
                                      console.error(error);
                                      // error();
                                    }
                                  });
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }
                        );
                        return {
                          abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            // request.abort(); TODO: is there an active storage abort?

                            // Let FilePond know the request has been cancelled
                            abort();
                          },
                        };
                      },
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      ondata: (formData) => {
                        formData.append("blob", value);
                        return formData;
                      },
                      onload: () => {
                        props.onUploadComplete();
                      },
                    }}
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
                  <Button
                    full
                    disabled={!profilePicture}
                    onClick={handleSubmit}
                  >
                    <Typography variant="bodyRegular" light>
                      Confirm
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/ssj">
                    <Button full variant="text">
                      <Typography variant="bodyRegular" highlight>
                        Skip for now
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
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
