import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main/Home'
import SearchScreen from '../screens/main/Search'
import PostScreen from '../screens/main/Post'
import NotificationScreen from '../screens/main/Notification'
import ProfileScreen from '../screens/main/Profile'
import { MainTabParamList } from '../types/navigation'
import {
  IconBell,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from '../components/Icons/Icon'
import { StyledView } from '../constants/nativewind'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainNavigation = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#18181b',
          borderColor: '#18181b',
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <IconHome size={25} color={focused ? 'white' : '#71717a'} />
          },
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: '#18181b',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: '800',
          },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => {
            return (
              <IconSearch size={25} color={focused ? 'white' : '#71717a'} />
            )
          },
        }}
      />
      <MainTab.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <StyledView className="p-2 rounded-full transition duration-300 bg-solana-green">
                <IconPlus size={25} color="#18181b" />
              </StyledView>
            )
          },
        }}
      />
      <MainTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerStyle: {
            backgroundColor: '#18181b',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            fontWeight: '800',
          },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => {
            return (
              <StyledView className="relative">
                <IconBell size={25} color={focused ? 'white' : '#71717a'} />
                <StyledView className="absolute right-0 w-3 h-3 rounded-full bg-red-500"></StyledView>
              </StyledView>
            )
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <IconUser size={25} color={focused ? 'white' : '#71717a'} />
          },
          headerStyle: { backgroundColor: '#18181b' },
        }}
      />
    </MainTab.Navigator>
  )
}

export default MainNavigation
