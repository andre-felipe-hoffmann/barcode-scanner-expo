
import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native';

import RootNavigator from './components/RootNavigator'
import styles from './styles';
import { usePermission } from './hooks';

const App: React.FC = () => {
  const hasPermission = usePermission()

  if (hasPermission === null) {
      return <View />;
  }
  if (hasPermission === false) {
      return (
          <View style={styles.mainContainer}>
              <Text>Sem acesso à camera</Text>
          </View>
      )
  }
  return (
    <RootNavigator />
  )
}

export default App

