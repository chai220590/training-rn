import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const UserInfoScreen = () => {
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    createDate: '',
    avatar: '123',
    _id: '',
    username: '',
    role: '',
    status: '',
  });
  useEffect(() => {
    //get user id
    AsyncStorage.getItem('Id')
      .then(response => {
        console.log('User Id', response);
        //string template `hello ${varA}`
        axios
          .get(`https://thaoquan.herokuapp.com/api/user/${response}`)
          .then(responseAPI => {
            const res = responseAPI.data;
            if (res.success == true) {
              setInfo(res.data.user);
            }
          })
          .catch(error => {
            console.log(`Request API FAIL: ${error}`);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onLogout = () => {
    //clear cache
    AsyncStorage.clear();
    //redirect to login screen
    navigation.replace('Login');
  };
  return (
    <ImageBackground
      blurRadius={2}
      style={{
        flex: 1,
      }}
      source={{
        uri: info.avatar,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(46,134,193,0.2)',
        }}>
        <View
          style={{
            flex: 1,
          }}></View>
        <View
          style={{
            flex: 2,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              position: 'absolute',
              top: -50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 5,
                borderColor: 'rgba(46,134,193,0.2)',
              }}
              source={{
                uri: info.avatar,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#2E86C1',
                fontSize: 20,
              }}>
              {info.username}
            </Text>
            <Text
              style={{
                fontSize: 10,
              }}>
              {info.role}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              padding: 10,
            }}>
            {/* button area */}
            <View>
              <View
                style={{
                  backgroundColor: '#2E86C1',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Options
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="lock"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                    flex: 1,
                  }}>
                  Change password
                </Text>
                <Icon name="chevron-right" size={20} color={'#2E86C1'} />
              </View>
              <TouchableOpacity
                onPress={onLogout}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="sign-out"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                    flex: 1,
                  }}>
                  Logout
                </Text>
                <Icon name="chevron-right" size={20} color={'#2E86C1'} />
              </TouchableOpacity>
            </View>

            {/* infor area */}
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#2E86C1',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  User Information
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="user"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                  }}>
                  {info.username}
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="black-tie"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                  }}>
                  {info.role}
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="id-card"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                  }}>
                  {info._id}
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="calendar"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                  }}>
                  {moment(info.createDate).format('HH:mm:ss DD/MM/YYYY')}
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#2E86C1',
                }}>
                <Icon
                  name="flag"
                  size={20}
                  color={'black'}
                  style={{width: 30}}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    color: 'black',
                  }}>
                  {info.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserInfoScreen;
