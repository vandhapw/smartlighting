import { View, Text, ActionSheetIOS, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from "react-native"
import { useState, useEffect } from "react"
// import {Card} from 'react-native-paper'

// import AllNews from "./articles/All"
import AllNews from "../component/articles/AllNews"
// import { arti } from "./articles/config"
import { articles, endpoint, country, API_KEY } from "../util/getPost"
import Axios from 'axios'


export default function Article() {

    const [articles, setArticles] = useState([]);
    const getNews = async () => {
        await Axios.get(`${endpoint}?country=${country}&apiKey=${API_KEY}`, {
            params: {
                category: "technology"
            }
        })
            .then((response) => {
                // console.log(response.data.articles);
                setArticles(response.data.articles);
            })
            .catch((error) => {
                console.log(error)
            })

    }


    // const url = "https://newsapi.org/v2/everything?q=tesla&from=2022-08-19&sortBy=publishedAt&apiKey=ab695d0072a34175bb963db7e5bddaef"
    // const [data, setData] = useState([]);
    // // console.log(data);
    // useEffect(() => {
    // async function getArticles(){
    //     const response = await fetch(url,{
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json'
    //         }
    //     });

    //     const data = await response.json();
    //     setData = (data.results);
    // }

    // getArticles();
    // const getArticles = () => {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then((json) => setData(json))
    //         .catch((err) => console.log(err))
    // }

    useEffect(() => {
        getNews();
    }, []);

    // const getArticles = async () => {
    //     try {
    //         const res = await ActionSheetIOS.get(url)
    //     }
    // }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <AllNews
                        content = {item.content}
                        urlToImage={item.urlToImage}
                        title={item.title}
                        description={item.description}
                        author={item.author}
                        publisedAt={item.publisedAt}
                        source={item.source}
                    />
                )
                }

            />

        </SafeAreaView>

        // <View>
        //     <Text>asd</Text>
        // </View>
        // <>
        // {
        //     Object.keys(data).length > 0 && (
        //         <ScrollView>
        //             <View style={styles.container}>
        //                 {
        //                     data.articles.map((article,index) => (
        //                         <Card key={index}>
        //                             <View style={styles.viewCard}>
        //                                 <Text style={styles.articleText}>{article.title}</Text>
        //                                 <TouchableOpacity>
        //                                     <Image source={{uri:article.urlToImage}} style={styles.articleImage} />
        //                                 </TouchableOpacity>
        //                             </View>
        //                                 <Text> {article.description}</Text>
        //                                 <Text>Published At : {article.publishedAt}</Text>                                    
        //                         </Card>
        //                     ))
        //                 }
        //             </View>
        //          </ScrollView>
        //     )
        // }
        // </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 'auto'

    },
    viewCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    articleText: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'space-between'
    },
    articleImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20
    }
})