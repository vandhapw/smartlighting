import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { SvgXml, Svg, Path } from 'react-native-svg';
import LevelOption from './LevelOption';
import { AuthProcess } from '../../../util/AuthenticationProcess';
import { hueBackend } from '../../../util/getPost';
import Toast from 'react-native-toast-message';

const LightAnimation = ({data, navigation}) => {

    let { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat, status, location, device } = data;
    
    
    const styles = getStyles();
    const [color, setColor] = useState('#ffffff');
    const [brightness, setBrightness] = useState(lightBri);
    const [saturation, setSaturation] = useState(lightSat);
    const [hue, setHue] = useState(lightHue);
    const authCtx = useContext(AuthProcess)
   
    function initialBulbCondition(hue, sat,bri){
        let hsbHue =  Math.floor((hue / 65535) * 360)
        let hsbSat = Math.floor((sat / 255) * 100);
        let hsbBri = Math.floor((bri / 255) * 100); 

        setHue(hsbHue)
        setSaturation(hsbSat)
        setBrightness(hsbBri)

        return hsbHue, hsbSat, hsbBri
    }

    function changeBrightness(newvalue){
      data.status = 2
      setBrightness(newvalue)
      // console.log(status)
    }
    function changeSaturation(newvalue){
      data.status = 1
      setSaturation(newvalue)
      // console.log(status)
    }
    function changeHue(newvalue){
      data.status = 1
      setHue(newvalue)
      // console.log(status)
    }

    const dataValue = {
      lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat, status, location, device, brightness }
    

    function hsvToRgb(h, s, v) {
      // Ensure our arguments are in the expected range
      h = (h * 360) / 65535;
       // Convert s and v from 0-100 to 0-255
      s = Math.round((s * 255) / 100);
      v = Math.round((v * 255) / 100);

      h = Math.max(0, Math.min(360, h));
      s = Math.max(0, Math.min(255, s));
      v = Math.max(0, Math.min(255, v));

       // Convert s and v to a scale of 0-1
      s /= 255;
      v /= 255;      
  
      let C = v * s;
      let X = C * (1 - Math.abs((h / 60) % 2 - 1));
      let m = v - C;
      let r_prime, g_prime, b_prime;
  
      let i = Math.floor(h / 60);
  
      switch (i) {
          case 0: [r_prime, g_prime, b_prime] = [C, X, 0]; break;
          case 1: [r_prime, g_prime, b_prime] = [X, C, 0]; break;
          case 2: [r_prime, g_prime, b_prime] = [0, C, X]; break;
          case 3: [r_prime, g_prime, b_prime] = [0, X, C]; break;
          case 4: [r_prime, g_prime, b_prime] = [X, 0, C]; break;
          case 5: [r_prime, g_prime, b_prime] = [C, 0, X]; break;
      }
  
      return {
          r: Math.round((r_prime + m) * 255),
          g: Math.round((g_prime + m) * 255),
          b: Math.round((b_prime + m) * 255)
      };
  }

  function hslToRgb(h, s, l) {
    // Ensure hue is within the range 0-360
    h = h % 360;
    if (h < 0) {
        h += 360;
    }

    // Convert s and l to a scale of 0-1
    s = s / 255;
    l = l / 255;

    let C = (1 - Math.abs(2 * l - 1)) * s;
    let X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - C / 2;
    let r_prime, g_prime, b_prime;

    if (h >= 0 && h < 60) {
        [r_prime, g_prime, b_prime] = [C, X, 0];
    } else if (h >= 60 && h < 120) {
        [r_prime, g_prime, b_prime] = [X, C, 0];
    } else if (h >= 120 && h < 180) {
        [r_prime, g_prime, b_prime] = [0, C, X];
    } else if (h >= 180 && h < 240) {
        [r_prime, g_prime, b_prime] = [0, X, C];
    } else if (h >= 240 && h < 300) {
        [r_prime, g_prime, b_prime] = [X, 0, C];
    } else {
        [r_prime, g_prime, b_prime] = [C, 0, X];
    }

    return {
        r: Math.round((r_prime + m) * 255),
        g: Math.round((g_prime + m) * 255),
        b: Math.round((b_prime + m) * 255)
    };
}
  
  

  //   function hsvToRgb(h, s, v) {
  //     let r, g, b;
  //     let i;
  //     let f, p, q, t;
      
  //     // Ensure our arguments are in the expected range
  //     h = Math.max(0, Math.min(65535, h));
  //     s = Math.max(0, Math.min(100, s));
  //     v = Math.max(0, Math.min(100, v));
      
  //     // Convert h to a scale of 0-360
  //     h = (h / 65535) * 360;
      
  //     // Convert s and v to a scale of 0-1
  //     s /= 100;
  //     v /= 100;
      
  //     i = Math.floor(h / 60);
  //     f = h / 60 - i;
  //     p = v * (1 - s);
  //     q = v * (1 - s * f);
  //     t = v * (1 - s * (1 - f));
  
  //     switch (i) {
  //         case 0:
  //             r = v;
  //             g = t;
  //             b = p;
  //             break;
  //         case 1:
  //             r = q;
  //             g = v;
  //             b = p;
  //             break;
  //         case 2:
  //             r = p;
  //             g = v;
  //             b = t;
  //             break;
  //         case 3:
  //             r = p;
  //             g = q;
  //             b = v;
  //             break;
  //         case 4:
  //             r = t;
  //             g = p;
  //             b = v;
  //             break;
  //         default:
  //             r = v;
  //             g = p;
  //             b = q;
  //     }
  
  //     return {
  //         r: Math.round(r * 255),
  //         g: Math.round(g * 255),
  //         b: Math.round(b * 255)
  //     };
  // }

  function hueToRgb(h) {
    let r, g, b;
    
    // Ensure the hue value is within the wrapping range of 0 to 65535
    h = h % 65536;
    if (h < 0) {
        h += 65536;
    }
    
    // Calculate color based on wrapping regions
    if (h >= 0 && h < 25500) {
        // Red to Green region
        r = 255;
        g = Math.round((h / 25500) * 255);
        b = 0;
    } else if (h >= 25500 && h < 46920) {
        // Green to Blue region
        r = Math.round(((46920 - h) / (46920 - 25500)) * 255);
        g = 255;
        b = Math.round(((h - 25500) / (46920 - 25500)) * 255);
    } else {
        // Blue to Red region
        r = Math.round(((h - 46920) / (65536 - 46920)) * 255);
        g = 0;
        b = 255;
    }
    
    return { r, g, b };
}

function hsbToRgb(hue, saturation, brightness) {
  // Convert hue from 0-65535 to 0-360
  hue = (hue * 360) / 65535;
  // Convert saturation and brightness from 0-255 to 0-1
  saturation = saturation / 255;
  brightness = brightness / 255;

  let C = brightness * saturation;
  let X = C * (1 - Math.abs(((hue / 60) % 2) - 1));
  let m = brightness - C;
  let r_prime, g_prime, b_prime;

  if (hue >= 0 && hue < 60) {
      [r_prime, g_prime, b_prime] = [C, X, 0];
  } else if (hue >= 60 && hue < 120) {
      [r_prime, g_prime, b_prime] = [X, C, 0];
  } else if (hue >= 120 && hue < 180) {
      [r_prime, g_prime, b_prime] = [0, C, X];
  } else if (hue >= 180 && hue < 240) {
      [r_prime, g_prime, b_prime] = [0, X, C];
  } else if (hue >= 240 && hue < 300) {
      [r_prime, g_prime, b_prime] = [X, 0, C];
  } else {
      [r_prime, g_prime, b_prime] = [C, 0, X];
  }

  return {
      r: Math.round((r_prime + m) * 255),
      g: Math.round((g_prime + m) * 255),
      b: Math.round((b_prime + m) * 255)
  };
}
  
  function rgbToHex(r, g, b) {
    // return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    return "#" + ((1 << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)).toString(16).slice(1).toUpperCase();
  }  
  
  // const { r, g, b } = hsvToRgb(hue, saturation, brightness);
  const { r, g, b } = hsbToRgb(hue, saturation, brightness);
  const hexColor = rgbToHex(r, g, b);
  
  const [bulbColor, setBulbColor] = useState(hexColor); // Default color
  console.log('bulb', bulbColor)
  
  // useEffect(() => {
  //   setBulbColor(color);

  //   switch(true){
  //     case lightCT < 3200:
  //       setIsLight1On(true)
  //       setbgColor1(true)
  //       setbgColor2(false)
  //       setbgColor3(false)
  //       break;
  //     case lightCT >= 3200 && lightCT <= 4000:
  //       setIsLight2On(true)
  //       setbgColor2(true)
  //       setbgColor1(false)
  //       setbgColor3(false)
  //       break;
  //     case lightCT > 4000:
  //       setIsLight3On(true)
  //       setbgColor3(true)
  //       setbgColor1(false)
  //       setbgColor2(false)
  //       break
  //     default:
  //       setIsLight1On(false);
  //       setIsLight2On(false);
  //       setIsLight3On(false);
  //       setbgColor1(false);
  //       setbgColor2(false);
  //       setbgColor3(false);
  //   }

  //   console.log(isLight1On,isLight2On,isLight3On,bgColor1,bgColor2,bgColor3)
  // }, [color]);

   // Calculate the bulb color anytime hue, saturation, or brightness changes
   useEffect(() => {
   
    if(status == 0){
    let newLightHue,newLightSat,newLightBri =  initialBulbCondition(lightHue, lightSat, lightBri)
    console.log('initial bri value ', newLightBri)
    lightBri = newLightBri
    }else if(status == 2) {
      // setHue(hue)
      // setSaturation(saturation)
      changeBrightness(lightBri)
      console.log('bri value ', lightBri)
    }
    
    // else if (status == 1){
    //   console.log(brightness)
    //   setBrightness(brightness)
    // }
    console.log('hue ', hue, 'saturation ', saturation, 'brightness ', brightness)

    const { r, g, b } = hsvToRgb(hue * (65535 / 360), saturation, brightness);
    console.log(r,g,b)

    setBulbColor(rgbToHex(r, g, b));

    console.log('bulbs', bulbColor)

  }, [brightness, saturation, hue, status,data]);

  const saveButton = () => {
    id = lightid
    dataHue = {
      "hue" : hue * (65535 / 360),
       "sat" : saturation,
       "bri" : brightness,
       "on" : true
    }

    dataBackend = {
      "username":authCtx.token.username,
      "lightHue" : Math.round(hue * (65535 / 360)),
       "lightSat" : Math.round((saturation / 100) * 255),
       "lightBri" : Math.round((brightness / 100) * 255),
       "lightCT" : lightCT,
       "lightStatus" : true,
       "lightId" : lightid,
       "roomName" : roomName,
       "switchMode":"apps-level",
       "deviceTemp":null,
       "lightLuminance":null,
       "motion":null,
       "location": location,
       "device": device
    }

    hueBackend(dataBackend)
    .then((res) => {
      console.log('response backend', res.message)
      Toast.show({
        type:'success',
        position: 'middle',
        text1: `Light of ${dataBackend.roomName}`,
        text2: 'Has been Changed Successfully',
        visibilityTime: 2000
      })
      return;
    } )
  }

  const turnOFF = () => {
    id = lightid
  
    dataBackend = {
      "username":authCtx.token.username,
      "lightHue" : Math.round(hue * (65535 / 360)),
       "lightSat" : Math.round((saturation / 100) * 255),
       "lightBri" : Math.round((brightness / 100) * 255),
       "lightCT" : lightCT,
       "lightStatus" : false,
       "lightId" : lightid,
       "roomName" : roomName,
       "switchMode":"apps-level",
       "deviceTemp":null,
       "lightLuminance":null,
       "motion":null,
       "location": location,
       "device": device
    }

    hueBackend(dataBackend)
    .then((res) => {
      console.log('response backend', res.message)
      Toast.show({
        type:'success',
        position: 'bottom',
        text1: `Light of ${dataBackend.roomName}`,
        text2: 'has turned OFF successfully',
        visibilityTime: 2000,
      })
      return;
    } )
  }


  const customSvg = (bulbColor) => `
  <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" style="enable-background:new" viewBox="150 0 194.84 150.53" version="1.0">
  <defs id="defs4">
    <filter id="filter4881">
      <feBlend id="feBlend4883" in2="BackgroundImage" mode="multiply"/>
    </filter>
    <linearGradient id="linearGradient4890" y2="661.48" gradientUnits="userSpaceOnUse" x2="42.25" y1="672.61" x1="-36.158">
      <stop id="stop4262" stop-color="#e3dbdb" offset="0"/>
      <stop id="stop4268" stop-color="#c8b7b7" offset=".49241"/>
      <stop id="stop4264" stop-color="#e3dedb" offset="1"/>
    </linearGradient>
    <radialGradient id="radialGradient4892" gradientUnits="userSpaceOnUse" cy="562.42" cx="-15.052" gradientTransform="matrix(.33086 1.2146 -1.1751 .32011 650.84 401.34)" r="67.42">
      <stop id="stop4254" stop-color="#fff6d5" offset="0"/>
      <stop id="stop4256" stop-color="#fd5" offset="1"/>
    </radialGradient>
    <radialGradient id="radialGradient4894" gradientUnits="userSpaceOnUse" cy="640.85" cx="-28.422" gradientTransform="matrix(.163 1.9542 -1.7989 .15005 1154 575.11)" r="39.344">
      <stop id="stop4276" stop-color="#e3dbdb" stop-opacity="0" offset="0"/>
      <stop id="stop4282" stop-color="#d7cecb" stop-opacity=".43922" offset=".80281"/>
      <stop id="stop4280" stop-color="#c8b7b7" offset="1"/>
    </radialGradient>
  </defs>
  <g id="layer1" transform="translate(-350.16 -291.12)">
    <g id="g4885" transform="translate(602.05 -224.25)">
      <path id="path4244" d="m42.25 627.06c-21.657 18.45-54.196 24.75-78.688 9.6 1.494 3.41 2.376 6.15 2.376 7.96 0 23.21-0.513 51.29 34.593 51.29 35.107 0 34.594-28.08 34.594-51.29 0-3.29 2.993-9.68 7.125-17.56z" style="enable-background:accumulate" fill="url(#linearGradient4890)"/>
      <path id="path4239" d="m0.53125 515.38c-47.053 0-62.957 27.14-67.093 47.62-3.491 17.28 22.061 55.24 30.124 73.66 24.492 15.15 57.031 8.85 78.688-9.6 10.426-19.86 28.337-49.39 25.375-64.06-4.136-20.48-20.04-47.63-67.094-47.62z" style="enable-background:accumulate" fill="${bulbColor}" fill-opacity="${brightness}"/>
      <path id="path4270" filter="url(#filter4881)" d="m42.25 627.06c-21.657 18.45-54.196 24.75-78.688 9.6 1.494 3.41 2.376 6.15 2.376 7.96 0 23.21-0.513 51.29 34.593 51.29 35.107 0 34.594-28.08 34.594-51.29 0-3.29 2.993-9.68 7.125-17.56z" style="enable-background:accumulate" fill="url(#radialGradient4894)"/>
    </g>
  </g>
  <metadata>
    <rdf:RDF>
      <cc:Work>
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/"/>
        <dc:publisher>
          <cc:Agent rdf:about="http://openclipart.org/">
            <dc:title>Openclipart</dc:title>
          </cc:Agent>
        </dc:publisher>
        <dc:title>lamp3d</dc:title>
        <dc:date>2007-10-04T13:09:18</dc:date>
        <dc:description>clip art, clipart, hint, hint, icon, icon, image, lamp, lamp, media, public domain, svg, </dc:description>
        <dc:source>http://openclipart.org/detail/6628/lamp3d-by-portnov</dc:source>
        <dc:creator>
          <cc:Agent>
            <dc:title>Portnov</dc:title>
          </cc:Agent>
        </dc:creator>
        <dc:subject>
          <rdf:Bag>
            <rdf:li>clip art</rdf:li>
            <rdf:li>clipart</rdf:li>
            <rdf:li>hint</rdf:li>
            <rdf:li>icon</rdf:li>
            <rdf:li>image</rdf:li>
            <rdf:li>lamp</rdf:li>
            <rdf:li>media</rdf:li>
            <rdf:li>public domain</rdf:li>
            <rdf:li>svg</rdf:li>
          </rdf:Bag>
        </dc:subject>
      </cc:Work>
      <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/">
        <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
      </cc:License>
    </rdf:RDF>
  </metadata>
</svg>
`;




return (
  <>
  <View style={styles.bulbContainer}>
  {/* <View style={[styles.bulb, { backgroundColor: color, opacity: brightness, position:'absolute' }]} /> */}
    <View style={{marginBottom:20}}>
      <SvgXml
        xml={customSvg(bulbColor)}
        width="250"
        height="350"
      />
    </View>    

  <View style={styles.controls}>
    <Text style={{}}>Hue : {hue}</Text>
    {/* <Text style={{}}>Hue </Text> */}
      <Slider
        style={{ width: 300, height: 40, color:'#482121' }}
        minimumValue={0}
        maximumValue={360}
        value={hue}
        onValueChange={(newvalue) => changeHue(newvalue) }
        step={1}
        // style={{ flex: 1 }}
      />

    <Text style={{ marginTop: 20 }}>Saturation : {saturation}</Text>
    {/* <Text style={{ marginTop: 20 }}>Saturation </Text> */}
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={saturation}
        onValueChange={(newvalue) => changeSaturation(newvalue)}
        step={1}
      />

    <Text style={{ marginTop: 20 }}>Brightness : {brightness}</Text>
    {/* <Text style={{ marginTop: 20 }}>Brightness </Text> */}
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={brightness}
        onValueChange={(newvalue) => changeBrightness(newvalue)}
        step={1}
      />
  
    {/* <View style={styles.colorButtons}>
      <TouchableOpacity onPress={() => handleColorChange('#ffffff')}>
        <View style={[styles.colorButton, { backgroundColor: '#ffffff' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#ff0000')}>
        <View style={[styles.colorButton, { backgroundColor: '#ff0000' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#ffa500')}>
        <View style={[styles.colorButton, { backgroundColor: '#ffa500' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#ffff00')}>
        <View style={[styles.colorButton, { backgroundColor: '#ffff00' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#008000')}>
        <View style={[styles.colorButton, { backgroundColor: '#008000' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#0000ff')}>
        <View style={[styles.colorButton, { backgroundColor: '#0000ff' }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleColorChange('#000000')}>
        <View style={[styles.colorButton, { backgroundColor: '#000000' }]} />
      </TouchableOpacity>
    </View> */}
    </View> 

    <View style={{flexDirection:'row'}}>
    <View style={[styles.buttonSave]}>
      <TouchableOpacity onPress={() => saveButton()}> 
        <Text>Change Bulb</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.buttonSave]}>
      <TouchableOpacity onPress={() => turnOFF()}> 
        <Text>Turn OFF</Text>
      </TouchableOpacity>
    </View>
    </View>
   
  </View>

  <LevelOption data={dataValue} navigation={navigation}/>
  </>
  )
}

const getStyles = ()  => StyleSheet.create({
    
    bulbContainer: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:'black',
    },
    
    energyCard: {
      backgroundColor:'#EEE2DE',
      // padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      margin: 5,
      position:'absolute'
    },

    buttonSave: {
      backgroundColor:'#F7F5F2',
      // padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      margin: 5,
      padding: 10
    },
   });

export default LightAnimation