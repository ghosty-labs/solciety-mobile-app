import React from 'react'
import { Button, Text, View } from 'react-native'
import { StyledView } from '../../constants/nativewind'
import { StackProps } from '../../types/navigation'

const ProfileHeader = ({ navigation }: StackProps) => {
  return (
    <StyledView className="flex flex-row items-center justify-between w-full">
      <View>
        <Text>logo</Text>
      </View>
      <View>
        <Text>wallet</Text>
      </View>
      <View>
        <Button
          title="settings"
          onPress={() => navigation.navigate('Setting')}
        />
      </View>
    </StyledView>
  )
}

export default ProfileHeader
