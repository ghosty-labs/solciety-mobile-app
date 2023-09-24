import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main/Home'
import SearchScreen from '../screens/main/Search'
import PostScreen from '../screens/main/Post'
import NotificationScreen from '../screens/main/Notification'
import ProfileScreen from '../screens/main/Profile'
import { MainTabParamList, StackProps } from '../types/navigation'
import ProfileHeader from '../components/Profile/ProfileHeader'
import {
  IconBell,
  IconHome,
  IconPost,
  IconSearch,
  IconUser,
} from '../components/Icons/Icon'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainNavigation = ({ navigation }: StackProps) => {
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
            return <IconHome size={25} color={focused ? '#9945FF' : 'white'} />
          },
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <IconSearch size={25} color={focused ? '#9945FF' : 'white'} />
            )
          },
        }}
      />
      <MainTab.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <IconPost size={25} color={focused ? '#9945FF' : 'white'} />
          },
        }}
      />
      <MainTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <IconBell size={25} color={focused ? '#9945FF' : 'white'} />
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <ProfileHeader
              navigation={navigation}
              route={{ key: 'Setting', name: 'Setting' }}
            />
          ),
          tabBarIcon: ({ focused }) => {
            return <IconUser size={25} color={focused ? '#9945FF' : 'white'} />
          },
        }}
      />
    </MainTab.Navigator>
  )
}

export default MainNavigation
