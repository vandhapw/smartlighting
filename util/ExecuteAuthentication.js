import axios from 'axios';
// const API_KEY = 'AIzaSyDCYasArcOwcALFhIj2szug5aD2PgUQu1E'
const BASE_URL = "http://139.150.73.211:8000/";
const LAB_URL = "http://203.247.166.29:8000/lighting/api/lighting/register/"
const SERVER_URL = "http://lightbusanko.com/lighting/"

// function 
export async function createUser(data) {
  const response = await axios.post(LAB_URL,{
    email: data.email,
    username: data.username,
    password: data.password,
    client_id: data.client_id,
    client_secret: data.client_secret,
    app_id: data.app_id,
    device_id:data.device_id,
    device_name:data.device_name,
    registration_type:data.registration_type
  }
  );
  // console.log(response.data);
  const tempData = {
   message : "Congratulations, your data has been registered. Please Continue to Login!!",
   status : response.data,
   prosess: 'register',
   authID: '2'
  };

  return tempData;
  // console.log(tempData)
}

export async function AuthLogin(userId, userPw) {
    //  await axios.get(BASE_URL+'/account/login/api',
    // await axios.get(`http://139.150.73.211:8000/account/logins/api?username=${userId}&password=${userPw}`)
    try {
      const options = {
        Headers: {'Content-Type' : 'application/json', 'Accept': 'application/json, text/plain, */*'},
      }
      const body = {
          "username": userId,
          "password": userPw
      }
      const response = await axios.post(`${SERVER_URL}api/lighting/klaen-login/`,body,options)
      let token = {
              message: response.data,
              username: userId,
              authID: '1'
        }
    return token;
    } catch (error) {
      // console.error(error);
      return error
      
    }
 }

 export async function sendToken(token) {
  try {
    const options = {
      Headers: {'Content-Type' : 'application/json', 'Accept': 'application/json, text/plain, */*'},
    }
    const body = {
        "token": token,
    }
    const response = await axios.post(`http://203.247.166.29:8000/api/lighting/fetch-token/`,body,options)
    
  return response;
  } catch (error) {
    // console.error(error);
    return error
    
  }
}
    
  
  
