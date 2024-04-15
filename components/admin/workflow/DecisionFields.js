const DecisionFields = () => {
  return (
    <Stack spacing={6}>
      <TextField
        label="Title"
        placeholder="e.g. Continue to the next phase"
        // error={errors.firstName}
        // helperText={errors && errors.firstName && errors.firstName.message}
        // {...field}
      />
    </Stack>
  );
};

export default DecisionFields;
