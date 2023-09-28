import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { TBottomDrawer } from '../types/drawer'
import PostDrawer from '../components/Drawer/Bottom/PostDrawer'

interface IBottomDrawerContext {
  showDrawer: TBottomDrawer | null
  setShowDrawer: Dispatch<SetStateAction<TBottomDrawer | null>>
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

  const dismissDrawer = () => setShowDrawer(null)

  return (
    <>
      <BottomDrawerContext.Provider
        value={{ showDrawer, setShowDrawer, restProps }}
      >
        <PostDrawer isShow={showDrawer === 'post'} onClose={dismissDrawer} />
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
