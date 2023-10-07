import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';

const LightLevel = ({data}) => {

    const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat } = data;
    
    const styles = getStyles();
    const [bulbColor, setBulbColor] = useState(hexColor); // Default color
    const [color, setColor] = useState('#ffffff');
    const [isLight1On, setIsLight1On] = useState(false);
    const [isLight2On, setIsLight2On] = useState(false);
    const [isLight3On, setIsLight3On] = useState(false);
    const [svgContent, setSvgContent] = useState(null);
   
    const [bgColor1, setbgColor1] = useState(false)
    const [bgColor2, setbgColor2] = useState(false)
    const [bgColor3, setbgColor3] = useState(false)

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

    return (
    <View style={[styles.energyContainer,{marginTop:200}]}>
       <TouchableOpacity onPress={handleToggleLight1}>
       <View style={[styles.energyCard, { backgroundColor: bgColor1 ? '#0D8549' : '#EEE2DE' }]}>
         <Text style={[styles.energyTitle, { color: bgColor1 ? '#ffffff' : '#000000'}]}>Level 1</Text>
          <Text style={[styles.energyValue,{ color: bgColor1 ? '#ffffff' : '#000000'}]}>Below 3200 K</Text>        
          <Text style={[{ color: bgColor1 ? '#ffffff' : '#000000'}]}>{isLight1On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleLight2}>
        <View style={[styles.energyCard, { backgroundColor: bgColor2 ? '#0D8549' : '#EEE2DE' }]}> 
        <Text style={[styles.energyTitle,{ color: bgColor2 ? '#ffffff' : '#000000'}]}>Level 2</Text>
          <Text style={[styles.energyValue,{ color: bgColor2 ? '#ffffff' : '#000000'}]}> 3200 - 4000 K</Text>         
          <Text style={[{ color: bgColor2 ? '#ffffff' : '#000000'}]}>{isLight2On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleLight3}>
        <View style={[styles.energyCard,{ backgroundColor: bgColor3 ? '#0D8549' : '#EEE2DE' }]}> 
        <Text style={[styles.energyTitle,{ color: bgColor3 ? '#ffffff' : '#000000'}]}>Level 3</Text>
          <Text style={[styles.energyValue,{ color: bgColor3 ? '#ffffff' : '#000000'}]}>Above 4000 K</Text>         
          <Text style={[{ color: bgColor3 ? '#ffffff' : '#000000'}]}>{isLight3On ? 'OFF' : 'ON'}</Text>
        </View>
        </TouchableOpacity>
        
        {/* Add another energy card here */}
      </View>
    )
}

const getStyles = ()  => StyleSheet.create({
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
  
  });

export default LightLevel;