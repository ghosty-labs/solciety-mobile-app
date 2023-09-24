import React from 'react'
import { INotificationItem } from '../../types/notification'
import { Button } from '../Common'
import { StyledView } from '../../constants/nativewind'

interface NotificationActionProps {
  data: INotificationItem
}

const NotificationAction = ({ data }: NotificationActionProps) => {
  switch (data.notification_status) {
    case 'followed':
      return (
        <StyledView className="w-20 mr-1">
          <Button
            className="py-3"
            title="Follow"
            textColor="white"
            textSize="sm"
            border={2}
            borderColor="zinc"
            radius="lg"
            onPress={() => null}
          />
        </StyledView>
      )
  }
}

export default NotificationAction
