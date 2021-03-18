import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack'
import PropTypes from 'prop-types'

import styles from '../styles'
import { RootStackParamList } from '../types'

export interface ScanScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Scan'>
}

interface ScanScreenState {
  startTime: any,
  endTime: any,
  code: any
}

const Scan: React.FC<ScanScreenProps> = ({ navigation }) => {  
  const [
    state, 
    setState
  ] = useState<ScanScreenState>({
    startTime: null,
    endTime: null,
    code: null
  })

  const {
    startTime,
    endTime,
    code
  } = state;

  const [torch, setTorch] = useState(false)

  useEffect(() => {
    if (startTime && endTime) {
      const diff = endTime - startTime

      navigation.reset({
        index: 0,
        routes: [{
          name: 'Result',
          params: {
            ...code,
            time: diff
          }
        }]
      })

    }
  }, [startTime, endTime])

  const onCameraReady = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      startTime: Date.now()
    }))
  }, [])

  const onBarcodeScanned = useCallback((code: any) => {
    setState(prevState => ({
      ...prevState,
      code,
      endTime: Date.now()
    }))
  }, [])

  const flashMode = torch 
    ? Camera.Constants.FlashMode.torch
    : Camera.Constants.FlashMode.off

  const cameraWidth = Dimensions.get("window").width - 40
  const cameraHeight = Math.round((cameraWidth * 4) / 3)

  const barCodeTypes = [
    BarCodeScanner.Constants.BarCodeType.datamatrix,
    BarCodeScanner.Constants.BarCodeType.qr,
    BarCodeScanner.Constants.BarCodeType.ean13,
    BarCodeScanner.Constants.BarCodeType.code128,
    BarCodeScanner.Constants.BarCodeType.code39,
    BarCodeScanner.Constants.BarCodeType.interleaved2of5
  ];

  return (
    <View style={styles.mainContainer}>
      <Camera 
        style={{
          height: cameraHeight,
          width: cameraWidth
        }}
        autoFocus={Camera.Constants.AutoFocus.on}
        onCameraReady={onCameraReady}
        onBarCodeScanned={onBarcodeScanned}
        flashMode={flashMode}
        barCodeScannerSettings={{barCodeTypes}}
      />
      <TouchableOpacity
        onPress={()=>setTorch(prev=>!prev)}
        style={styles.btn}
      >
        <Text style={{ color: 'white' }}>
          {torch ? 'Light Off' : 'Light On'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Scan

Scan.propTypes = {
  navigation: PropTypes.any.isRequired
}