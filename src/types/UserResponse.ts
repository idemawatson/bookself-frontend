export type ClientUser = {
  id: string
  name: string
  email: string
  followings: ClientUser[]
  followers: ClientUser[]
}
