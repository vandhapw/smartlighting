import axios from "axios";
import { err } from "react-native-svg/lib/typescript/xml";

// const BACKEND_URL = 'https://data.mongodb-api.com/app/data-uwehr/endpoint/data/v1'

// BACKEND_URL = "https://klaen-11d13-default-rtdb.firebaseio.com";
// BACKEND_URL = "https://vpw.my.id/microcontroller/sendAQI.php"
const LAB_URL = "http://203.247.166.29:8000/lighting";

export const storingLighting = async (expenseData) => {
    // console.log("expnse", "("+expenseData.coordinate.latitude+","+expenseData.coordinate.longitude+")")
   
    const options = {
      method: "POST",
      headers: {'Content-Type': 'application/json','Accept' : 'application/json, text/plain, */*',},
      body:JSON.stringify({
        "device_id":expenseData.device_id, 
                "lightingValue":expenseData.lightingPicked.lux,
                "lightingLevel":expenseData.lightingPicked.level, 
                "coordinate":"("+expenseData.coordinate.latitude+","+expenseData.coordinate.longitude+")",
                "room" : expenseData.room,
                "numberPeople": expenseData.numberPeople,
                "datetime": expenseData.datetime,
                "timestamps": expenseData.timestamps,
                "saveCategory": expenseData.categoryPicked,
                "ambientLight": expenseData.ambientLight,
                "type": expenseData.type
      })
    };
    await fetch('https://vpw.my.id/lighting/lightingProcess.php', options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
    .catch(err => {
      console.log(err) 
      return err
    })
  };

  export const getLightingData = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        'https://vpw.my.id/lighting/lighting.json'
      );
      const json = await response.json();
      // console.log("tes",json)
        return json;
    } catch (error) {
      console.error(error);
    }
  };

  export const updateLightingData = async (dataToUpdate) => {
    console.log('data ', dataToUpdate);
  
    try {
      const response = await axios.put('http://192.168.0.5/api/VXnc7gZfhJuFFlACeZ369x5M68DAB7iluLidfvnf/lights/1/state', dataToUpdate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data);
      return response.data;
  
    } catch (error) {
      console.error("errornya disini ", error);
      // Axios provides a response object in the error which can give more info about the error, you can access it via error.response
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error', error.message);
      }
    }
  };

  export const getRegisterLight = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        `${LAB_URL}/api/lighting/status-bulb/`
      // 'http://203.247.166.29:8000/api/lighting/status-bulb/'
      );
      
      const json = await response.json();
      // console.log(json)
        return json;
    } catch (error) {
      console.error(error);
      return error
    }
  };

  export const hueStoringAPI = async (id, data) => {
    console.log('id' , data)
    try {
      const response = await fetch(
        `https://api.meethue.com/bridge/7MqcyyevIXdniREZAVRhnNknxIimdDWhEQ11lIjo/lights/${id}/state`, {
          headers: {
            'Authorization': 'Bearer Ic57K9GZ4MjoyhAVLEZtWt4gGPiK',
            'Content-Type': 'application/json'
          },
          method:'PUT',
          body: JSON.stringify(data)
        }
      );
      const json = await response.json();
        return json;
    } catch (error) {
      console.error(error);
    }
  };

  export const hueBackend = async (data) => {
    // console.log('a')
    try {
      const response = await fetch(
        `${LAB_URL}/api/lighting/storeLighting/`, {
          method:'POST',
          body: JSON.stringify(data)
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  export const getLightingLog = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        `${LAB_URL}/api/lighting/get-lighting-log/`);
      const json = await response.json();
      // console.log('json ',json)
        return json;
    } catch (error) {
      console.error(error);
    }
  };

  export const getEnergyConsumption = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        `${LAB_URL}/api/lighting/energy-consumption/`);
      const json = await response.json();
      // console.log('json ',json)
        return json;
    } catch (error) {
      console.error(error);
    }
  };

  export const getLogHistory = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        `${LAB_URL}/api/lighting/history-log/`);
      const json = await response.json();
      // console.log('json ',json)
        return json;
    } catch (error) {
      console.error(error);
    }
  };


  // article
  
  export const API_KEY = 'ab695d0072a34175bb963db7e5bddaef';
  export const endpoint= 'https://newsapi.org/v2/top-headlines';
  export const country= 'in';
  export async function articles(category = 'general'){
    let articles = await fetch(`${endpoint}?country=${country}&apiKey=${API_KEY}`
    );

    let result = await articles.json();
    articles = null;

    return result.articles;
}


  // lighting
  
  export const HOST = 'https://192.168.0.5/api/';
  export const permission_id= 'VXnc7gZfhJuFFlACeZ369x5M68DAB7iluLidfvnf';









