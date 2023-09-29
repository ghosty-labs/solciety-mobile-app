import React from 'react'
import { StyledView } from '../../constants/nativewind'
import { IPost } from '../../types/post'
import Post from '../../components/Post/Post'
import { HScrollView } from 'react-native-head-tab-view'

const ProfileLikeScreen = () => {
  const dataLiked: IPost[] = [
    {
      _id: '650f5cc01030b547a33fe304',
      signature:
        '2Ut8n1G4Hxrk6QuvpvMPdbt4sb1pC3bzPp237JDMye3U46ARckVKkifU3eVMP698bB56hN2Jrb6reGJ4KWDiQ8ct',
      key: '3DeFmmbAXxzGGiVH1XEui1iHfPZ3pgdR9C5k1DnzFp3N',
      user: 'AokJGyFmJjZ99qrPcvsLfa2u5xsK2yh9LBcH3H7xapo9',
      tag: 'hyperdrive',
      content: 'LFG!',
      created_at: 1695505587,
      updated_at: 1695505587,
      liked: [
        'ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq',
        'AokJGyFmJjZ99qrPcvsLfa2u5xsK2yh9LBcH3H7xapo9',
      ],
      likes: 2,
      comment: 0,
      total_comment: 0,
    },
  ]

  return (
    <HScrollView index={3}>
      <StyledView className="h-full pt-4 bg-zinc-900">
        {dataLiked.map((post, index) => {
          return <Post key={index} data={post} />
        })}
      </StyledView>
    </HScrollView>
  )
}

export default ProfileLikeScreen
