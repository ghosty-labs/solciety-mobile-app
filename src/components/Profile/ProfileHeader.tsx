import React from 'react'
import { Button, Text, View } from 'react-native'
import { StyledView } from '../../constants/nativewind'

const ProfileHeader = () => {
  return (
    <StyledView className="flex flex-row items-center justify-between w-full">
      <View>
        <Text>logo</Text>
      </View>
      <View>
        <Text>wallet</Text>
      </View>
      <View>
        <Button title="settings" onPress={() => null} />
      </View>
    </StyledView>
  )
}

export default ProfileHeader
