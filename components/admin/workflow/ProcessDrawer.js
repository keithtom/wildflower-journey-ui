import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import {
  Box,
  Grid,
  List,
  Card,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Icon } from "@components/ui";
import { styled } from "@mui/material/styles";

import ProcessFields from "./ProcessFields";
import ProcessOrStepGroup from "./ProcessOrStepGroup";
import StepItem from "./StepItem";
import StepFields from "./StepFields";
import StepDrawer from "./StepDrawer";

import useStep from "@hooks/workflow/definition/useStep";
import workflowsApi from "@api/workflow/definition/processes";

const ActionsContainer = styled(Box)`
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.color.neutral.main};
  width: 100%;
  padding: ${({ theme }) => theme.util.buffer * 6}px;
  overflow: visible;
  background: ${({ theme }) => theme.palette.neutral.lightest};
`;

const ProcessDrawer = ({ process, open, toggle, isAdding, isEditing }) => {
  // get the process data from the API using the hook
  // maybe pass just processId into the ProcessDrawer component

  if (open) {
    console.log("process----------------------", process);
  }

  // TAYLOR: Since the data received from the API is not in the same shape that
  // updated or new processes must send the data to the API, I am storing
  // the data from the api in a temporary state, editing and updating it,
  // and then transforming it later to match the shape that the API expects.
  // *** `temporaryProcess` should abide by the shape that the API expects data to be SUBMITTED
  const [temporaryProcess, setTemporaryProcess] = useState({
    version: "",
    title: "",
    description: "",
    position: 0,
    // steps_attributes: [],
    selected_processes_attributes: [],
    workable_dependencies_attributes: [],
  });

  console.log("temporaryProcess-----------------", temporaryProcess);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: temporaryProcess,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps_attributes",
  });

  useEffect(() => {
    // If editing and drawer is open
    if (isEditing && open) {
      // Transform process data to match temporaryProcess structure
      const transformedProcess = transformProcessData(process);
      // Load transformed process data into temporaryProcess
      setTemporaryProcess(transformedProcess);
      // Set form values
      for (let key in transformedProcess) {
        setValue(key, transformedProcess[key]);
      }
    }
    // Reset temporaryProcess when drawer is closed
    if (!open) {
      setTemporaryProcess({
        version: "",
        title: "",
        description: "",
        position: 0,
        selected_processes_attributes: [],
        workable_dependencies_attributes: [],
        steps_attributes: [],
      });
    }
  }, [isEditing, process, setValue, open, toggle]);

  const onSubmit = (data) => {
    // Transform temporaryProcess data to match API structure
    const transformedData = transformDataForAPI(data);
    // Submit transformed temporaryProcess data
    console.log(transformedData);
  };
  // Function to transform process data to match temporaryProcess structure
  function transformProcessData(process) {
    const transformedProcess = {
      version: process.attributes.version,
      title: process.attributes.title,
      description: process.attributes.description,
      position: 0, // Assuming position is not provided in the process object
      // TODO set this data here
      selected_processes_attributes:
        process.relationships.selectedProcesses.data.map((selectedProcess) => ({
          id: selectedProcess.id,
          _destroy: false,
        })),
      // TODO set this data here
      workable_dependencies_attributes:
        process.relationships.prerequisites.data.map((prerequisite) => ({
          id: prerequisite.id,
          _destroy: false,
        })),
      // steps_attributes are set in the step item
      steps_attributes: process.relationships.steps.data.map((step) => ({
        stepId: step.id,
        _destroy: false,
      })),
    };
    return transformedProcess;
  }
  // Function to transform temporaryProcess data to match API structure
  function transformDataForAPI(data) {
    // Implement transformation logic here
    return data;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Drawer anchor="right" open={open} onClose={toggle}>
        <Box sx={{ width: "480px", height: "100%" }} p={5}>
          <div>
            <ProcessFields control={control} errors={errors} />
            <div>
              Steps
              <ProcessOrStepGroup>
                {fields.map((field, i) => (
                  <>
                    <TheStepItem
                      key={field.id}
                      field={field}
                      stepId={field.stepId}
                      control={control}
                      setTemporaryProcess={setTemporaryProcess}
                    />
                    <button type="button" onClick={() => remove(i)}>
                      Remove Step
                    </button>
                  </>
                ))}
              </ProcessOrStepGroup>
              <button type="button" onClick={() => append({ title: "" })}>
                Add Step
              </button>
            </div>
          </div>
        </Box>
        <ActionsContainer>
          {isEditing ? (
            <div>
              <div>Update process</div>
              <div>Remove process</div>
            </div>
          ) : (
            <div>add new process</div>
          )}
        </ActionsContainer>
      </Drawer>
    </form>
  );

  // if editing process load data from process into structure of temporary process
  // if adding new process do not load data from process into temporary process

  // when editing
  // load temporary process data into form
  // use react hook form to validate and track changes to the form data
  // if changes, update temporary process data
  // if valid, and user submits, submit temporary process data

  // when adding
  // use react hook form to validate and track changes to the form data
  // when changes, update temporary process data
  // if valid, and user submits, submit temporary process data

  // const [newProcess, setNewProcess] = useState({
  //   relationships: { steps: { data: [] } },
  // });
  // const [openInsideDrawer, setOpenInsideDrawer] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  // const { mutate } = useSWRConfig();
  // if (open) {
  //   console.log(process);
  // }
  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isValid, isDirty },
  // } = useForm({
  //   mode: "onChange",
  //   defaultValues: !isAdding && {
  //     title: process?.attributes?.title,
  //     description: process?.attributes?.description,
  //     categories: process?.attributes?.categories,
  //     phase: process?.attributes?.phase,
  //     // TODO: prerequisite: process?.attributes?.prerequisite,
  //   },
  // });
  // const handleShapeData = (data) => {
  //   return {
  //     workflowId: 1,
  //     process: {
  //       version: "1.0",
  //       title: data.title,
  //       description: data.description,
  //       position: 0,
  //       steps_attributes: data.relationships.steps.data.map((step) => {
  //         const { resource_title, resource_link, ...otherAttributes } =
  //           step.attributes;
  //         return {
  //           ...otherAttributes,
  //           documents_attributes: [
  //             { title: resource_title },
  //             { link: resource_link },
  //           ],
  //         };
  //       }),
  //     },
  //   };
  // };
  // const handleNext = handleSubmit((data) => {
  //   setNewProcess((newProcess) => {
  //     return {
  //       ...newProcess,
  //       ...data,
  //     };
  //   });
  //   setActiveStep(activeStep + 1);
  // });
  // const handlePrev = () => {
  //   setActiveStep(activeStep - 1);
  // };
  // const handleAddProcess = handleSubmit(async (data) => {
  //   console.log("data in addProcess", data);
  //   try {
  //     await workflowsApi.createMilestone(handleShapeData(newProcess));
  //     console.log("data in createMilestone", data);
  //   } catch (error) {
  //     console.log("error in submission", error);
  //   }
  //   toggle();
  //   setActiveStep(0);
  //   setNewProcess({});
  //   // mutate and add new process to the list
  // });
  // const handleRemoveProcess = async (id) => {
  //   try {
  //     await workflowsApi.deleteMilestone(id);
  //   } catch (error) {
  //     console.log("error in submission", error);
  //   }
  //   setNewProcess({});
  //   toggle();
  //   // TODOthis mutate doesnt work
  //   mutate("/api/workflow/definition/processes");
  // };
  // const handleUpdateProcess = handleSubmit(async (data) => {
  //   try {
  //     await workflowsApi.editMilestone(data.id, handleShapeData(data));
  //     console.log("data in editMilestone", data);
  //   } catch (error) {
  //     console.log("error in submission", error);
  //   }
  //   toggle();
  //   setNewProcess({});
  // });
  // const handleAddStepToNewProcess = (position) => {
  //   setOpenInsideDrawer(true);
  //   console.log(position);
  // };
  // // console.log({ process });
  // console.log({ newProcess });
  // // console.log({ isValid });
  // return (
  //   <Drawer anchor="right" open={open} onClose={toggle}>
  //     <Box sx={{ width: "480px", height: "100%" }} p={5}>
  //       <Stack spacing={12}>
  //         <Stack spacing={6}>
  //           <Grid container justifyContent="space-between" alignItems="center">
  //             <Grid item>
  //               <Typography variant="bodyLarge" bold>
  //                 {isAdding ? "Add" : "Edit"} Process
  //               </Typography>
  //             </Grid>
  //             <Grid item>
  //               <IconButton onClick={toggle} id="info-drawer-close">
  //                 <Icon type="close" />
  //               </IconButton>
  //             </Grid>
  //           </Grid>
  //           {isAdding ? (
  //             <>
  //               <Card variant="lightened">
  //                 <FormStepper activeStep={activeStep} />
  //               </Card>
  //               {activeStep === 0 ? (
  //                 <ProcessFields
  //                   control={control}
  //                   reset={reset}
  //                   errors={errors}
  //                 />
  //               ) : activeStep === 1 ? (
  //                 newProcess.relationships.steps.data &&
  //                 newProcess.relationships.steps.data.length > 0 ? (
  //                   <ProcessOrStepGroup
  //                     handleAddStep={handleAddStepToNewProcess}
  //                   >
  //                     {newProcess.relationships.steps.data.map((s, i) => (
  //                       <StepItem
  //                         setNewProcess={setNewProcess}
  //                         key={i}
  //                         workingStep={s}
  //                         number={i}
  //                         totalSteps={
  //                           newProcess.relationships.steps.data.length
  //                         }
  //                       />
  //                     ))}
  //                   </ProcessOrStepGroup>
  //                 ) : (
  //                   <Card>
  //                     <Card noBorder noRadius>
  //                       <Grid
  //                         container
  //                         alignItems="center"
  //                         justifyContent="center"
  //                       >
  //                         <Grid item>
  //                           <Typography variant="bodyRegular" lightened>
  //                             No steps yet
  //                           </Typography>
  //                         </Grid>
  //                       </Grid>
  //                     </Card>
  //                     <Button
  //                       full
  //                       variant="lightened"
  //                       onClick={() => setOpenInsideDrawer(!openInsideDrawer)}
  //                     >
  //                       <Typography variant="bodyRegular" bold>
  //                         Add a step
  //                       </Typography>
  //                     </Button>
  //                   </Card>
  //                 )
  //               ) : (
  //                 activeStep === 2 && (
  //                   <Stack spacing={3}>
  //                     <Typography variant="bodyRegular" bold lightened>
  //                       PROCESS
  //                     </Typography>
  //                     <Card>
  //                       <Stack direction="row" spacing={3} alignItems="center">
  //                         <Typography variant="bodyRegular" bold>
  //                           {newProcess.title}
  //                         </Typography>
  //                       </Stack>
  //                     </Card>
  //                     <Typography variant="bodyRegular" bold lightened>
  //                       STEPS
  //                     </Typography>
  //                     <ProcessOrStepGroup
  //                       notEditable
  //                       handleAddStep={handleAddStepToNewProcess}
  //                     >
  //                       {newProcess.relationships.steps.data.map((s, i) => (
  //                         <StepItem
  //                           notEditable
  //                           key={i}
  //                           workingStep={s}
  //                           number={i}
  //                           totalSteps={process.relationships.steps.data.length}
  //                         />
  //                       ))}
  //                     </ProcessOrStepGroup>
  //                   </Stack>
  //                 )
  //               )}
  //             </>
  //           ) : (
  //             <Stack spacing={6}>
  //               <ProcessFields
  //                 control={control}
  //                 reset={reset}
  //                 errors={errors}
  //               />
  //               <Stack spacing={3}>
  //                 <Typography variant="bodyRegular" bold>
  //                   Steps
  //                 </Typography>
  //                 <ProcessOrStepGroup>
  //                   {process.relationships.steps.data.map((s, i) => (
  //                     <StepItem
  //                       key={i}
  //                       stepId={s.id}
  //                       number={i}
  //                       totalSteps={process.relationships.steps.data.length}
  //                     />
  //                   ))}
  //                 </ProcessOrStepGroup>
  //               </Stack>
  //             </Stack>
  //           )}
  //         </Stack>
  //       </Stack>
  //     </Box>
  //     <ActionsContainer>
  //       <form>
  //         {isAdding ? (
  //           <Grid
  //             container
  //             justifyContent={activeStep === 0 ? "flex-end" : "space-between"}
  //           >
  //             {activeStep === 0 ? null : (
  //               <Grid item>
  //                 <Button variant="text" onClick={handlePrev}>
  //                   <Typography variant="bodyRegular" bold light>
  //                     Prev
  //                   </Typography>
  //                 </Button>
  //               </Grid>
  //             )}
  //             <Grid item>
  //               <Button
  //                 onClick={activeStep < 2 ? handleNext : handleAddProcess}
  //                 disabled={!isValid}
  //               >
  //                 <Typography variant="bodyRegular" bold light>
  //                   {activeStep < 2 ? "Next" : "Add Process"}
  //                 </Typography>
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         ) : (
  //           <Grid container spacing={4}>
  //             <Grid item xs={6}>
  //               <Button
  //                 variant="danger"
  //                 onClick={() => handleRemoveProcess(process.id)}
  //               >
  //                 <Typography variant="bodyRegular" bold>
  //                   Remove
  //                 </Typography>
  //               </Button>
  //             </Grid>
  //             <Grid item xs={6}>
  //               <Button disabled={!isDirty} onClick={handleUpdateProcess}>
  //                 <Typography variant="bodyRegular" bold>
  //                   Update
  //                 </Typography>
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         )}
  //       </form>
  //     </ActionsContainer>
  //     {openInsideDrawer ? (
  //       <StepDrawer
  //         newProcess={newProcess}
  //         setNewProcess={setNewProcess}
  //         step={process.step}
  //         open={openInsideDrawer}
  //         toggle={() => setOpenInsideDrawer(!openInsideDrawer)}
  //         isAdding={isAdding}
  //       />
  //     ) : null}
  //   </Drawer>
  // );
};

export default ProcessDrawer;

const TheStepItem = ({ stepId, control, errors, setTemporaryProcess }) => {
  //  temporaryStep object

  const { step, isLoading, isError } = useStep(stepId);
  console.log(step);

  // This useEffect is to update the temporaryProcess state with the step data
  // reshaping received data to the shape that the API will expect to receive
  // the data if/when updating the process
  useEffect(() => {
    if (!isLoading && !isError) {
      setTemporaryProcess((prevProcess) => ({
        ...prevProcess,
        steps_attributes: prevProcess.steps_attributes.map((stepItem) =>
          stepItem.stepId === stepId
            ? {
                title: step.attributes.title || "",
                description: step.attributes.description || "",
                kind: step.attributes.kind || "",
                completion_type: step.attributes.completionType || "",
                // the decision options should be set in the decision item
                decision_options_attributes:
                  step.decision_options_attributes || [],
                documents_attributes: step.relationships.documents.data
                  ? step.relationships.documents.data.map((document) => ({
                      title: document.attributes.title || "",
                      link: document.attributes.link || "",
                    }))
                  : [],
              }
            : stepItem
        ),
      }));
    }
  }, [step, isLoading, isError, stepId, setTemporaryProcess]);

  return (
    <div>
      <div>step</div>
      {/* add a step drawer here */}
      {isLoading ? null : (
        <StepFields
          control={control}
          errors={errors}
          stepId={stepId}
          step={step}
        />
      )}
      <div>step fields</div>
    </div>
  );
};

const FormStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Add Process</StepLabel>
      </Step>
      <Step>
        <StepLabel>Add Steps</StepLabel>
      </Step>
      <Step>
        <StepLabel>Summary</StepLabel>
      </Step>
    </Stepper>
  );
};
