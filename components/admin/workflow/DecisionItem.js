const DecisionItem = ({ decision, number, totalOptions }) => {
  const [showAddChip, setShowAddChip] = useState(false);
  const [showDraggable, setShowDraggable] = useState(false);
  const [decisionDrawerOpen, setDecisionDrawerOpen] = useState(false);
  const [isAddingOption, setIsAddingOption] = useState(true);

  const handleAddDecision = () => {
    setIsAddingOption(true);
    setDecisionDrawerOpen(true);
    console.log("add");
  };
  const handleEditDecision = () => {
    // not adding, so editing
    setIsAddingOption(false);
    setDecisionDrawerOpen(true);
    console.log("edit");
  };

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Grid stack>
            <Chip label="hi" />
          </Grid>
        }
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Show Draggable Grabber */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "48px", height: "24px" }}
            onMouseEnter={() => setShowDraggable(true)}
            onMouseLeave={() => setShowDraggable(false)}
          >
            <Grid item>
              {showDraggable ? (
                <Icon type="dotsVertical" variant="lightened" hoverable />
              ) : (
                <Typography variant="bodySmall" bold lightened>
                  {number + 1}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* Add Chip Container */}
          <Grid
            container
            onMouseLeave={() => setShowAddChip(false)}
            onMouseEnter={() => setShowAddChip(true)}
            sx={{
              width: "48px",
              height: "24px",
              position: "absolute",
              bottom: "-12px",
              left: 0,
              zIndex: 15,
            }}
            alignItems="center"
            justifyContent="center"
          >
            {showAddChip && number + 1 < totalOptions ? (
              <AddChip
                size="small"
                onClick={handleAddDecision}
                variant="outlined"
                label={<Icon type="plus" size="small" variant="primary" />}
              />
            ) : null}
          </Grid>
        </Box>
        <ListItemButton
          sx={{ borderLeft: "1px solid #eaeaea" }}
          onClick={handleEditDecision}
        >
          <ListItemText primary={decision.title} />
        </ListItemButton>
      </ListItem>
      <DecisionDrawer
        step={decision}
        open={decisionDrawerOpen}
        toggle={() => setDecisionDrawerOpen(!decisionDrawerOpen)}
        isAdding={isAddingOption}
      />
    </>
  );
};

export default DecisionItem;
