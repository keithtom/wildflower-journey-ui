
const Advice = () => {
  return null
}

export const getServerSideProps = () => {

  const userId = '2a09-fba2'
  const destination = `/advice/people/${userId}/decisions/draft`

  return {
    redirect: {
      destination,
      permanent: false
    }
  }
}

export default Advice
