import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PostScreen from '../screens/main/Post'
import { MainTabParamList } from '../types/navigation'
import {
  IconBell,
  IconHome,
  IconPlus,
  IconSearch,
  IconUser,
} from '../components/Icons/Icon'
import { useBottomDrawer } from '../providers/BottomDrawerProvider'
import { StyledView } from '../constants/nativewind'
import HomeStackScreen from '../stacks/HomeStack'
import { NotificationService } from '../services/Notification'
import { useQuery } from 'react-query'
import { useAuthorization } from '../providers/AuthorizationProvider'
import { useStore } from '../providers/ContextProvider'
import NotifStackScreen from '../stacks/NotifStack'
import ProfileStackScreen from '../stacks/ProfileStack'
import SearchStackScreen from '../stacks/SearchStack'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainNavigation = () => {
  const { selectedAccount } = useAuthorization()
  const { getNotificationStatus } = NotificationService()
  const setter = useBottomDrawer()
  const store = useStore()

  const { data: notificationStatus } = useQuery({
    queryKey: 'get-notif-status',
    queryFn: () =>
      getNotificationStatus({
        public_key: selectedAccount?.publicKey,
      }),
    refetchInterval: 2000,
  })

  useEffect(() => {
    if (notificationStatus) {
      store?.setNewNotif(true)
    }
  }, [notificationStatus])

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
        tabBarHideOnKeyboard: true,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <IconHome size={25} color={focused ? 'white' : '#71717a'} />
          },
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackScreen}
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
          headerStyle: {
            backgroundColor: '#18181b',
          },
          tabBarIcon: () => {
            return (
              <StyledView className="p-2 rounded-full transition duration-300 bg-solana-green">
                <IconPlus size={25} color="#18181b" />
              </StyledView>
            )
          },
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault()
            setter?.setShowDrawer('post')
          },
        })}
      />
      <MainTab.Screen
        name="Notifications"
        component={NotifStackScreen}
        options={{
          headerStyle: {
            backgroundColor: '#18181b',
          },
          headerShown: false,
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
                {notificationStatus && (
                  <StyledView className="absolute right-0 w-3 h-3 rounded-full bg-red-500"></StyledView>
                )}
              </StyledView>
            )
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileStackScreen}
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
