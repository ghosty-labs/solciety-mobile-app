import React from 'react'
import { StyledText, StyledView } from '../../../constants/nativewind'
import { ActivityIndicator, Portal, Snackbar } from 'react-native-paper'
import { useRNPaper } from '../../../providers/RNPaperProvider'

interface PortalRepliedProps {
  isShow: boolean
  onClose: () => void
}

const PortalReplied = ({ isShow, onClose }: PortalRepliedProps) => {
  const paper = useRNPaper()

  const onDimissPortal = () => {
    paper?.setShowPortal(null)
    onClose()
  }

  return (
    <Portal>
      <Snackbar
        style={{
          position: 'absolute',
          bottom: 52,
          backgroundColor: '#3f3f46',
        }}
        visible={isShow}
        onDismiss={onDimissPortal}
        duration={4000}
        action={{
          label: 'Hide',
          labelStyle: { color: '#14F195' },
          onPress: () => {
            onDimissPortal()
          },
        }}
      >
        <StyledView className="flex flex-row items-center gap-x-3">
          <ActivityIndicator animating={true} color="#9ca3af" size={20} />
          <StyledText className="text-white">
            Replying On-Chain, please wait...
          </StyledText>
        </StyledView>
      </Snackbar>
    </Portal>
  )
}

export default PortalReplied
