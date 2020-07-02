import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator,FlatList, Dimensions,Image, TouchableWithoutFeedback, Linking, Share, ScrollView } from 'react-native'
const { width, height } =  Dimensions.get('window')
import * as Font from 'expo-font'



export default class GeneralScreen extends React.Component{

state = {
    news: [],
    loading: true,
    fontLoaded: false
  }

  featchnews = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=5359df3deeca4fda93007ce1f9b4cc5a')
    .then((res) => res.json())
    .then((response) => {
      this.setState({
        news: response.articles,
        loading: false
      })
    })
  }

  shareArticle  = async (url) => {
    try {
      await Share.share({
        message: url
      })
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount(){
    this.featchnews()
    await Font.loadAsync({
      'regular': require('../../assets/fonts/Poppins-Regular.ttf'),
      'medium': require('../../assets/fonts/Poppins-Medium.ttf') 
    })
    this.setState({fontLoaded: true})
  }

  render (){
    if(this.state.loading && !this.state.fontLoaded){
      return(
        <View style={{flex:1, alignContent: 'center',justifyContent: 'center', backgroundColor:'#333'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{fontSize:30, color: '#fff', marginTop: 15, marginBottom: 5, textAlign: "center", fontFamily: 'medium'}}>Top General News</Text>
          </View>
  
          <View style={styles.news}>
            <ScrollView>
            <FlatList
            showsVerticalScrollIndicator={false}
              data={this.state.news}
              renderItem={({item}) => {
                return (
                  <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
                    <View style={{width: width-50, height:200, backgroundColor: '#fff', marginBottom: 15,borderRadius: 15}}>
                      <Image source={{uri: item.urlToImage}} style={[StyleSheet.absoluteFill, {borderRadius: 15}]} />
                      <View style={styles.gradient}>
                          <Text style={{position: 'absolute', bottom: 0, color: '#fff', fontSize: 20, padding: 5, fontFamily: 'regular'}}>{item.title}</Text>
                          <Text style={{fontSize: 16, fontWeight: 'bold',position: 'absolute', color: '#fff', top: 0, right: 0, padding: 5,fontFamily: 'regular'}} onPress={() => this.shareArticle(item.url)}>Share</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
            </ScrollView>
          </View>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  container : {
     flex: 1,
     backgroundColor: '#333'
  },
  header: {
    padding:40,
    display: 'flex'
  },
  news: {
    alignSelf: 'center',
    flex: 1
  },
  gradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15
  }
})