import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

const SysGlobalLoading = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(00,00,00,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 100,
            height: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={'#2E86C1'} size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default SysGlobalLoading;
