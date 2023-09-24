import React, { useCallback, useEffect, useState } from 'react'
import { useConnection } from '../../providers/ConnectionProvider'
import {
  Account,
  useAuthorization,
} from '../../providers/AuthorizationProvider'
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledView,
} from '../../constants/nativewind'
import Post from '../../components/Post/Post'
import { PostService } from '../../services/Post'
import { IPost } from '../../types/post'

const HomeScreen = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, setBalance] = useState<number | null>(null)

  const { connection } = useConnection()
  const { selectedAccount } = useAuthorization()
  const { getPosts } = PostService()

  const fetchAndUpdatedBalance = useCallback(
    async (account: Account) => {
      const fetchedBalance = await connection.getBalance(account.publicKey)
      setBalance(fetchedBalance)
    },
    [connection],
  )

  useEffect(() => {
    if (!selectedAccount) return

    fetchAndUpdatedBalance(selectedAccount)
  }, [fetchAndUpdatedBalance, selectedAccount])

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

  return (
    <StyledView className="pt-4 h-full bg-zinc-900">
      {/* <Text>Homepage</Text>
      <Text>Address: {selectedAccount?.address}</Text>
      <Text>Balance: {convertLamportsToSOL(balance as number)}</Text> */}
      <StyledSafeAreaView>
        <StyledScrollView>
          {posts.map((post, index) => {
            return <Post key={index} data={post} />
          })}
        </StyledScrollView>
      </StyledSafeAreaView>
    </StyledView>
  )
}

export default HomeScreen
