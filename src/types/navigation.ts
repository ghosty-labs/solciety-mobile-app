import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IPost, TPostItem } from './post'

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  Setting: undefined
  PostDetail: { type: TPostItem; data: IPost }
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

// Stacks - Start
export type HomeStackParamList = {
  HomeTab: undefined
  ProfileDetail: { publickKey: string }
  PostDetail: { type: TPostItem; data: IPost }
}
// Stack - End

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type MainTabProps = NativeStackScreenProps<MainTabParamList>

export interface INotificationTabs {
  key: TNotificationTabs
  title: string
}

type TNotificationTabs = 'all' | 'replies' | 'mention' | 'verified'

export interface IHomeTabs {
  key: THomeTabs
  title: string
}

type THomeTabs = 'all' | 'following'

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'collectibles' | 'likes'
