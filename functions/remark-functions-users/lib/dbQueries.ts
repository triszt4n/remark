import { Container, SqlQuerySpec } from '@azure/cosmos'
import * as md5 from 'md5'
import { GoogleUser, User, UserResource } from './model'

export const createQueryByUsername = (username: string) => ({
  query: 'SELECT * FROM Users u WHERE UPPER(u.username) = UPPER(@username)',
  parameters: [
    {
      name: '@username',
      value: username
    }
  ]
})

export const createQueryByEmail = (email: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Users u WHERE UPPER(u.email) = UPPER(@email)',
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
