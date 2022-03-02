export const schoolDetails = {
  name: 'Brooklyn Heights Montessori',
  description: 'Brooklyn Heights Montessori is a welcoming and supportive community of passionate parents who sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  attributes: [
    {
      title: 'Governance',
      value: 'Independent'
    },
    {
      title: 'Tuition Assistance',
      value: 'Voucher'
    },
    {
      title: 'Age Level',
      value: 'Primary'
    },
    {
      title: 'Calendar',
      value: '10 Months'
    },
    {
      title: 'Max. Enrollment',
      value: '12 Students'
    }
  ],
  contactMember: {
    firstName: "Maya",
    lastName: "Walley",
    profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    location: 'New York City',
    skills: [
      'Finance',
      'Home Schooling',
      'Real Estate'
    ],
    attributes: {
      phone: '(917) 123-4567',
      email: "laurinda_lockman@spencer-hickle.io",
    },
    bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. '
  }
}

export const user = {
  firstName: "Maya",
  lastName: "Walley",
  profileImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
  location: 'New York City',
  skills: [
    'Finance',
    'Home Schooling',
    'Real Estate'
  ],
  roles: [
    'Teacher Leader'
  ],
  attributes: {
    phone: '(917) 123-4567',
    email: "laurinda_lockman@spencer-hickle.io",
  },
  bio: 'Hi there! I decided to pursue being a teacher leader 3 years ago when my son needed to sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  school: {"id":"6362-514b","type":"school","attributes":{"name":"Brookville Primary School","shortName":null,"website":"satterfield.biz","phone":"391.483.9249 x45663","email":"nubia.ernser@waelchi.com","governanceType":"Charter","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Infants","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"1","type":"address"}}}}
}

export const people = [{"id":"2601-8f69","type":"person","attributes":{"email":"noel_trantow@homenick.net","firstName":"Jaimee","lastName":"Gleichner","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9acf-aef7","type":"person","attributes":{"email":"georgina_grant@schumm.info","firstName":"Pete","lastName":"Stiedemann","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"490f-89d5","type":"person","attributes":{"email":"robt@ledner.net","firstName":"Flossie","lastName":"Bashirian","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"4864-6bf1","type":"person","attributes":{"email":"dorsey.hand@fay-pfannerstill.net","firstName":"June","lastName":"Hegmann","phone":null},"relationships":{"schools":{"data":[{"id":"1","type":"school"}]},"roles":{"data":[{"id":"1","type":"role"}]},"skills":{"data":[{"id":"1","type":"skill"},{"id":"2","type":"skill"}]},"experiences":{"data":[{"id":"1","type":"experience"}]},"address":{"data":{"id":"3","type":"address"}}}},{"id":"2b1f-190a","type":"person","attributes":{"email":"hoyt@ortiz.org","firstName":"Phil","lastName":"Batz","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[{"id":"2","type":"role"}]},"skills":{"data":[{"id":"3","type":"skill"}]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9d7e-32ec","type":"person","attributes":{"email":"laurinda_lockman@spencer-hickle.io","firstName":"Barney","lastName":"Wunsch","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}}]

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
    relationships:{
      address: {
        street: '123 Oak Glen Rd',
        city: 'New York City',
        state: 'New York'
      }
    }
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
    relationships:{
      address: {
        street: '123 Oak Glen Rd',
        city: 'New York City',
        state: 'New York'
      }
    }
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
    relationships:{
      address: {
        street: '123 Oak Glen Rd',
        city: 'New York City',
        state: 'New York'
      }
    }
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
    relationships:{
      address: {
        street: '123 Oak Glen Rd',
        city: 'New York City',
        state: 'New York'
      }
    }
  },
];
