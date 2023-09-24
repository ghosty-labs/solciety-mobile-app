import React, { useEffect, useState } from 'react'
import { StyledView } from '../../constants/nativewind'
import { IPost } from '../../types/post'
import { PostService } from '../../services/Post'
import Post from '../../components/Post/Post'
import { HScrollView } from 'react-native-head-tab-view'

const ProfilePostScreen = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const { getPosts } = PostService()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await getPosts()

      setPosts(res)
    } catch (error) {
      console.log(error)
    }
  }

  const dataPosts = posts.filter(
    (post) => post.user === `ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq`,
  )

  return (
    <HScrollView index={0}>
      <StyledView className="h-full pt-4 bg-zinc-900">
        {dataPosts.map((post, index) => {
          return <Post key={index} data={post} />
        })}
      </StyledView>
    </HScrollView>
  )
}

export default ProfilePostScreen
