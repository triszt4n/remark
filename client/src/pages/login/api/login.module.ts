import { UserDto } from '../model/user.dto'

export const loginModule = {
  async fetchUser() {},
  async storeUser(user: UserDto) {},
  async createJwtForUser(user: UserDto) {}
}
