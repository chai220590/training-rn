import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    //get user id
    AsyncStorage.getItem('Id').then(result => {
      setUserId(result);
    });
    //get username
    AsyncStorage.getItem('Username').then(result => {
      setUsername(result);
    });
    //get user role
    AsyncStorage.getItem('Role').then(result => {
      setUserRole(result);
    });
  }, []);

  const onLogout = () => {
    //clear cache
    AsyncStorage.clear();
    //redirect to login screen
    navigation.replace('Login');
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <View>
        <Text>userId: {userId}</Text>
      </View>
      <View>
        <Text>username: {username}</Text>
      </View>
      <View>
        <Text>userRole: {userRole}</Text>
      </View>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={onLogout}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
