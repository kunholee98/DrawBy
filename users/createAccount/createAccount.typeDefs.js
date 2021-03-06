import { gql } from 'apollo-server-express'

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      socialId: String
      username: String!
      password: String
      email: String!
      phoneNumber: String
      avatar: String
      bio: String
    ): CreateAccountResult!
  }
`
