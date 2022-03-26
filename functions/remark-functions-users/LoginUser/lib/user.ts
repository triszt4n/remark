import { Container, SqlQuerySpec } from '@azure/cosmos'
import axios from 'axios'
import * as md5 from 'md5'
import { GoogleUser, User, UserResource } from '../../database/model'

const createQueryByEmail = (email: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Users u WHERE u.email = @email',
  parameters: [
    {
      name: '@email',
      value: email
    }
  ]
})

const createUser = async (usersContainer: Container, googleUser: GoogleUser): Promise<UserResource> => {
  const creatableUser: User = {
    firstName: googleUser.given_name,
    lastName: googleUser.family_name,
    username: md5(googleUser.email),
    email: googleUser.email
  }

  const { resource: user } = await usersContainer.items.create(creatableUser)
  return user
}

export const getOrCreateUserByEmail = async (usersContainer: Container, googleUser: GoogleUser): Promise<UserResource> => {
  const { resources } = await usersContainer.items.query<UserResource>(createQueryByEmail(googleUser.email)).fetchAll()
  if (resources.length === 0) {
    return createUser(usersContainer, googleUser)
  } else {
    return resources[0]
  }
}

export const getGoogleUser = async (accessToken: string): Promise<GoogleUser> => {
  return axios.post('https://www.googleapis.com/oauth2/v4/token', {
    Headers: { Authorization: `Bearer ${accessToken}` }
  })
}
