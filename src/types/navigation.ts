import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  Setting: undefined
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

export type StackProps = NativeStackScreenProps<RootStackParamList>

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'media' | 'likes'
