/**
 * @format
 */
import { Buffer } from 'buffer'
import 'react-native-get-random-values'
import 'text-encoding'
import 'react-native-url-polyfill/auto'

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

window.addEventListener = () => {}
window.removeEventListener = () => {}
window.Buffer = Buffer

AppRegistry.registerComponent(appName, () => App)
