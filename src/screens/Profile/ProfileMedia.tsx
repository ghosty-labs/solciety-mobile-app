import React from 'react'
import { Text, View } from 'react-native'
import { HScrollView } from 'react-native-head-tab-view'

const ProfileMediaScreen = () => {
  return (
    <HScrollView index={2}>
      <View>
        <Text>tab profile media</Text>
      </View>
    </HScrollView>
  )
}

export default ProfileMediaScreen
