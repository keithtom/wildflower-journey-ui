import { useState } from "react";
import Link from 'next/link'

import {
  PageContainer,
  Grid,
  Stack,
  Divider,
  Typography,
  Card,
  TextField,
  Button,
} from "@ui";

const Decision = ({ decision, userId }) => {
  console.log("decision", decision);

  const [decisionState, setDecisionState] = useState(decision.attributes.state);

  const [validDecision, setValidDecision] = useState((decision.attributes.context && decision.attributes.proposal && decision.relationships.stakeholders) ? true : false)

  const [context, setContext] = useState(decision.attributes.context);
  const handleSetContext = (event) => {
    setContext(event.target.value);
  };

  const [proposal, setProposal] = useState(decision.attributes.proposal);
  const handleSetProposal = (event) => {
    setProposal(event.target.value);
  };

  const [newLink, setNewLink] = useState(null);
  const handleSetNewLink = (event) => {
    setNewLink(event.target.value);
  };
  const [links, setLinks] = useState(decision.attributes.links);

  const handleAddLink = () => {
    const newLinks = links.slice(0);
    newLinks.push(newLink);
    setLinks(newLinks);
    setNewLink(null);
  };

  console.log(newLink);
  console.log(links);
  console.log('validDecision', validDecision);

  return (
    <>
      <PageContainer>
        <Grid container justifyContent="space-between" alignItems="center" p={6}>
          <Grid item>
            <Link href={`/advice/people/${userId}/decisions/${decisionState}`}>
              <Typography variant="body1">Back</Typography>
            </Link>
          </Grid>
          <Grid item>
            {decisionState === "draft" ?
              <Button>Request advice</Button>
              : decisionState === "open" ?
              <Stack direction="row" spacing={2}>
                <Button>Request advice again</Button>
                <Button>Make your decision</Button>
              </Stack>
            : decisionState === "stakeholder" ?
              <Button>Give advice</Button>
            : null
            }
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
                <div>You created this 2 minutes ago</div>
              </Stack>
            </Grid>

            {/* actions */}
            <Grid item>
                {(!validDecision && decisionState === "draft") ?
                  <Stack direction="row" spacing={4}>
                    <Button>Cancel</Button>
                    <Button>Save</Button>
                  </Stack>
                : (validDecision && decisionState === "draft") ?
                  <Stack direction="row" spacing={4}>
                    <Button>Edit</Button>
                    <Button>Share decision</Button>
                  </Stack>
                : decisionState === "open" ?
                  <Stack direction="row" spacing={4}>
                    <Button>Cancel</Button>
                    <Button>Share decision</Button>
                  </Stack>
                : null
                }
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
                    value={decision.attributes.context}
                  />
                  <TextField
                    fullWidth
                    label="Proposal"
                    placeholder="A summary of your proposal..."
                    value={decision.attributes.proposal}
                  />

                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container spacing={4} alignItems="center">
                        <Grid item flex={1}>
                          <TextField
                            fullWidth
                            label="Attachments"
                            placeholder="Paste a link to an attachment..."
                            value={newLink}
                            onChange={handleSetNewLink}
                          />
                        </Grid>
                        <Grid item>
                          <Button disabled={!newLink} onClick={handleAddLink}>+</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={2}>
                        {links.map((link, i) => (
                          <Card key={i} fullWidth>
                            <Grid container justifyContent="space-between">
                              <Grid item>{link}</Grid>
                              <Grid item>x</Grid>
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
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item>
                          <Button>+</Button>
                        </Grid>
                        <Grid item>Add an advice giver from your school</Grid>
                      </Grid>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={4}>
                      {/* trigger modal with search for hub */}
                      <div>Your hub</div>
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item>
                          <Button>+</Button>
                        </Grid>
                        <Grid item>Add an advice giver from your hub</Grid>
                      </Grid>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={4}>
                      {/* trigger modal with search for school */}
                      <div>Wildflower foundation</div>
                      <Grid container alignItems="center" spacing={4}>
                        <Grid item>
                          <Button>+</Button>
                        </Grid>
                        <Grid item>
                          Add an advice giver from the foundation
                        </Grid>
                      </Grid>
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
  const apiRoute = `https://api.wildflowerschools.org/v1/advice/people/${userId}/decisions`;

  const res = await fetch(apiRoute);
  const data = await res.json();

  const decision = data.data.filter((decision) => decision.id === decisionId);

  return {
    props: {
      userId,
      decision: decision[0],
    },
  };
}

export default Decision;
