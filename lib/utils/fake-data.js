export const schoolDetails = {
  name: "Brooklyn Heights Montessori",
  description:
    "Brooklyn Heights Montessori is a welcoming and supportive community of passionate parents who sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  attributes: [
    {
      title: "Governance",
      value: "Independent",
    },
    {
      title: "Tuition Assistance",
      value: "Voucher",
    },
    {
      title: "Age Level",
      value: "Primary",
    },
    {
      title: "Calendar",
      value: "10 Months",
    },
    {
      title: "Max. Enrollment",
      value: "12 Students",
    },
  ],
  contactMember: {
    firstName: "Maya",
    lastName: "Walley",
    profileImage:
      "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    location: "New York City",
    skills: ["Finance", "Home Schooling", "Real Estate"],
    attributes: {
      phone: "(917) 123-4567",
      email: "laurinda_lockman@spencer-hickle.io",
    },
    bio: "Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
  },
};

export const user = {
  firstName: "Maya",
  lastName: "Walley",
  profileImage:
    "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  location: "New York City",
  skills: ["Finance", "Home Schooling", "Real Estate"],
  roles: ["Teacher Leader"],
  attributes: {
    phone: "(917) 123-4567",
    email: "laurinda_lockman@spencer-hickle.io",
  },
  bio: "Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ",
  school: {
    id: "6362-514b",
    type: "school",
    attributes: {
      name: "Brookville Primary School",
      shortName: null,
      website: "satterfield.biz",
      phone: "391.483.9249 x45663",
      email: "nubia.ernser@waelchi.com",
      governanceType: "Charter",
      tuitionAssistanceType: "County Childcare Assistance Programs",
      agesServed: "Infants",
      calendar: "10 month",
      maxEnrollment: 11,
      facebook: null,
      instagram: null,
    },
    relationships: { address: { data: { id: "1", type: "address" } } },
  },
};

export const people = [
  {
    id: "2601-8f69",
    type: "person",
    roles: ["Teacher Leader"],
    attributes: {
      email: "noel_trantow@homenick.net",
      firstName: "Jaimee",
      lastName: "Gleichner",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Brooklyn Heights Montessori"],
      roles: { data: [] },
      skills: ["Finance", "Construction"],
      experiences: { data: [] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "9acf-aef7",
    type: "person",
    roles: ["Teacher Leader"],
    attributes: {
      email: "georgina_grant@schumm.info",
      firstName: "Pete",
      lastName: "Stiedemann",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Fort Greene Montessori"],
      roles: { data: [] },
      skills: ["Finance", "Construction"],
      experiences: { data: [] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "490f-89d5",
    type: "person",
    roles: ["Teacher Leader"],
    attributes: {
      email: "robt@ledner.net",
      firstName: "Flossie",
      lastName: "Bashirian",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Park Slope Montessori"],
      roles: { data: [] },
      skills: ["Finance", "Construction"],
      experiences: { data: [] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "4864-6bf1",
    type: "person",
    roles: ["Hub Member"],
    attributes: {
      email: "dorsey.hand@fay-pfannerstill.net",
      firstName: "June",
      lastName: "Hegmann",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Tribeca Montessori"],
      roles: { data: [{ id: "1", type: "role" }] },
      skills: ["Finance", "Construction"],
      experiences: { data: [{ id: "1", type: "experience" }] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "2b1f-190a",
    type: "person",
    roles: ["Hub Member"],
    attributes: {
      email: "hoyt@ortiz.org",
      firstName: "Phil",
      lastName: "Batz",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Tribeca Montessori"],
      roles: { data: [] },
      skills: ["Finance", "Construction"],
      experiences: { data: [] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "9d7e-32ec",
    type: "person",
    roles: ["Teacher Leader"],
    attributes: {
      email: "laurinda_lockman@spencer-hickle.io",
      firstName: "Barney",
      lastName: "Wunsch",
      phone: "(917) 123-4567",
    },
    relationships: {
      schools: ["Soho Montessori"],
      roles: { data: [] },
      skills: ["Finance", "Construction"],
      experiences: { data: [] },
      address: {
        city: "New York City",
        state: "New York",
      },
    },
  },
];

export const schools = [
  {
    id: "6362-514b",
    type: "school",
    attributes: {
      name: "Brookville Primary School",
      shortName: null,
      website: "satterfield.biz",
      phone: "391.483.9249 x45663",
      email: "nubia.ernser@waelchi.com",
      governanceType: "Charter",
      tuitionAssistanceType: "County Childcare Assistance Programs",
      agesServed: "Infants",
      calendar: "10 month",
      maxEnrollment: 11,
      facebook: null,
      instagram: null,
    },
    relationships: {
      address: {
        street: "123 Oak Glen Rd",
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "e72b-4c80",
    type: "school",
    attributes: {
      name: "Ironston Elementary School",
      shortName: null,
      website: "balistreri.co",
      phone: "1-938-779-4920",
      email: "marc@willms-roberts.biz",
      governanceType: "District",
      tuitionAssistanceType: "County Childcare Assistance Programs",
      agesServed: "Adolescent",
      calendar: "10 month",
      maxEnrollment: 11,
      facebook: null,
      instagram: null,
    },
    relationships: {
      address: {
        street: "123 Oak Glen Rd",
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "9632-2a81",
    type: "school",
    attributes: {
      name: "Brighthurst Elementary School",
      shortName: null,
      website: "schmidt.co",
      phone: "363-172-2592 x6100",
      email: "joi@ledner.com",
      governanceType: "Independent",
      tuitionAssistanceType: "State vouchers",
      agesServed: "Upper Elementary",
      calendar: "10 month",
      maxEnrollment: 12,
      facebook: null,
      instagram: null,
    },
    relationships: {
      address: {
        street: "123 Oak Glen Rd",
        city: "New York City",
        state: "New York",
      },
    },
  },
  {
    id: "02f1-7578",
    type: "school",
    attributes: {
      name: "Brookville Elementary School",
      shortName: null,
      website: "emmerich.co",
      phone: "211-480-9204 x013",
      email: "wilmer_reilly@spinka-marks.name",
      governanceType: "Independent",
      tuitionAssistanceType: "City vouchers",
      agesServed: "Upper Elementary",
      calendar: "9 month",
      maxEnrollment: 11,
      facebook: null,
      instagram: null,
    },
    relationships: {
      address: {
        street: "123 Oak Glen Rd",
        city: "New York City",
        state: "New York",
      },
    },
  },
];

export const ethnicities = [
  "African American, Afro-Caribbean or Black",
  "Native American or Alaska Native",
  "Asian American",
  "Hispanic, Latinx, or Spanish Origin",
  "Middle Eastern or North African",
  "Native Hawaiian or Other Pacific Islander",
  "White",
];

export const languages = [
  "English",
  "Spanish",
  "French",
  "Arabic",
  "Armenian",
  "Bantu (including Swahili)",
  "Bengali",
  "Burmese",
  "Cantonese",
  "German",
  "Greek",
  "Gujarati",
  "Haitian - Creole",
  "Hebrew",
  "Hindi",
  "Hmong",
  "Italian",
  "Japanese",
  "Karen",
  "Khmer",
  "Korean",
  "Mandarin",
  "Navajo",
  "Persian (including Farsi and Dari)",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Russian",
  "Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian)",
  "Tagalog",
  "Tai-Kadai (including Thai and Lao)",
  "Tamil",
  "Telugu",
  "Urdu",
  "Vietnamese",
];

export const incomeRanges = [
  "Low income",
  "Middle income",
  "High income",
  "Undisclosed",
];

export const genderIdentities = [
  "Male",
  "Female",
  "Non-binary / third gender",
  "Undisclosed",
];

export const searchFilters = [
  {
    name: "Ages Served",
    items: [
      {
        value: "parent-child",
        label: "Parent Child",
      },
      {
        value: "infants",
        label: "Infants",
      },
      {
        value: "toddlers",
        label: "Toddlers",
      },
      {
        value: "primary",
        label: "Primary",
      },
      {
        value: "lower-elementary",
        label: "Lower Elementary",
      },
      {
        value: "upper-elementary",
        label: "Upper Elementary",
      },
      {
        value: "adolescent",
        label: "Adolescent",
      },
      {
        value: "high-school",
        label: "High School",
      },
    ],
  },
  {
    name: "Governance Type",
    items: [
      {
        value: "charter",
        label: "Charter",
      },
      {
        value: "independent",
        label: "Independent",
      },
      {
        value: "district",
        label: "District",
      },
    ],
  },
  {
    name: "Tuition Assistance",
    items: [
      {
        value: "state-vouchers",
        label: "State Vouchers",
      },
      {
        value: "county-childcare-assistance-program",
        label: "County Childcare Assistance Program",
      },
      {
        value: "city-vouchers",
        label: "City Vouchers",
      },
      {
        value: "school-supported-scholarship-and-or-tuition-discount",
        label: "School Supported Scholarship and/or Tuition Discount",
      },
      {
        value: "private-donor-funded-scholarship-program",
        label: "Private Donor Funded Scholarship Program",
      },
    ],
  },
  {
    name: "Calendar",
    items: [
      {
        value: "9-month",
        label: "9 Month",
      },
      {
        value: "10-month",
        label: "10 Month",
      },
      {
        value: "year-round",
        label: "Year Round",
      },
    ],
  },
];

export const searchPeopleFilters = [
  {
    name: "Role",
    items: [
      {
        value: "teacher-leader",
        label: "Teacher Leader",
      },
      {
        value: "hub-member",
        label: "Hub Member",
      },
      {
        value: "foundation-partner",
        label: "Foundation Partner",
      },
      {
        value: "operations-guide",
        label: "Operations Guide",
      },
      {
        value: "board-member",
        label: "Board Member",
      },
    ],
  },
  {
    name: "Skills",
    items: [
      {
        value: "accounting",
        label: "Accounting",
      },
      {
        value: "branding",
        label: "Branding",
      },
      {
        value: "construction",
        label: "Construction",
      },
      {
        value: "development",
        label: "Development",
      },
    ],
  },
];

export const phases = [
  "Finance",
  "Funding",
  "Governance & Compliance",
  "Facilities",
  "Family & Community Engagement",
  "Album, Advice, & Affiliation",
  "Classroom & Program Practices",
  "Wildflower Community & Culture",
];
