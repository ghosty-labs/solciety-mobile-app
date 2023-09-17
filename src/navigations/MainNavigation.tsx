import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main/Home'
import SearchScreen from '../screens/main/Search'
import PostScreen from '../screens/main/Post'
import ActivityScreen from '../screens/main/Activity'
import ProfileScreen from '../screens/main/Profile'
import { MainTabParamList } from '../types/navigation'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainNavigation = () => {
  return (
    <MainTab.Navigator initialRouteName="Home">
      <MainTab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <MainTab.Screen name="Search" component={SearchScreen} />
      <MainTab.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
      <MainTab.Screen name="Activity" component={ActivityScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  )
}

export default MainNavigation
