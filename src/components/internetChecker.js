import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback, Alert,
} from 'react-native';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo'
import DropdownAlert from 'react-native-dropdownalert';

const ConnectionCheck = props =>{

    const [isConnected, setIsConnected] = useState(true);

    let dropDownAlertRef = useRef();

    const netInfo = useNetInfo();

    useEffect(() => {
  
      CheckConnected();
      
    }, [netInfo]);

    const CheckConnected = async () =>{

        const response = await NetInfo.fetch();
        if (!response.isConnected){
            setIsConnected(false);
            dropDownAlertRef.alertWithType('error', 'Error de Conexión', "Se necesita una conexión a internet para utilizar la aplicación.");
        }else{
            dropDownAlertRef.closeAction();
            setIsConnected(true);
        }
      }

    return (
        <View>
            <DropdownAlert
                closeInterval={-1}
                updateStatusBar={false}
                ref={(ref) => {
                if (ref) {
                    dropDownAlertRef = ref;
                }
                }}
            />
        </View>
    );
};

export default ConnectionCheck;