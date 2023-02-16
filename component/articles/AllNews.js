// import { services } from "./services";
import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text,ScrollView, Image, SafeAreaView} from 'react-native';

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import DetailNews from "./DetailNews";

// import {  } from "react-native";

const AllNews = (props) => {
    const navigation = useNavigation();
    // useEffect(() => {
    //     services('general')
    //     .then(data => {
    //         setNewsData(data)
    //     })
    //     .catch(error => {
    //         alert(error)
    //     })
    // }, [])

    return (
        // <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]} onPress={() => navigation.navigate("DetailNews",{
        //     params: {content: props.content, urlToImage: props.urlToImage,title:props.title, author: props.author,
        //     publishedAt: props.publishedAt, id:props.source.id, name: props.source.name
        //     }
        // })}>
       <SafeAreaView>
        {/* image */}
            <Image 
                source={{
                    // uri: "https://images.unsplash.com/photo-1559080463-5c7eb3a52de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    uri: props.urlToImage
                }}
                style={styles.image}
            />

            <View style={styles.info}>

            {/* title */}
            <Text style={styles.title}>{props.title} </Text>

            {/* description  */}
            {/* <Text style={styles.description}> {props.description} </Text> */}

            <View style={styles.address}>
                <Text style={styles.title}>by: <Text style={styles.author}>{props.author}</Text></Text>
                <Text style={styles.title}>{props.publishedAt}</Text>
            </View>

            <View key={props.source.id}>
            <Text>Source: <Text style={styles.location}>{props.source.name}</Text></Text>
            </View>

            </View>

       </SafeAreaView>
    //    </Pressable>
    )
}

export default AllNews;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: 'center',
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5
        },
        backgroundColor: '#fff',
        marginTop: 20

    },
    imagess: {
        height: 200,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    // title: {
    //     fontSize: 18,
    //     fontWeight: "600",
    //     marginTop: 10
    // },
    description: {
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10,
    },
    data: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10
    },
    heading: {

    },
    author: {
        fontWeight: "bold",
        fontSize: 15
    },
    date :{
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 15
    },
    source: {
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10
    },

    item:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        // backgroundColor:
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {width: 1, height:1},
        shadowRadius:2

    },
    
    pressed:{
        opacity: 0.9,

    },

    image:{
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },

    info:{
        flex: 2,
        padding: 12
    },

    title:{
        fontWeight: 'bold',
        fontSize: 18,
        color: 'gray'
    },

    address:{
        fontSize: 18,
        color: 'gray'
    },

    location: {
        fontSize:18,
        color: 'gray'
    }

});