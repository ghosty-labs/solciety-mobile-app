import React from 'react'
import { INotificationItem } from '../../types/notification'
import { Button } from '../Common'
import { StyledView } from '../../constants/nativewind'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../types/navigation'

interface NotificationActionProps {
  notifData: INotificationItem
}

const NotificationAction = ({ notifData }: NotificationActionProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  switch (notifData.type) {
    case 'FOLLOW':
      return (
        <StyledView className="w-20 mr-1">
          <Button
            className="px-4 py-4"
            title="See Profile"
            textColor="white"
            textSize="sm"
            border={2}
            borderColor="zinc"
            radius="lg"
            onPress={() =>
              navigation.navigate('ProfileDetail', {
                publicKey: notifData.from,
              })
            }
          />
        </StyledView>
      )
  }
}

export default NotificationAction
