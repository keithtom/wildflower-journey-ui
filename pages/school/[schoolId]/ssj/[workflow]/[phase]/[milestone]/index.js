import { useRouter } from "next/router";
import { useState } from "react";
import { styled, css } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { arrayMoveImmutable } from "array-move";
import getAuthHeader from "@lib/getAuthHeader";
import processesApi from "@api/workflow/processes";
import { clearLoggedInState, redirectLoginProps } from "@lib/handleLogout";
import { List, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";

import useAuth from "@lib/utils/useAuth";
import {
  Avatar,
  Button,
  PageContainer,
  Typography,
  Card,
  Stack,
  Icon,
  IconButton,
  Link,
  Modal,
  Grid,
  TextField,
} from "@ui";
import Task from "@components/Task";

import MilestonePageHead from "@components/MilestonePageHead";
import Milestone from "@components/Milestone";
import useMilestone from "@hooks/useMilestone";
import { getTranslatedAttr } from "@lib/utils/getTranslatedAttr";
import useSchool from "@hooks/useSchool";
const MilestonePage = ({ FakeMilestoneTasks }) => {
  const router = useRouter();
  const { workflow, phase, milestone: milestoneQuery, schoolId } = router.query;

  const { data: school } = useSchool(schoolId, {
    serialization_fields: ["name"],
  });

  const { t } = useTranslation("common");

  const { milestone, isLoading } = useMilestone(milestoneQuery);

  const milestoneAttributes = milestone?.attributes;
  const isSensibleDefault = false;
  const isUpNext = milestoneAttributes?.status === "up next";

  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [userIsEditing, setUserIsEditing] = useState(false);

  const handleCompleteMilestone = () => {
    setCompleteModalOpen(true);
    //send data to backend
    // ??? implement?
  };
  const handleSaveEditedMilestone = () => {
    //updateMilestone
    setUserIsEditing(false);
  };

  const milestonePrerequisites =
    milestone?.relationships?.prerequisiteProcesses?.data?.filter(
      (prerequisite) => prerequisite.attributes.status !== "done"
    );

  const hasPrerequisites = milestonePrerequisites?.length > 0;

  const milestoneRelationships = milestone?.relationships?.steps?.data;

  const sortedMilestoneTasks = milestoneRelationships?.sort((a, b) =>
    a.attributes.position > b.attributes.position ? 1 : -1
  );

  useAuth("/login");

  return (
    <PageContainer title={school?.data.attributes.name}>
      <Stack spacing={12}>
        <Stack spacing={8}>
          {hasPrerequisites && isUpNext && (
            <Card variant="primaryOutlined" data-cy="hold-up-milestone-card">
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <Typography variant="h4" bold highlight>
                      {t("ssj_ui_content.hold_up_try_something_else_first")}
                    </Typography>
                    <Typography variant="bodyLarge" lightened>
                      {t("ssj_ui_content.we_dont_think_youre_ready")}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={3}>
                    <Card noPadding>
                      {milestonePrerequisites &&
                        milestonePrerequisites.map((m, i) => (
                          <Milestone
                            link={`/school/${schoolId}/ssj/${workflow}/${phase}/${m.id}`}
                            key={i}
                            title={
                              m.attributes[
                                getTranslatedAttr(router.locale, "title")
                              ] || m.attributes.title
                            }
                            description={
                              m.attributes[
                                getTranslatedAttr(router.locale, "description")
                              ] || m.attributes.description
                            }
                            categories={m.attributes.categories}
                            status={m.attributes.status}
                            stepCount={m.relationships.steps.data.length}
                          />
                        ))}
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Link href={`/school/${schoolId}/ssj/${workflow}/${phase}`}>
                  <IconButton>
                    <Icon type="chevronLeft" />
                  </IconButton>
                </Link>
                <Typography capitalize>{t(`ssj_phases.${phase}`)}</Typography>
              </Stack>
            </Grid>
            {/* <Grid item>
              {userIsEditing ? (
                <Stack spacing={1} direction="row">
                  <Button
                    variant="light"
                    onClick={() => setUserIsEditing(false)}
                  >
                    <Typography variant="bodyRegular">Cancel</Typography>
                  </Button>
                  <Button variant="primary" onClick={handleSaveEditedMilestone}>
                    <Typography variant="bodyRegular">Save</Typography>
                  </Button>
                </Stack>
              ) : (
                <Button variant="light" onClick={() => setUserIsEditing(true)}>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <Icon type="pencil" size="small" />
                    <Typography variant="bodyRegular">Edit</Typography>
                  </Stack>
                </Button>
              )}
            </Grid> */}
          </Grid>

          <MilestonePageHead
            isLoading={isLoading}
            title={
              milestone?.attributes[
                getTranslatedAttr(router.locale, "title")
              ] || milestone?.attributes.title
            }
            description={
              milestone?.attributes[
                getTranslatedAttr(router.locale, "description")
              ] || milestone?.attributes.description
            }
            status={milestone?.attributes.status}
            categories={milestone?.attributes.categories}
          />
        </Stack>

        {isLoading ? (
          <Stack spacing={3}>
            <Skeleton height={24} width={320} />
            {Array.from({ length: 5 }, (_, j) => (
              <Skeleton key={j} height={64} m={0} variant="rounded" />
            ))}
          </Stack>
        ) : (
          <Stack>
            {userIsEditing ? (
              <>
                <Typography>Coming Soon</Typography>
                {/* <NewTaskInput />
                <EditableTaskList tasks={FakeMilestoneTasks} /> */}
              </>
            ) : sortedMilestoneTasks ? (
              <Card noPadding>
                <List
                  subheader={
                    <Card variant="lightened" size="small" noRadius>
                      <Stack
                        direction="row"
                        spacing={5}
                        pl={1}
                        alignItems="center"
                      >
                        <Icon type="checkDouble" variant="primary" />
                        <Typography variant="bodyRegular" bold>
                          {t("ssj_ui_content.tasks")}
                        </Typography>
                      </Stack>
                    </Card>
                  }
                >
                  {sortedMilestoneTasks.map((t, i) => (
                    <Task
                      key={t.id}
                      task={t}
                      isLast={i + 1 === sortedMilestoneTasks.length}
                      isNext={isUpNext}
                      handleCompleteMilestone={handleCompleteMilestone}
                      categories={milestone.attributes.categories}
                    />
                  ))}
                </List>
              </Card>
            ) : (
              <Card hoverable elevated size="small">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Stack>
                      <Typography variant="bodyRegular" bold>
                        Looks like there are no tasks for this milestone.
                      </Typography>
                      <Typography variant="bodySmall" lightened>
                        Add a task to do in order to complete this milestone.
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Icon type="plus" variant="primary" />
                  </Grid>
                </Grid>
              </Card>
            )}
          </Stack>
        )}

        {userIsEditing ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack>
                <Typography variant="bodyRegular" bold>
                  {isSensibleDefault
                    ? "You can't delete this milestone."
                    : "Delete this milestone."}
                </Typography>
                <Typography variant="bodySmall" lightened>
                  {isSensibleDefault
                    ? "This is a default milestone and a key part of the SSJ."
                    : "Once you delete this milestone you can't retrieve it."}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Button variant="danger" disabled={isSensibleDefault}>
                Delete milestone
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Stack>

      {completeModalOpen ? (
        <Modal
          title={t("ssj_ui_content.great_work")}
          open={completeModalOpen}
          toggle={() => setCompleteModalOpen(!completeModalOpen)}
        >
          <Card variant="lightened" size="large">
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Icon type="flag" variant="primary" size="large" />
                <Typography variant="bodyLarge" bold highlight>
                  {t("ssj_ui_content.milestone_completed")}
                </Typography>
              </Stack>
              <Typography variant="h3" bold center>
                {milestone?.attributes[
                  getTranslatedAttr(router.locale, "title")
                ] || milestone?.attributes.title}
              </Typography>
              <Typography variant="bodyLarge" lightened center>
                {t("ssj_ui_content.youre_making_great_progress")}
              </Typography>
            </Stack>
          </Card>
        </Modal>
      ) : null}
    </PageContainer>
  );
};

export default MilestonePage;

const NewTaskInput = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} alignItems="center">
        <Grid item flex={1}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Task to complete"
                placeholder="Add a task to do in order to complete this milestone"
                error={errors.title}
                helperText={
                  errors &&
                  errors.title &&
                  errors.title &&
                  "This field is required"
                }
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" disabled={isSubmitting}>
            <Icon type="plus" />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};
// const EditableTaskItem = ({ title, isDraggable }) => {
//   return (
//     <Grid container flexDirection="row" spacing={3} alignItems="center">
//       <Grid item>
//         <Icon
//           type="dotsVertical"
//           className={isDraggable && "drag-handle"}
//           hoverable={isDraggable}
//           variant={!isDraggable && "lightened"}
//         />
//       </Grid>
//       <Grid item flex={1}>
//         <Card size="small" variant="lightened">
//           <Typography varaint="bodyRegular">{title}</Typography>
//         </Card>
//       </Grid>
//       <Grid item>
//         <IconButton disabled={!isDraggable}>
//           <Icon type="close" variant={!isDraggable && "lightened"} />
//         </IconButton>
//       </Grid>
//     </Grid>
//   );
// };
// const EditableTaskList = ({ tasks }) => {
//   const [taskList, setTaskList] = useState(tasks);

//   const onDrop = ({ removedIndex, addedIndex }) => {
//     // console.log({ removedIndex, addedIndex });
//     setTaskList((items) => arrayMoveImmutable(items, removedIndex, addedIndex));
//   };
//   return (
//     <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
//       <Stack spacing={3}>
//         {taskList &&
//           taskList.map((t, i) => (
//             <Draggable key={i}>
//               <EditableTaskItem
//                 title={t.title}
//                 isDraggable={!t.isSensibleDefault}
//               />
//             </Draggable>
//           ))}
//       </Stack>
//     </Container>
//   );
// };

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Add any additional props you need to pass to the page component
    },
  };
}
