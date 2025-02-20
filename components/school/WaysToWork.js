import { Grid, Typography, Stack, Card, Icon, Modal } from "../ui";
import { useTranslation } from "next-i18next";
import Resource from "../Resource";
import { useState } from "react";

const WaysToWorkModal = ({ toggle, open, title, resources }) => {
  return (
    <Modal title={title} toggle={toggle} open={open}>
      <Stack spacing={2}>
        {resources?.map((resource, index) => (
          <Resource
            key={index}
            title={resource.title}
            link={resource.url}
            description={resource.description}
            type={resource.type}
          />
        ))}
      </Stack>
    </Modal>
  );
};

const WaysToWorkCard = ({ waysToWork }) => {
  const [waysToWorkModalOpen, setWaysToWorkModalOpen] = useState(false);
  const { t } = useTranslation("common");

  return (
    <>
      <Card
        variant="lightened"
        sx={{ height: "100%" }}
        hoverable
        onClick={() => setWaysToWorkModalOpen(true)}
      >
        <Stack spacing={6}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="bodyLarge" bold>
                {waysToWork.name}
              </Typography>
            </Grid>
            <Grid item>
              <Icon type="chevronRight" />
            </Grid>
          </Grid>
          <Stack spacing={3}>
            {waysToWork.resources.slice(0, 3).map((resource, index) => (
              <Card size="small" noBorder key={index}>
                <Typography variant="bodyRegular">{resource.title}</Typography>
              </Card>
            ))}
            <Card size="small" noBorder variant="lightened">
              <Typography variant="bodyRegular" lightened>
                {waysToWork.resources.length > 3
                  ? `${t("ssj_ui_content.and")} ${
                      waysToWork.resources.slice(3).length
                    } ${t("ssj_ui_content.more")}`
                  : t("ssj_ui_content.view_more")}
              </Typography>
            </Card>
          </Stack>
        </Stack>
      </Card>
      <WaysToWorkModal
        toggle={() => setWaysToWorkModalOpen(!waysToWorkModalOpen)}
        open={waysToWorkModalOpen}
        title={waysToWork.name}
        resources={waysToWork.resources}
      />
    </>
  );
};

const WaysToWork = ({ waysToWorkData }) => {
  const { t } = useTranslation("common");

  return (
    <Stack spacing={6}>
      <Typography variant="h3" bold capitalize>
        {t("ssj_ui_content.ways_to_work_together")}
      </Typography>
      <Grid container spacing={3}>
        {waysToWorkData?.map((workItem, index) => (
          <Grid item xs={12} sm={4} alignItems="stretch" key={index}>
            <WaysToWorkCard waysToWork={workItem} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default WaysToWork;
