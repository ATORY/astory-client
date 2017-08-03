import { gql } from 'react-apollo';

export const authQuery = gql`
query auth {
  user: auth {
    _id
    email
    userAvatar
  }
}
`;