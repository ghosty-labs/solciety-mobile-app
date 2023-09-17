export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
}

export type AuthStackParamList = {
  ConnectWallet: undefined
}

export type MainTabParamList = {
  Home: undefined
  Search: { accountId: string }
  Post: undefined
  Activity: undefined
  Profile: { accountId: string }
}

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'media' | 'likes'
