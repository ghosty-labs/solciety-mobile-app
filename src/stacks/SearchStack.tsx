import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParamList } from '../types/navigation'
import ProfileDetailScreen from '../screens/user/ProfileDetail'
import SearchScreen from '../screens/main/Search'
import SearchResultsScreen from '../screens/search/SearchResultsScreen'

const SearchStack = createNativeStackNavigator<SearchStackParamList>()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <SearchStack.Screen name="SearchTab" component={SearchScreen} />
      <SearchStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <SearchStack.Screen
        name="ProfileDetail"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        component={ProfileDetailScreen}
      />
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
