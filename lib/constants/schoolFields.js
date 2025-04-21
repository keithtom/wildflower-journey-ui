// Admin UI format
export const AGES_SERVED_OPTIONS = [
  { value: "Infants", label: "Infants" },
  { value: "Toddlers", label: "Toddlers" },
  { value: "Primary", label: "Primary" },
  { value: "Lower Elementary", label: "Lower Elementary" },
  { value: "Upper Elementary", label: "Upper Elementary" },
  { value: "Adolescent", label: "Adolescent" },
  { value: "High School", label: "High School" },
];

export const GOVERNANCE_OPTIONS = [
  { value: "Non-Profit", label: "Non-Profit" },
  { value: "LLC", label: "LLC" },
  { value: "For-Profit", label: "For-Profit" },
  { value: "Public District", label: "Public District" },
  { value: "Charter", label: "Charter" },
];

export const STATE_OPTIONS = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const CHARTER_OPTIONS = [
  {
    label: "DC Wildflower Public Charter School",
    value: "DC Wildflower Public Charter School",
  },
  {
    label: "Grove Montessori: A Wildflower Public School",
    value: "Grove Montessori: A Wildflower Public School",
  },
  {
    label: "Minnesota Wildflower Montessori School",
    value: "Minnesota Wildflower Montessori School",
  },
  {
    label: "Wildflower Montessori Public Schools of Colorado",
    value: "Wildflower Montessori Public Schools of Colorado",
  },
  {
    label: "Wildflower New York Charter School",
    value: "Wildflower New York Charter School",
  },
  {
    label: "Rainbow Montessori Community School",
    value: "Rainbow Montessori Community School",
  },
];

// Network UI format
export const NETWORK_SCHOOL_FIELDS = {
  agesServed: {
    title: "Age level",
    param: "school_filters[age_levels]",
    doNotDisplayFor: "people",
    options: AGES_SERVED_OPTIONS,
  },
  governance: {
    title: "Governance",
    param: "school_filters[governance]",
    doNotDisplayFor: "people",
    options: GOVERNANCE_OPTIONS,
  },
  charter: {
    title: "Charter",
    param: "school_filters[charter]",
    doNotDisplayFor: "people",
    options: CHARTER_OPTIONS,
  },
};

// Helper functions to convert between formats if needed
export const getNetworkFormatOptions = (field) => {
  switch (field) {
    case "agesServed":
      return NETWORK_SCHOOL_FIELDS.agesServed;
    case "governance":
      return NETWORK_SCHOOL_FIELDS.governance;
    case "charter":
      return NETWORK_SCHOOL_FIELDS.charter;
    default:
      return null;
  }
};

export const getAdminFormatOptions = (field) => {
  switch (field) {
    case "agesServed":
      return AGES_SERVED_OPTIONS;
    case "governance":
      return GOVERNANCE_OPTIONS;
    case "charter":
      return CHARTER_OPTIONS;
    case "state":
      return STATE_OPTIONS;
    default:
      return null;
  }
};
