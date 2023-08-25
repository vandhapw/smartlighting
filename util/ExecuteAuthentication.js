import axios from 'axios';
// const API_KEY = 'AIzaSyDCYasArcOwcALFhIj2szug5aD2PgUQu1E'
const BASE_URL = "http://139.150.73.211:8000/";
const LAB_URL = "http://203.247.166.29:8000/api/lighting/register/"

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
      const response = await axios.get(`http://139.150.73.211:8000/account/login/api?username=${userId}&password=${userPw}`)
      // const json = await response.json();
      let token = {
              message: response.data,
              username: userId,
              authID: '1'
            }
      // console.log(token)
   
    return token;
    } catch (error) {
      console.error(error);
    }
 }
    
  
  
