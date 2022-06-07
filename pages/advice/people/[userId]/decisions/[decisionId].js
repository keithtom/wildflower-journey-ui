import {
  PageContainer,
  Grid
} from '@ui'

const Decision = ({ decision }) => {
  console.log('decision', decision)

  return (
    <>
      <PageContainer>

        <p>Decision {decision[0].id} </p>

      </PageContainer>
    </>
  )
}

export async function getServerSideProps({ query }) {

  const userId = query.userId
  const decisionId = query.decisionId
  const apiRoute = `https://api.wildflowerschools.org/v1/advice/people/${userId}/decisions`

  const res = await fetch(apiRoute)
  const data = await res.json()

  const decision = data.data.filter(decision => decision.id === decisionId)

  return {
    props: {
      decision
    }
  }
}

export default Decision
