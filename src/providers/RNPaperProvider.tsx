import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { TModal, TPortal } from '../types/paper'
import PortalPosted from '../components/Paper/Portal/PortalPosted'
import PortalReplied from '../components/Paper/Portal/PortalReplied'
import PortalFollow from '../components/Paper/Portal/PortalFollow'
import { TFollow } from '../types/follow'

interface IRNPaperContext {
  showPortal: TPortal | null
  setShowPortal: Dispatch<SetStateAction<TPortal | null>>
  showModal: TModal | null
  setShowModal: Dispatch<SetStateAction<TModal | null>>
  setTypeFollow?: Dispatch<SetStateAction<TFollow | undefined>>
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
  const [showModal, setShowModal] = useState<TModal | null>(null)

  const [typeFollow, setTypeFollow] = useState<TFollow | undefined>(undefined)

  const dissmissPortal = () => setShowPortal(null)

  return (
    <>
      <RNPaperContext.Provider
        value={{
          showPortal,
          setShowPortal,
          showModal,
          setShowModal,
          setTypeFollow,
          restProps,
        }}
      >
        <PortalPosted
          isShow={showPortal === 'posted'}
          onClose={dissmissPortal}
        />
        <PortalReplied
          isShow={showPortal === 'replied'}
          onClose={dissmissPortal}
        />
        <PortalFollow
          isShow={showPortal === 'follow'}
          onClose={dissmissPortal}
          type={typeFollow as TFollow}
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
