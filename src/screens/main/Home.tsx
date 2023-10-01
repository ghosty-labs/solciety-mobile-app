/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { IHomeTabs } from '../../types/navigation'
import { StyledText, StyledView } from '../../constants/nativewind'
import HomeAllScreen from '../home/HomeAll'
import HomeFollowingScreen from '../home/HomeFollowing'
import HomeHeader from '../../components/Home/HomeHeader'

const HomeScreen = () => {
  const [index, setIndex] = useState<number>(0)

  const layout = useWindowDimensions()
  const [routes] = useState<IHomeTabs[]>([
    {
      key: 'all',
      title: 'All',
    },
    {
      key: 'following',
      title: 'Following',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'all':
        return <HomeAllScreen />
      case 'following':
        return <HomeFollowingScreen />
    }
  }

  return (
    <StyledView className="h-full bg-zinc-900">
      <CollapsibleHeaderTabView
        renderScrollHeader={() => <HomeHeader />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={(props) => {
              return (
                <StyledText
                  className={`font-semibold text-sm ${
                    props.focused ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {props.route.title}
                </StyledText>
              )
            }}
            style={{
              backgroundColor: '#18181b',
              marginTop: -8,
              paddingVertical: 4,
            }}
            indicatorStyle={{
              backgroundColor: '#14F195',
              width: '15%',
              height: 5,
              borderRadius: 20,
              marginLeft: 68,
            }}
            android_ripple={{
              borderless: false,
              color: undefined,
            }}
          />
        )}
      />
    </StyledView>
  )
}

export default HomeScreen
