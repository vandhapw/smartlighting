import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import { SvgXml, Svg, Path } from 'react-native-svg';
import { hueStoringAPI, hueBackend } from '../../util/getPost';




const BulbRoom = ({route}) => {
  const [brightness, setBrightness] = useState(127);
  const [saturation, setSaturation] = useState(127);
  const [color, setColor] = useState('#ffffff');
  const [isLight1On, setIsLight1On] = useState(false);
  const [isLight2On, setIsLight2On] = useState(false);
  const [isLight3On, setIsLight3On] = useState(false);
  const [svgContent, setSvgContent] = useState(null);
 
  const [bgColor1, setbgColor1] = useState(false)
  const [bgColor2, setbgColor2] = useState(false)
  const [bgColor3, setbgColor3] = useState(false)

  const [hue, setHue] = useState(0);

  const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat } = route.params;

  const styles = getStyles(bgColor1);

  console.log(route.params)

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleToggleLight1 = () => {
    setIsLight1On(!isLight1On);    
  if (!isLight1On) {
    setIsLight2On(false);
    setIsLight3On(false);
  }
  };
  const handleToggleLight2 = () => {
    setIsLight2On(!isLight2On);
    if (!isLight2On) {
      setIsLight1On(false);
      setIsLight3On(false);
    }
  };
  const handleToggleLight3 = () => {
    setIsLight3On(!isLight3On);
    if (!isLight3On) {
      setIsLight1On(false);
      setIsLight2On(false);
    }
  };

  const saveButton = () => {
    id = lightid
    dataHue = {
      "hue" : 40030,
       "sat" : 123,
       "bri" : 100,
       "on" : false
    }

    dataBackend = {
      "username":"pknu",
      "lightHue" : 40030,
       "lightSat" : 123,
       "lightBri" : 100,
       "lightCT" : 123,
       "lightStatus" : false,
       "lightId" : "6",
       "roomName" : "kitchen",
       "switchMode":"manual",
       "deviceTemp":20.10,
       "lightLuminance":20.01,
       "motion":"motion"
    }

    hueStoringAPI(id, dataHue)
    .then((response)=> {
       console.log('response hue API ',response)
    })
    
    hueBackend(dataBackend)
    .then((res) => {
      console.log('response backend', res.message)
    } )
  };

  function hsvToRgb(h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
    
    // Ensure our arguments are in the expected range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    
    // Convert s and v to a scale of 0-1
    s /= 100;
    v /= 100;
    
    i = Math.floor(h / 60);
    f = h / 60 - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:
            r = v;
            g = p;
            b = q;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}


const { r, g, b } = hsvToRgb(lightHue, lightSat, lightBri);
const hexColor = rgbToHex(r, g, b);

const [bulbColor, setBulbColor] = useState(hexColor); // Default color
// console.log(hexColor)



  const customSvg = (bulbColor) => `
  <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" style="enable-background:new" viewBox="0 0 504.84 290.53" version="1.0">
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

  useEffect(() => {
    setBulbColor(color);

    switch(true){
      case lightCT < 3200:
        setIsLight1On(true)
        setbgColor1(true)
        setbgColor2(false)
        setbgColor3(false)
        break;
      case lightCT >= 3200 && lightCT <= 4000:
        setIsLight2On(true)
        setbgColor2(true)
        setbgColor1(false)
        setbgColor3(false)
        break;
      case lightCT > 4000:
        setIsLight3On(true)
        setbgColor3(true)
        setbgColor1(false)
        setbgColor2(false)
        break
      default:
        setIsLight1On(false);
        setIsLight2On(false);
        setIsLight3On(false);
        setbgColor1(false);
        setbgColor2(false);
        setbgColor3(false);
    }

    console.log(isLight1On,isLight2On,isLight3On,bgColor1,bgColor2,bgColor3)
  }, [color]);

  const rgb = hsvToRgb(hue);

    // Calculate the bulb color anytime hue, saturation, or brightness changes
    useEffect(() => {
      const { r, g, b } = hsvToRgb(hue, saturation * 100, brightness * 100);
      setBulbColor(rgbToHex(r, g, b));
    }, [hue, saturation, brightness]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Bulb</Text> */}
      </View>
      <View style={styles.bulbContainer}>
        {/* <View style={[styles.bulb, { backgroundColor: color, opacity: brightness, position:'absolute' }]} /> */}
       <View style={{marginBottom:50}}>
        <SvgXml
          xml={customSvg(bulbColor)}
          width="450"
          height="500"
      />
      </View>
      

      <View style={[styles.energyCard,{marginTop:-50}]}>
        <TouchableOpacity onPress={() => saveButton()}> 
          <Text>Save Button</Text>
        </TouchableOpacity>
      </View>

      </View>
      <View style={styles.energyCard}>
        <Text style={styles.energyTitle}>Current State</Text>
        <Text style={styles.energyValue}>Room Name : {roomName}</Text>
        <Text style={styles.energyValue}>Color Temperature : {lightCT}</Text>
      </View>
      <View style={[styles.energyContainer,{marginTop:200}]}>
       <TouchableOpacity onPress={handleToggleLight1}>
       <View style={[styles.energyCard, { backgroundColor: bgColor1 ? '#0D8549' : '#EEE2DE' }]}>
         <Text style={[styles.energyTitle, { color: bgColor1 ? '#ffffff' : '#000000'}]}>Level 1</Text>
          <Text style={[styles.energyValue,{ color: bgColor1 ? '#ffffff' : '#000000'}]}>Below 3200 K</Text>        
          <Text style={[styles.lightButton,{ color: bgColor1 ? '#ffffff' : '#000000'}]}>{isLight1On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleLight2}>
        <View style={[styles.energyCard, { backgroundColor: bgColor2 ? '#0D8549' : '#EEE2DE' }]}> 
        <Text style={[styles.energyTitle,{ color: bgColor2 ? '#ffffff' : '#000000'}]}>Level 2</Text>
          <Text style={[styles.energyValue,{ color: bgColor2 ? '#ffffff' : '#000000'}]}> 3200 - 4000 K</Text>         
          <Text style={[styles.lightButton,{ color: bgColor2 ? '#ffffff' : '#000000'}]}>{isLight2On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleLight3}>
        <View style={[styles.energyCard,{ backgroundColor: bgColor3 ? '#0D8549' : '#EEE2DE' }]}> 
        <Text style={[styles.energyTitle,{ color: bgColor3 ? '#ffffff' : '#000000'}]}>Level 3</Text>
          <Text style={[styles.energyValue,{ color: bgColor3 ? '#ffffff' : '#000000'}]}>Above 4000 K</Text>         
          <Text style={[styles.lightButton,{ color: bgColor3 ? '#ffffff' : '#000000'}]}>{isLight3On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>
        
        {/* Add another energy card here */}
      </View>
      <View style={styles.controls}>
      <Text style={{ marginTop: 20 }}>Hue</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={65535 }
        value={hue}
        onValueChange={setHue}
      />

      <Text style={{ marginTop: 20 }}>Saturation</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={254}
        value={saturation}
        onValueChange={setSaturation}
      />

      <Text style={{ marginTop: 20 }}>Brightness</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={254}
        value={brightness}
        onValueChange={setBrightness}
      />

      
        <View style={styles.colorButtons}>
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
        </View>
      </View>
      <View style={styles.footer}>
        {/* Footer icons here */}
      </View>
    </View>
  );
};

const getStyles = ()  => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#900C3F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff',
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
  },
  bulbContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulb: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 380,
    flexDirection:'row',
    position:'absolute',
  },
  energyCard: {
    backgroundColor:'#EEE2DE',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5
    // position:'absolute'
  },
  energyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  energyValue: {
    fontSize: 14,
  },

  verticalSliderContainer: {
    height: 200, // Set the height of the vertical slider container
    justifyContent: 'center',
  },
  verticalSlider: {
    height: 160, // Set the height of the vertical slider
    width: 20, // Set the width of the vertical slider
    backgroundColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderThumb: {
    width: 30, // Set the width of the slider thumb
    height: 10, // Set the height of the slider thumb
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },

  colorPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

});

export default BulbRoom;