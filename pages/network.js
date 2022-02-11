import Head from 'next/head'
import { useState } from 'react'

import {
  Toolbar,
  Divider,
  InputBase,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  Avatar,
  Chip
} from '@mui/material'

import PageContainer from '../components/ui/PageContainer'

const SearchPage = ({}) => {
  const [category, setCategory] = useState('people')

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

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

        <Toolbar>
          <InputBase
            placeholder="Search for something..."
          />
        </Toolbar>

        <Divider />

        <Grid container p={3} spacing={3}>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <FormControl fullWidth>
                  <Stack spacing={2}>

                    <Typography variant="h6">Filter</Typography>

                    <Divider />

                    <RadioGroup
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <FormControlLabel value="people" control={<Radio />} label="People" />
                      <FormControlLabel value="schools" control={<Radio />} label="Schools" />
                    </RadioGroup>

                    <Divider />

                    <FormLabel>Role</FormLabel>
                    <FormGroup>
                      <FormControlLabel value="teacher-leader" control={<Checkbox />} label="Teacher Leader" />
                      <FormControlLabel value="hub-member" control={<Checkbox />} label="Hub Member" />
                      <FormControlLabel value="foundation-partner" control={<Checkbox />} label="Foundation Partner" />
                      <FormControlLabel value="operations-guide" control={<Checkbox />} label="Operations Guide" />
                      <FormControlLabel value="board-member" control={<Checkbox />} label="Board Member" />
                    </FormGroup>

                    <Divider />

                    <FormLabel>Skills</FormLabel>
                    <FormGroup>
                      <FormControlLabel value="accounting" control={<Checkbox />} label="Accounting" />
                      <FormControlLabel value="branding" control={<Checkbox />} label="Branding" />
                      <FormControlLabel value="construction" control={<Checkbox />} label="Construction" />
                      <FormControlLabel value="development" control={<Checkbox />} label="Development" />
                    </FormGroup>

                    <FormLabel>Hub</FormLabel>
                    <Select>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="MA">Massachusetts</MenuItem>
                    </Select>

                    <Divider />

                    <FormLabel>Distance</FormLabel>
                    <Select>
                      <MenuItem value="5">Within 5 miles</MenuItem>
                      <MenuItem value="10">Within 10 miles</MenuItem>
                    </Select>

                  </Stack>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            {category === 'people' ?
              <Stack spacing={3}>
                <Typography variant="h6">{people.length} Results</Typography>
                <Stack spacing={1}>
                  {people.map((p, i) =>
                    <Card>
                      <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Avatar sx={{
                                  width: 32,
                                  height: 32
                                }} />
                              </Grid>
                              <Grid item>
                                <Typography>{p.attributes.firstName} {p.attributes.lastName}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Chip label="Finance" />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                </Stack>
              </Stack>
            :
              <Stack spacing={3}>
                <Typography variant="h6">{schools.length} Results</Typography>
                <Stack spacing={1}>
                  {schools.map((p, i) =>
                    <Card>
                      <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Typography>{p.attributes.name}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                </Stack>
              </Stack>

            }
          </Grid>

        </Grid>

      </PageContainer>

    </>
  )
}

export default SearchPage

const schools = [{"id":"6362-514b","type":"school","attributes":{"name":"Brookville Primary School","shortName":null,"website":"satterfield.biz","phone":"391.483.9249 x45663","email":"nubia.ernser@waelchi.com","governanceType":"Charter","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Infants","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"1","type":"address"}}}},{"id":"e72b-4c80","type":"school","attributes":{"name":"Ironston Elementary School","shortName":null,"website":"balistreri.co","phone":"1-938-779-4920","email":"marc@willms-roberts.biz","governanceType":"District","tuitionAssistanceType":"County Childcare Assistance Programs","agesServed":"Adolescent","calendar":"10 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":{"id":"2","type":"address"}}}},{"id":"9632-2a81","type":"school","attributes":{"name":"Brighthurst Elementary School","shortName":null,"website":"schmidt.co","phone":"363-172-2592 x6100","email":"joi@ledner.com","governanceType":"Independent","tuitionAssistanceType":"State vouchers","agesServed":"Upper Elementary","calendar":"10 month","maxEnrollment":12,"facebook":null,"instagram":null},"relationships":{"address":{"data":null}}},{"id":"02f1-7578","type":"school","attributes":{"name":"Brookville Elementary School","shortName":null,"website":"emmerich.co","phone":"211-480-9204 x013","email":"wilmer_reilly@spinka-marks.name","governanceType":"Independent","tuitionAssistanceType":"City vouchers","agesServed":"Upper Elementary","calendar":"9 month","maxEnrollment":11,"facebook":null,"instagram":null},"relationships":{"address":{"data":null}}}]
const people = [{"id":"2601-8f69","type":"person","attributes":{"email":"noel_trantow@homenick.net","firstName":"Jaimee","lastName":"Gleichner","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9acf-aef7","type":"person","attributes":{"email":"georgina_grant@schumm.info","firstName":"Pete","lastName":"Stiedemann","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"490f-89d5","type":"person","attributes":{"email":"robt@ledner.net","firstName":"Flossie","lastName":"Bashirian","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"4864-6bf1","type":"person","attributes":{"email":"dorsey.hand@fay-pfannerstill.net","firstName":"June","lastName":"Hegmann","phone":null},"relationships":{"schools":{"data":[{"id":"1","type":"school"}]},"roles":{"data":[{"id":"1","type":"role"}]},"skills":{"data":[{"id":"1","type":"skill"},{"id":"2","type":"skill"}]},"experiences":{"data":[{"id":"1","type":"experience"}]},"address":{"data":{"id":"3","type":"address"}}}},{"id":"2b1f-190a","type":"person","attributes":{"email":"hoyt@ortiz.org","firstName":"Phil","lastName":"Batz","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[{"id":"2","type":"role"}]},"skills":{"data":[{"id":"3","type":"skill"}]},"experiences":{"data":[]},"address":{"data":null}}},{"id":"9d7e-32ec","type":"person","attributes":{"email":"laurinda_lockman@spencer-hickle.io","firstName":"Barney","lastName":"Wunsch","phone":null},"relationships":{"schools":{"data":[]},"roles":{"data":[]},"skills":{"data":[]},"experiences":{"data":[]},"address":{"data":null}}}]
