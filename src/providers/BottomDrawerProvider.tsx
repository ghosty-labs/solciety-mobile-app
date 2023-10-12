import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { TBottomDrawer } from '../types/drawer'
import PostDrawer from '../components/Drawer/Bottom/PostDrawer'
import ReplyDrawer from '../components/Drawer/Bottom/ReplyDrawer'
import { IPost } from '../types/post'
import EditProfileDrawer from '../components/Drawer/Bottom/EditProfileDrawer'
import { IProfile } from '../types/profile'

interface IBottomDrawerContext {
  showDrawer: TBottomDrawer | null
  setShowDrawer: Dispatch<SetStateAction<TBottomDrawer | null>>
  setReplyData?: Dispatch<SetStateAction<IPost | undefined>>
  setEditProfileData?: Dispatch<SetStateAction<IProfile | undefined>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restProps?: any
}

const BottomDrawerContext = createContext<IBottomDrawerContext | null>(null)

export const BottomDrawerProvider = ({
  children,
  restProps,
}: {
  children: JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restProps?: any
}) => {
  const [showDrawer, setShowDrawer] = useState<TBottomDrawer | null>(null)
  const [replyData, setReplyData] = useState<IPost | undefined>(undefined)
  const [editProfileData, setEditProfileData] = useState<IProfile | undefined>(
    undefined,
  )

  const dismissDrawer = () => setShowDrawer(null)

  return (
    <>
      <BottomDrawerContext.Provider
        value={{
          showDrawer,
          setShowDrawer,
          setReplyData,
          setEditProfileData,
          restProps,
        }}
      >
        <PostDrawer isShow={showDrawer === 'post'} onClose={dismissDrawer} />
        <ReplyDrawer
          isShow={showDrawer === 'reply'}
          onClose={dismissDrawer}
          replyData={replyData as IPost}
        />
        <EditProfileDrawer
          isShow={showDrawer === 'edit-profile'}
          onClose={dismissDrawer}
          profileData={editProfileData as IProfile}
        />
        {children}
      </BottomDrawerContext.Provider>
    </>
  )
}

export const useBottomDrawer = () => {
  const context = useContext(BottomDrawerContext)
  if (!context) return null

  return context
}
