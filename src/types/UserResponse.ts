export type ClientUser = ClientProfile & {
  restExperience: number
  bookCount: number
  progress: number
  followings: ClientProfile[]
  followers: ClientProfile[]
  requestFollowers: ClientProfile[]
}

export type ClientProfile = {
  id: string
  name: string
  email: string
  level: number
  experience: number
  following: boolean
}
