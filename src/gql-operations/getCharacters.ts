import gql from 'graphql-tag'

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        species
        image
        created
        location {
          name
        }
        status
      }
    }
  }
`
export default GET_CHARACTERS
