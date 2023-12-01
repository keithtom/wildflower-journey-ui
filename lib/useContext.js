import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";

// Set initial context
const initialContext = {
  workflowId: null,
};

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
});

// ------------------------------ //
// CONTEXT WRAPPER
// ------------------------------ //
function SiteContextProvider({ children }) {
  const [context, setContext] = useState({
    ...initialContext,
  });
  const [initContext, setInitContext] = useState(false);

  useEffect(() => {
    if (initContext === false) {
      const workflowId = getCookie("workflowId");
      setContext((prevState) => {
        return {
          ...prevState,
          workflowId: workflowId,
        };
      });
      setInitContext(true);
    }
  }, [initContext]);
  return (
    <SiteContext.Provider value={{ context, setContext }}>
      {children}
    </SiteContext.Provider>
  );
}

// Access global store states
function useSiteContext() {
  const { context } = useContext(SiteContext);
  return context;
}

// ------------------------------ //
// STATE HELPERS
// ------------------------------ //

// Get the workflow id
function useWorkflowId() {
  const {
    context: { workflowId },
  } = useContext(SiteContext);

  return workflowId;
}

// Assign the workflow id
function useAssignWorkflowId() {
  const {
    context: { workflowId },
    setContext,
  } = useContext(SiteContext);
  function assignWorkflowId(id) {
    //exit if no id provided
    if (!id) return;
    //otherwise assign the id
    setContext((prevState) => {
      return { ...prevState, workflowId: id };
    });
  }
  return assignWorkflowId;
}

export {
  SiteContextProvider,
  useSiteContext,
  useAssignWorkflowId,
  useWorkflowId,
};
