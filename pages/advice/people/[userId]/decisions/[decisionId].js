import adviceApi from "../../../../../api/advice";
import documentsApi from "../../../../../api/documents";
import { useState } from "react";
import Link from "next/link";
import { includes } from "lodash";

import {
  PageContainer,
  Grid,
  Stack,
  Divider,
  Typography,
  Card,
  TextField,
  Button,
  Avatar,
  Modal,
} from "@ui";

import {
  NewDraftModal,
  RequestAdviceModal,
  MakeDecisionModal,
  ShareDecisionModal,
  WelcomeBackModal,
  AdviceExchangeModal,
  GiveAdviceModal,
  AddStakeholderModal,
} from "@adviceModals";

const Decision = ({ decisionId, decision, userId, decisionStakeholders, decisionDocuments }) => {
  const decisionContext = decision.attributes.context;
  const decisionProposal = decision.attributes.proposal;
  const adviceSeeker = decision.relationships.creator.data;

  const [decisionState, setDecisionState] = useState(decision.attributes.state);
  const [validDecision, setValidDecision] = useState(
    decision.attributes.context &&
      decision.attributes.proposal &&
      decision.relationships.stakeholders
      ? true
      : false
  );
  const [context, setContext] = useState(
    decisionContext ? decisionContext : null
  );
  const handleSetContext = (event) => {
    setContext(event.target.value);
  };
  const [proposal, setProposal] = useState(
    decisionProposal ? decisionProposal : null
  );
  const handleSetProposal = (event) => {
    setProposal(event.target.value);
  };
  // WIL-129
  const [stakeholders, setStakeholders] = useState(
    decisionStakeholders ? decisionStakeholders : []
  );
  const handleSetStakeholders = (event) => {
    setStakeholders(event.target.value);
  };
  // WIL-129
  const [links, setLinks] = useState(decisionDocuments ? decisionDocuments : []);
  const [newLink, setNewLink] = useState(null);
  const handleSetNewLink = (event) => {
    setNewLink(event.target.value);
  };
  const handleAddLink = () => {
    documentsApi().create({documentableType: 'decision', documentableId: decisionId, link: newLink}).then(
      (response) => {
        setLinks(currentLinks => currentLinks.push(response.data.data) && currentLinks);
        setNewLink("");
    }, (error) => {
      console.log(error);
    });

  };
  const handleRemoveLink = (documentId) => {
    documentsApi().destroy(documentId).then(
      (response) => {
        setLinks(currentLinks => currentLinks.filter((e) => e.id !== documentId));
    }, (error) => {
      console.log(error);
    });
  };

  const [requestIsValid, setRequestIsValid] = useState({
    context: true,
    proposal: proposal,
    stakeholders: stakeholders,
  });

  const [newDraftModalOpen, setNewDraftModalOpen] = useState(false);
  const toggleNewDraftModalOpen = () =>
    setNewDraftModalOpen(!newDraftModalOpen);
  const [requestAdviceModalOpen, setRequestAdviceModalOpen] = useState(false);
  const toggleRequestAdviceOpen = () =>
    setRequestAdviceModalOpen(!requestAdviceModalOpen);
  const [makeDecisionModalOpen, setMakeDecisionModalOpen] = useState(false);
  const toggleMakeDecisionOpen = () =>
    setMakeDecisionModalOpen(!makeDecisionModalOpen);
  const [shareDecisionModalOpen, setShareDecisionModalOpen] = useState(false);
  const toggleShareDecisionModalOpen = () =>
    setShareDecisionModalOpen(!shareDecisionModalOpen);
  const [welcomeBackModalOpen, setWelcomeBackModalOpen] = useState(false);
  const toggleWelcomeBackModalOpen = () =>
    setWelcomeBackModalOpen(!welcomeBackModalOpen);
  const [adviceExchangeModalOpen, setAdviceExchangeModalOpen] = useState(false);
  const toggleAdviceExchangeModalOpen = () =>
    setAdviceExchangeModalOpen(!adviceExchangeModalOpen);
  const [giveAdviceModalOpen, setGiveAdviceModalOpen] = useState(false);
  const toggleGiveAdviceModalOpen = () =>
    setGiveAdviceModalOpen(!giveAdviceModalOpen);
  const [addStakeholderModalOpen, setAddStakeholderModalOpen] = useState(false);
  const toggleAddStakeholderModalOpen = () =>
    setAddStakeholderModalOpen(!addStakeholderModalOpen);

  function handleSaveDecision(){
    adviceApi({ id: decisionId }).update({context: context, proposal: proposal}).then(
      (response) => {
        console.log(response);
        alert('success');
    }, (error) => {
      console.log(error);
    });
  }
  // console.log(newLink);
  // console.log(links);
  // console.log('validDecision', validDecision);
  // console.log("decision", decision);
  // console.log("stakeholders", stakeholders);

  return (
    <>
      <NewDraftModal
        open={newDraftModalOpen}
        toggle={toggleNewDraftModalOpen}
      />
      <RequestAdviceModal
        open={requestAdviceModalOpen}
        toggle={toggleRequestAdviceOpen}
        requestIsValid={requestIsValid}
        requestAgain={decisionState === "open"}
      />
      <MakeDecisionModal
        open={makeDecisionModalOpen}
        toggle={toggleMakeDecisionOpen}
        stakeholders={stakeholders}
      />
      <ShareDecisionModal
        open={shareDecisionModalOpen}
        toggle={toggleShareDecisionModalOpen}
      />
      <WelcomeBackModal
        open={welcomeBackModalOpen}
        toggle={toggleWelcomeBackModalOpen}
      />
      <AdviceExchangeModal
        open={adviceExchangeModalOpen}
        toggle={toggleAdviceExchangeModalOpen}
        stakeholder={stakeholders[0]}
        decision={decision}
      />
      <GiveAdviceModal
        open={giveAdviceModalOpen}
        toggle={toggleGiveAdviceModalOpen}
        adviceSeeker={adviceSeeker}
        decision={decision}
      />
      <AddStakeholderModal
        open={addStakeholderModalOpen}
        toggle={toggleAddStakeholderModalOpen}
      />

      <PageContainer>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={6}
        >
          <Grid item>
            <Link href={`/advice/people/${userId}/decisions/${decisionState}`}>
              <Typography variant="body1">Back</Typography>
            </Link>
          </Grid>
          <Grid item>
            {decisionState === "draft" ? (
              // WIL-130
              <Button onClick={toggleRequestAdviceOpen}>
                Request advice
              </Button>
            ) : decisionState === "open" ? (
              <Stack direction="row" spacing={2}>
                <Button onClick={toggleRequestAdviceOpen}>
                  Request advice again
                </Button>
                {/* WIL-132 */}
                <Button onClick={toggleMakeDecisionOpen}>
                  Make you decision
                </Button>
              </Stack>
            ) : decisionState === "stakeholder" ? (
              <Button onClick={toggleGiveAdviceModalOpen}>
                Give advice
              </Button>
            ) : null}
          </Grid>
        </Grid>

        <Divider />

        <Grid container p={6} spacing={4}>
          <Grid item xs={12} sm={3}>
            <Card>
              <Grid container spacing={2}>
                <Grid item>
                  <Stack>
                    <Typography variant="body2">STEP 1</Typography>
                    <Typography variant="body1">Draft your decision</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <Grid container spacing={2}>
                <Grid item>
                  <Stack>
                    <Typography variant="body2">STEP 2</Typography>
                    <Typography variant="body1">Request advice</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <Grid container spacing={2}>
                <Grid item>
                  <Stack>
                    <Typography variant="body2">STEP 3</Typography>
                    <Typography variant="body1">Listen to feedback</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card>
              <Grid container spacing={2}>
                <Grid item>
                  <Stack>
                    <Typography variant="body2">STEP 4</Typography>
                    <Typography variant="body1">Make your decision</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Divider />

        <form>
          <Grid container justifyContent="space-between" p={6}>
            <Grid item>
              <Stack>
                <Typography variant="h3">
                  {decision.attributes.title}
                </Typography>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Avatar sm />
                  <div>You created this 2 minutes ago</div>
                </Stack>
              </Stack>
            </Grid>

            {/* actions */}
            <Grid item>
              {!validDecision && decisionState === "draft" ? (
                <Stack direction="row" spacing={4}>
                  <Link
                    href={`/advice/people/${userId}/decisions/${decisionState}`}
                  >
                    <Button>Cancel</Button>
                  </Link>
                  <Button onClick={handleSaveDecision}>Save</Button>
                </Stack>
              ) : validDecision && decisionState === "draft" ? (
                <Stack direction="row" spacing={4}>
                  <Button>Edit</Button> {/* Edit drafted decision */}
                  <Button onClick={handleSaveDecision}>Save</Button>
                  <Button onClick={toggleShareDecisionModalOpen}>
                    Share decision
                  </Button>
                </Stack>
              ) : decisionState === "open" ? (
                <Stack direction="row" spacing={4}>
                  <Link
                    href={`/advice/people/${userId}/decisions/${decisionState}`}
                  >
                    <Button>Cancel</Button>
                  </Link>
                  <Button onClick={toggleShareDecisionModalOpen}>
                    Share decision
                  </Button>
                </Stack>
              ) : null}
            </Grid>
          </Grid>

          <Divider />

          {/* inputs */}
          <Grid container p={6} spacing={6}>
            <Grid item xs={12}>
              <Card>
                <Stack spacing={6}>
                  <Typography variant="h5">Summary</Typography>
                  <TextField
                    fullWidth
                    label="Context"
                    placeholder="Any relevant background information to help the advice givers get into your shoes..."
                    value={context}
                    onChange={handleSetContext}
                    disabled={decisionState !== "draft"}
                  />
                  <TextField
                    fullWidth
                    label="Proposal"
                    placeholder="A summary of your proposal..."
                    value={proposal}
                    onChange={handleSetProposal}
                    disabled={decisionState !== "draft"}
                  />

                  <Grid container>
                    {decisionState === "draft" && (
                      <Grid item xs={12}>
                        <Grid container spacing={4} alignItems="center">
                          <Grid item flex={1}>
                            <TextField
                              fullWidth
                              label="Attachments"
                              placeholder="Paste a link to an attachment..."
                              value={newLink}
                              onChange={handleSetNewLink}
                              disabled={decisionState !== "draft"}
                            />
                          </Grid>
                          <Grid item>
                            <Button disabled={!newLink} onClick={handleAddLink}>
                              +
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Stack spacing={2}>
                        {links.map((link, i) => (
                          <Card key={i} fullWidth>
                            <Grid container justifyContent="space-between">
                              <Grid item>
                                <Stack>
                                  <Typography variant="body2">
                                    GOOGLE DOC
                                  </Typography>
                                  <Typography variant="h6">
                                    Vialeta Bookkeeping plan - Final
                                  </Typography>
                                  <Typography variant="body2">
                                    {link.attributes.link}
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid item>
                                <Button onClick={() => handleRemoveLink(link.id)}>
                                  x
                                </Button>
                              </Grid>
                            </Grid>
                          </Card>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <Stack spacing={6}>
                  <Typography variant="h5">Advice Givers</Typography>

                  <Card>
                    <Stack spacing={4}>
                      {/* trigger modal with search for school */}
                      <div>Your school</div>
                      {stakeholders &&
                        stakeholders.map((s, i) => (
                          // Filter returned stakeholders by categoriy (ie: "Your School")
                          <Card>
                            <div>{s.id}</div>
                          </Card>
                        ))}
                      {decisionState === "draft" && (
                        <Grid container alignItems="center" spacing={4}>
                          <Grid item>
                            <Button  >+</Button>
                          </Grid>
                          <Grid item>Add an advice giver from your school</Grid>
                        </Grid>
                      )}
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={4}>
                      {/* trigger modal with search for hub */}
                      <div>Your hub</div>
                      {stakeholders &&
                        stakeholders.map((s, i) => (
                          // Filter returned stakeholders by categoriy (ie: "Your Hub")
                          <Card>
                            <div>{s.id}</div>
                          </Card>
                        ))}
                      {decisionState === "draft" && (
                        <Grid container alignItems="center" spacing={4}>
                          <Grid item>
                            <Button onClick={() => setAddStakeholderModalOpen(true)}>+</Button>
                          </Grid>
                          <Grid item>Add an advice giver from your hub</Grid>
                        </Grid>
                      )}
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={4}>
                      {/* trigger modal with search for school */}
                      <div>Wildflower foundation</div>
                      {stakeholders &&
                        stakeholders.map((s, i) => (
                          // Filter returned stakeholders by categoriy (ie: "Foundation")
                          <Card>
                            <div>{s.id}</div>
                          </Card>
                        ))}
                      {decisionState === "draft" && (
                        <Grid container alignItems="center" spacing={4}>
                          <Grid item>
                            <Button onClick={() => setAddStakeholderModalOpen(true)}>+</Button>
                          </Grid>
                          <Grid item>
                            Add an advice giver from the foundation
                          </Grid>
                        </Grid>
                      )}
                    </Stack>
                  </Card>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </form>
      </PageContainer>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const userId = query.userId;
  const decisionId = query.decisionId;
  const apiRoute = `https://api.wildflowerschools.org/v1/advice/decisions/${decisionId}`;
  const res = await fetch(apiRoute);
  const data = await res.json();

  const decision = data.data
  const decisionStakeholders = data.included.filter(data => data.type == "stakeholder");
  const decisionDocuments = data.included.filter(data => data.type == "document");

  return {
    props: {
      decisionId,
      userId,
      decision,
      decisionStakeholders,
      decisionDocuments
    },
  };
}

export default Decision;
