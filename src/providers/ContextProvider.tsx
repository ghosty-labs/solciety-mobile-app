import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { IPost } from '../types/post'
import { IReply } from '../types/reply'

interface IContext {
  newPost: IPost | null
  setNewPost: Dispatch<SetStateAction<IPost | null>>
  newReply: IReply | null
  setNewReply: Dispatch<SetStateAction<IReply | null>>
  newNotif: boolean | null
  setNewNotif: Dispatch<SetStateAction<boolean | null>>
  isProfileUpdated: boolean | null
  setIsProfileUpdated: Dispatch<SetStateAction<boolean | null>>
}

const Context = createContext<IContext | null>(null)

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [newPost, setNewPost] = useState<IPost | null>(null)
  const [newReply, setNewReply] = useState<IReply | null>(null)
  const [newNotif, setNewNotif] = useState<boolean | null>(null)
  const [isProfileUpdated, setIsProfileUpdated] = useState<boolean | null>(null)

  return (
    <>
      <Context.Provider
        value={{
          newPost,
          setNewPost,
          newReply,
          setNewReply,
          newNotif,
          setNewNotif,
          isProfileUpdated,
          setIsProfileUpdated,
        }}
      >
        {children}
      </Context.Provider>
    </>
  )
}

export const useStore = () => {
  const context = useContext(Context)
  if (!context) return null

  return context
}
