/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { TabBar } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'
import { ISearchTabs } from '../../types/navigation'
import SearchPostScreen from '../search/SearchPost'
import SearchHeader from '../../components/Search/SearchHeader'

const SearchResultsScreen = () => {
  const [index, setIndex] = useState<number>(0)

  const layout = useWindowDimensions()
  const [routes] = useState<ISearchTabs[]>([
    {
      key: 'post',
      title: 'Post',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'post':
        return <SearchPostScreen />
    }
  }

  return (
    <StyledView className="h-full bg-zinc-900">
      <CollapsibleHeaderTabView
        renderScrollHeader={() => <SearchHeader />}
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
                  className={`font-semibold text-base ${
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
              backgroundColor: '#18181b',
              width: '10%',
              height: 5,
              borderRadius: 20,
              marginLeft: 184,
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

export default SearchResultsScreen
