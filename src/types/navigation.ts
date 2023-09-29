import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  Setting: undefined
}

export type AuthStackParamList = {
  ConnectWallet: undefined
  SignMessageToken: undefined
}

export type MainTabParamList = {
  Home: undefined
  Search: { accountId: string }
  Post: undefined
  Notifications: undefined
  Profile: { accountId: string }
}

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type MainTabProps = NativeStackScreenProps<MainTabParamList>

export interface INotificationTabs {
  key: TNotificationTabs
  title: string
}

type TNotificationTabs = 'all' | 'replies' | 'mention' | 'verified'

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'collectibles' | 'likes'
