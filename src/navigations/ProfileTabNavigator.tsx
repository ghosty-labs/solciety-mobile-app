import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import ProfilePostScreen from '../screens/Profile/ProfilePost'
import ProfileRepliesScreen from '../screens/Profile/ProfileReplies'
import ProfileMediaScreen from '../screens/Profile/ProfileMedia'
import ProfileLikeScreen from '../screens/Profile/ProfileLike'

const Tab = createMaterialTopTabNavigator()

const ProfileTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ProfilePost">
      <Tab.Screen name="ProfilePost" component={ProfilePostScreen}></Tab.Screen>
      <Tab.Screen name="ProfileReplies" component={ProfileRepliesScreen}></Tab.Screen>
      <Tab.Screen name="ProfileMedia" component={ProfileMediaScreen}></Tab.Screen>
      <Tab.Screen name="ProfileLike" component={ProfileLikeScreen}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default ProfileTabNavigator
