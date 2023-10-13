import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IPost, TPostItem } from './post'

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  Setting: undefined
  PostDetail: { type: TPostItem; data: IPost | null; postKey?: string }
  MintNFT: undefined
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
  ProfileDetail: { publicKey: string }
}

// Stacks - Start
export type HomeStackParamList = {
  HomeTab: undefined
  ProfileDetail: { publicKey: string }
  PostDetail: { type: TPostItem; data: IPost | null; postKey?: string }
}

export type SearchStackParamList = {
  SearchTab: undefined
  SearchResults: { search: string }
  ProfileDetail: { publicKey: string }
  PostDetail: { type: TPostItem; data: IPost | null; postKey?: string }
}

export type NotifStackParamList = {
  NotifTab: undefined
  ProfileDetail: { publicKey: string }
  PostDetail: { type: TPostItem; data: IPost | null; postKey?: string }
}

export type ProfileStackParamList = {
  ProfileTab: undefined
  ProfileDetail: { publicKey: string }
  PostDetail: { type: TPostItem; data: IPost | null; postKey?: string }
}
// Stack - End

export type StackProps = NativeStackScreenProps<RootStackParamList>
export type MainTabProps = NativeStackScreenProps<MainTabParamList>

export interface INotificationTabs {
  key: TNotificationTabs
  title: string
}

type TNotificationTabs = 'all' | 'replies' | 'likes' | 'follow'

export interface IHomeTabs {
  key: THomeTabs
  title: string
}

type THomeTabs = 'all' | 'following'

export interface ISearchTabs {
  key: TSearchTabs
  title: string
}

type TSearchTabs = 'post'

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'collectibles' | 'likes'
