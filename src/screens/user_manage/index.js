import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import SysModal from '../../components/sys_modal';
import SysGlobalLoading from '../../components/sys_global';
const UserManageScreen = () => {
  //initial state
  const [userList, setUserList] = useState([]);
  const [keySearch, setKeySearch] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //handle key Search changed
  const onChangedKeySearch = value => setKeySearch(value);

  //the first load app
  useEffect(() => {
    getData();
  }, []);

  //fetch data
  const getData = () => {
    try {
      setIsLoading(true);

      axios({
        url: 'https://thaoquan.herokuapp.com/api/user',
        method: 'GET',
      })
        .then(result => {
          const list = result.data.data.userList;
          setUserList(list);
          setIsLoading(false);
        })
        .catch(error => {
          console.log('fetch data fail');
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  // on Delete
  const onDelete = value => {
    try {
      setIsLoading(true);
      axios({
        method: 'DELETE',
        url: `https://thaoquan.herokuapp.com/api/user/delete/${value}`,
      })
        .then(result => {
          setMessageAlert(result.data.message);
          setShowAlert(true);

          //reload data
          getData();
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  //handle on Hide Alert
  const onHideAlert = () => setShowAlert(false);

  return (
    <View>
      <SysModal
        message={messageAlert}
        onHide={onHideAlert}
        visible={showAlert}
      />
      <SysGlobalLoading visible={isLoading} />
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E86C1',
          }}>
          User Management
        </Text>
      </View>

      {/* search bar */}
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TextInput
            style={{flex: 1, marginLeft: 10}}
            placeholder="Enter your key search"
            value={keySearch}
            onChangeText={onChangedKeySearch}
          />
          <Icon
            style={{
              padding: 10,
            }}
            size={20}
            name="search"
          />
        </View>
      </View>

      <FlatList
        refreshing={false}
        onRefresh={() => getData()}
        data={userList.filter(user => user.username.search(keySearch) > -1)}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginBottom: 10,
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                <View>
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item.avatar,
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: '#2E86C1',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}>
                    {item.username}
                  </Text>
                  <Text>{item.role}</Text>
                  <Text>
                    {moment(item.createDate).format('HH:mm:ss DD/MM/YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      onDelete(item._id);
                    }}
                    style={{
                      backgroundColor: '#CD6155',
                      borderRadius: 5,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserManageScreen;
