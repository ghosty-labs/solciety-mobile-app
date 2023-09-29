import React from 'react'
import { StyledText, StyledView } from '../../../constants/nativewind'
import { ActivityIndicator, Portal, Snackbar } from 'react-native-paper'
import { useRNPaper } from '../../../providers/RNPaperProvider'

interface PortalNewPostProps {
  isShow: boolean
  onClose: () => void
}

const PortalNewpost = ({ isShow, onClose }: PortalNewPostProps) => {
  const paper = useRNPaper()

  const onDimissStackBar = () => {
    paper?.setShowPortal(null)
    onClose()
  }

  return (
    <Portal>
      <Snackbar
        style={{
          position: 'absolute',
          bottom: 45,
          backgroundColor: '#3f3f46',
        }}
        visible={isShow}
        onDismiss={onDimissStackBar}
        duration={4000}
        action={{
          label: 'Hide',
          labelStyle: { color: '#14F195' },
          onPress: () => {
            onDimissStackBar()
          },
        }}
      >
        <StyledView className="flex flex-row items-center gap-x-3">
          <ActivityIndicator animating={true} color="#9ca3af" size={20} />
          <StyledText className="text-white">New Post</StyledText>
        </StyledView>
      </Snackbar>
    </Portal>
  )
}

export default PortalNewpost
