import Head from 'next/head'
import { useState } from 'react'

import SchoolProfileCard from '../components/SchoolProfileCard'
import UserProfileCard from '../components/UserProfileCard'
import {
  MaxWidth,
  Container,
  Text,
  PageContainer,
  Grid,
  Input,
  Select
} from '../components/ui'

const SearchPage = ({}) => {
  const [filterByPeople, setFilterByPeople] = useState(true)

  return (
    <>
      <Head>
        <title>Wildflower Schools Directory | Search</title>
        <meta name="title" content="Wildflower Schools Directory" />
        <meta property="og:site_name" content="Wildflower Schools Directory" key="og_wf_site_name" />
        <meta name="description" content="Wildflower Schools Directory" />
        <meta name="keywords" content="Wildflower, Schools, Directory, Montessori" />
        <meta property="og:title" content="Wildflower Schools Directory" key="og_wf_site_title" />
        <meta property="og:description" content="Wildflower Schools Directory" key="og_wf_site_description" />
      </Head>

      <PageContainer>

        <MaxWidth>

          <Grid container spacing={12}>

            <Grid item xs={12}>
              <Input
                placeholder="Search for something..."
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Container>
                <Grid container spacing={6}>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Text title small bold>Filter</Text>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Select
                              radio
                              checked={filterByPeople}
                              onClick={() => setFilterByPeople(true)}
                              label="People"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              radio
                              checked={!filterByPeople}
                              onClick={() => setFilterByPeople(false)}
                              label="Schools"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Text title small bold>Skills</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Finance"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Home Schooling"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Real Estate"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Text title small bold>Ages</Text>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Toddler"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Primary"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              checkbox
                              label="Elementary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Container>
            </Grid>

            {
              filterByPeople ?
                <Grid item xs={12} md={7}>
                  <Grid container mb={8}>
                    <Grid item>
                      <Text title small bold>{people.length} Results</Text>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    {people.map((p, i) =>
                      <Grid item xs={12} key={i}>
                        <UserProfileCard
                          user={p.attributes}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              :
                <Grid item xs={12} md={7}>
                  <Grid container mb={8}>
                    <Grid item>
                      <Text title small bold>{schools.length} Results</Text>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    {schools.map((d, i) =>
                      <Grid item xs={12} key={i}>
                        <SchoolProfileCard
                          schoolName={d.attributes.name}
                          website={d.attributes.website}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
            }


          </Grid>

        </MaxWidth>

      </PageContainer>

    </>
  )
}

export default SearchPage

const schools = [{"id":"6362-514b","type":"school","attributes":{"name":"Brookville Primary School","shortName":null,"website":"satterfield.biz","phone":"391.483.9249 x45663","email":"nubia.ernser@waelchi.com","governanceType":"Charter","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Infants","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"1","type":"address"}}}},{"id":"e72b-4c80","type":"school","attributes":{"name":"Ironston Elementary School","shortName":null,"website":"balistreri.co","phone":"1-938-779-4920","email":"marc@willms-roberts.biz","governanceType":"District","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Adolescent","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"2","type":"address"}}}},{"id":"9632-2a81","type":"school","attributes":{"name":"Brighthurst Elementary School","shortName":null,"website":"schmidt.co","phone":"363-172-2592 x6100","email":"joi@ledner.com","governanceType":"Independent","tuitionAssistanceType":"State vouchers","agesServed":"Upper Elementary","calendar":"10 month","maxEnrollment":12,"facebook":null,"instagram":null},"relationships":{"address":{"data":null}}},{"id":"02f1-7578","type":"school","attributes":{"name":"Brookville Elementary School","shortName":null,"website":"emmerich.co","phone":"211-480-9204 x013","email":"wilmer_reilly@spinka-marks.name","governanceType":"Independent","tuitionAssistanceType":"City vouchers","agesServed":"Upper Elementary","calendar":"9 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":null}}}]
const people = [{"id":"2601-8f69","type":"person","attributes":{"email":"noel_trantow@homenick.net","firstName":"Jaimee","lastName":"Gleichner","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9acf-aef7","type":"person","attributes":{"email":"georgina_grant@schumm.info","firstName":"Pete","lastName":"Stiedemann","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"490f-89d5","type":"person","attributes":{"email":"robt@ledner.net","firstName":"Flossie","lastName":"Bashirian","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"4864-6bf1","type":"person","attributes":{"email":"dorsey.hand@fay-pfannerstill.net","firstName":"June","lastName":"Hegmann","phone":null},"relationships":{"schools":{"data":[{"id":"1","type":"school"}]},"roles":{"data":[{"id":"1","type":"role"}]},"skills":{"data":[{"id":"1","type":"skill"},{"id":"2","type":"skill"}]},"experiences":{"data":[{"id":"1","type":"experience"}]},"address":{"data":{"id":"3","type":"address"}}}},{"id":"2b1f-190a","type":"person","attributes":{"email":"hoyt@ortiz.org","firstName":"Phil","lastName":"Batz","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[{"id":"2","type":"role"}]},"skills":{"data":[{"id":"3","type":"skill"}]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9d7e-32ec","type":"person","attributes":{"email":"laurinda_lockman@spencer-hickle.io","firstName":"Barney","lastName":"Wunsch","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}}]
