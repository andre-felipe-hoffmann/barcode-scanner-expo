
import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';

import RootNavigator from './components/RootNavigator'
import styles from './styles';

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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

