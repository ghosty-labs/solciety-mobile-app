export type TRootParamList = {
  posts: undefined
  replies: { param: 'test' }
}

export interface IProfileTabs {
  key: TProfileTabs
  title: string
}

type TProfileTabs = 'posts' | 'replies' | 'media' | 'likes'
