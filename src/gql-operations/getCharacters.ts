import gql from 'graphql-tag'

const GET_CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
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
