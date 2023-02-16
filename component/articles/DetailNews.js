import { useRoute } from "@react-navigation/native";
import {View,Text, StyleSheet, SafeAreaView, Image} from 'react-native';


const DetailNews = ({route}) => {

    const {content, title, urlToImage, author, publishedAt,name, id} = route.params.params;

    // console.log(content);

    // const route = useRoute();
    return (
        <SafeAreaView style={styles.container}>
        {/* image */}
            <Image 
                source={{
                    // uri: "https://images.unsplash.com/photo-1559080463-5c7eb3a52de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    uri: urlToImage
                }}
                style={styles.imagess}
            />

            <View style={{padding: 20}}>

            {/* title */}
            <Text style={styles.title}>{title} </Text>

            {/* description  */}
            <Text style={styles.description}> {content} </Text>

            <View style={styles.data}>
                <Text style={styles.heading}>by: <Text style={styles.author}>{author}</Text></Text>
                <Text style={styles.date}>{publishedAt}</Text>
            </View>

            <View>
            <Text style={{color: 'black'}}>Source: <Text style={styles.source}>{name}</Text></Text>
            </View>

            </View>

       </SafeAreaView>
     
    )
}

export default DetailNews;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: 'center',
        // borderRadius: 20,
        shadowOpacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5
        },
        backgroundColor: '#fff',
        marginTop: 20,
        color: 'black'

    },
    imagess: {
        height: 200,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        color: 'black'
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10,
        color: 'black'
    },
    data: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
        color: 'black'
    },
    heading: {
        color: 'black'
    },
    author: {
        fontWeight: "bold",
        fontSize: 15,
        color: 'black'
    },
    date :{
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 15,
        color: 'black'
    },
    source: {
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10
    }

});


