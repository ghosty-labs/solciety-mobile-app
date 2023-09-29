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
}

const Context = createContext<IContext | null>(null)

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [newPost, setNewPost] = useState<IPost | null>(null)
  const [newReply, setNewReply] = useState<IReply | null>(null)

  return (
    <>
      <Context.Provider
        value={{
          newPost,
          setNewPost,
          newReply,
          setNewReply,
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
