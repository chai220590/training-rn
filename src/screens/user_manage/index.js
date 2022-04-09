import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';

const UserManageScreen = () => {
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios.get({
      url: 'https://thaoquan.herokuapp.com/api/user',
    });
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(error => {
    //   console.log('fetch data fail');
    // });
  };
  return (
    <View>
      <Text>UserManageScreen</Text>
    </View>
  );
};

export default UserManageScreen;
