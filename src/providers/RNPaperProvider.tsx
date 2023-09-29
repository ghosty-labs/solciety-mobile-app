import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { TPortal } from '../types/paper'
import PortalPosted from '../components/Paper/Portal/PortalPosted'
import PortalReplied from '../components/Paper/Portal/PortalReplied'

interface IRNPaperContext {
  showPortal: TPortal | null
  setShowPortal: Dispatch<SetStateAction<TPortal | null>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restProps?: any
}

const RNPaperContext = createContext<IRNPaperContext | null>(null)

export const RNPaperProvider = ({
  children,
  restProps,
}: {
  children: JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restProps?: any
}) => {
  const [showPortal, setShowPortal] = useState<TPortal | null>(null)

  const dissmissPortal = () => setShowPortal(null)

  return (
    <>
      <RNPaperContext.Provider value={{ showPortal, setShowPortal, restProps }}>
        <PortalPosted
          isShow={showPortal === 'posted'}
          onClose={dissmissPortal}
        />
        <PortalReplied
          isShow={showPortal === 'replied'}
          onClose={dissmissPortal}
        />
        {children}
      </RNPaperContext.Provider>
    </>
  )
}

export const useRNPaper = () => {
  const context = useContext(RNPaperContext)
  if (!context) return null

  return context
}
