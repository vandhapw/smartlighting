import { createContext, useEffect, useState } from 'react';

import Toast  from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import { menuBackend } from './MenuBackend';
// import { Alert, AsyncStorageStatic } from 'react-native';


export const AuthProcess = createContext({
  token: '',
  tempData: '',
  isAuthenticated: false,
  authenticate: (isStatus) => {},
  register: (tempData) => {},
  logout: () => {
    // const navigation = useNavigation();
    // navigation.reset({
    //   index:0,
    //   routes:[{name:'LoginScreen'}],
    // })
  },
  
});
 

function AuthenticationProcess({ children }) {
  const [authToken, setAuthToken] = useState({});
  const [isStatus, setStatus] = useState();
  const [listMenu, setMenu] = useState();
   // const [authTempData, setAuthTempData] = useState();

  // const [status, setStatus] = useState();

  useEffect(() => {
    // async function fetchToken(){
    // const storedToken = await AsyncStorage.getItem('token');  
    // if(storedToken){
    //   setAuthToken(storedToken); // auto login
    //   // console.log('tokennya ',storedToken)
    // }
    // getMenuBackend()
    // }

    // fetchToken();
  }, [])

  const getMenuBackend = async () => {
    await menuBackend()
    .then((val) => {
      // console.log(val)
      setMenu(val)
      // return val
    })
    .catch((err) => console.log(err))
  }
    

  function authenticate(token) {
    if(token.authID == '1'){// 1 for Login - 2 fro Register 
        if(token.message.message === 'success!'){
          Toast.show({
            type:'success',
            position:'bottom',
            text1: 'Success!',
            text2: token.message,
            visibilityTime: 2000
          })
          setAuthToken(token);
          setStatus(true)
        }else {
          Toast.show({
            type:'error',
            position:'bottom',
            text1: 'Error!',
            text2: token.message.message,
            visibilityTime: 2000
          })
          setStatus(false)
        }
    }
  }

  function logout(navigation) {
    setAuthToken(null);
    setStatus(false);
  }

  const value = {
    token: authToken,
    // tempData: authTempData,
    status: isStatus,
    isAuthenticated: isStatus,
    // menu: listMenu, 
    authenticate: authenticate,
    logout: logout,
  };

  
  // console.log('value ', value)

  return (
    <>
    <AuthProcess.Provider value={value}>{children}</AuthProcess.Provider>
    <Toast />
    </>

  )
}

export default AuthenticationProcess;
