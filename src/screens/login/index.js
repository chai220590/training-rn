import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import SysModal from '../../components/sys_modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SysGlobalLoading from '../../components/sys_global';

const LoginScreen = () => {
  const navigation = useNavigation();

  //handle when user input username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // handle on hide modal
  const onHideModal = () => {
    setShowModal(false);
  };

  const onChangedUsername = value => {
    setUsername(value);
  };

  const onChangedPassword = value => {
    setPassword(value);
  };

  //handle when user click Login button
  const onClickLogin = () => {
    //validate

    if (username.length == 0 || password.length == 0) {
      setErrorMessage('Please input login information.');
      setShowModal(true);
      return;
    }
    try {
      setIsLoading(true);
      //call api
      axios({
        url: 'https://thaoquan.herokuapp.com/api/user/login',
        method: 'POST',
        data: {
          username: username,
          password: password,
        },
      })
        .then(result => {
          const currentUser = result.data.data.user;
          //save information to storage
          AsyncStorage.setItem('Username', currentUser.username);
          AsyncStorage.setItem('Id', currentUser._id);
          AsyncStorage.setItem('Role', currentUser.role);
          //redirect to Home Screen
          navigation.navigate('Home');
        })
        .catch(error => {
          setErrorMessage(error.response.data.error);
          setShowModal(true);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#2E86C1',
        flex: 1,
      }}>
      <SysGlobalLoading visible={isLoading} />
      <SysModal
        visible={showModal}
        message={errorMessage}
        onHide={onHideModal}
      />
      <View
        style={{
          backgroundColor: 'white',
          margin: 10,
          flex: 1,
          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginVertical: 20,
          }}>
          {/* header */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Login
            </Text>
          </View>

          {/* body */}
          <View
            style={{
              flex: 6,
            }}>
            <View
              style={{
                margin: 30,
              }}>
              {/* username */}
              <View
                style={{
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Username
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Icon name="user" size={15} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <TextInput
                      value={username}
                      onChangeText={onChangedUsername}
                      placeholder={'Type your username'}
                    />
                  </View>
                </View>
              </View>

              {/* password */}
              <View>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Password
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Icon name="lock" size={15} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <TextInput
                      secureTextEntry={true}
                      placeholder={'Type your password'}
                      value={password}
                      onChangeText={onChangedPassword}
                    />
                  </View>
                </View>
              </View>

              {/* forgot password */}
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Forgot password?
                </Text>
              </View>

              {/* login button */}
              <View
                style={{
                  marginVertical: 20,
                }}>
                <TouchableOpacity activeOpacity={0.5} onPress={onClickLogin}>
                  <LinearGradient
                    style={{
                      padding: 10,
                      borderRadius: 50,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={['#AED6F1', '#3498DB', '#2E86C1']}
                    useAngle={true}
                    angle={45}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      LOGIN
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Or Sign Up Using</Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                {/* fb */}
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    padding: 10,
                    backgroundColor: '#3b5998',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <Icon name="facebook-f" size={15} color={'white'} />
                </TouchableOpacity>
                {/* tw */}
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    padding: 10,
                    backgroundColor: '#1dcaff',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <Icon name="twitter" size={15} color={'white'} />
                </TouchableOpacity>
                {/* gg */}
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 35,
                    padding: 10,
                    backgroundColor: '#EA4335',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <Icon name="google" size={15} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* footer */}
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Or Sign Up Using</Text>

            {/* button sign up */}
            <TouchableOpacity
              style={{
                padding: 20,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;
