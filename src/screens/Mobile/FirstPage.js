import React from 'react'
import { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, SafeAreaView } from 'react-native'
import { Platform } from 'react-native';
import { useUserContext } from '../../context/UserContext';

const FirstPage = ({navigation, logIn, signUp}) => {
  const {currentUser} = useUserContext();

  useEffect(() => {
    if (currentUser) {
      navigation.navigate("Main")
    }
    else{
      console.log("HERE")
    }
  }, [])

  let platform = Platform.OS

  return (
     <SafeAreaView>
   <View style={styles.page}>

        <View style={styles.stuff}>

          <View style={platform === 'web' ? styles.size : styles.imageView}>
            <Image style={platform === 'web' ? styles.sizeWeb : styles.imag}
                source={require('../../components/Picture1.png')}
              />
          </View>

          <View style={platform === 'web' ? styles.buttonsWeb : styles.buttonsView}>
            
            <TouchableOpacity 
              onPress={() => {platform === 'web' ? logIn() : navigation.navigate('LogIn')} }
              style={platform === 'web' ? styles.buttonFirstPageWeb : styles.buttonFirstPage}
            >
              <Text >Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {platform === 'web' ? signUp() : navigation.navigate('SignUp')} }
              style={platform === 'web' ? styles.buttonFirstPageWeb : styles.buttonFirstPage}
            >
              <Text >Signup</Text>
            </TouchableOpacity>

          </View>

        </View>

        <View style={platform === 'web' ? styles.circleW : styles.circle}>

        </View>
        
   </View> 
   </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#51759e",
      height: '100%',
      justifyContent: 'center',
      overflow: 'hidden'
  },
  stuff:{
    marginVertical: 30,
    alignItems: 'center',
  },
  circleW: {
      width: 550,
      height: 600,
      borderRadius: 500,
      backgroundColor: "white",
      position: 'absolute',
      bottom: '35%',
      transform: [{ translateX: -70 }],
      zIndex: -100000, // works on ios
      elevation: -1, // works on android
   },
   circle: {
    width: 550,
    height: 600,
    borderRadius: 500,
    backgroundColor: "white",
    position: 'absolute',
    bottom: '35%',
    transform: [{ translateX: -85 }],
    zIndex: -100000, // works on ios
    elevation: -1, // works on android
 },
   buttonsView: {
    width: 335,
    marginTop: 10,
  },
  buttonsWeb:{
    width: 305,
    marginTop: 10,
  },
  buttonFirstPage:{
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,  
    elevation: 10,
  },
  buttonFirstPageWeb:{
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7.5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,  
    elevation: 10,
  },
  imageView:{
    marginBottom: 15,
    width: 250,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imag:{
    width: '65%',
    height: '97.5%',
  },
  size:{
    width: 210,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sizeWeb:{
    width: '57%',
    height: '80%',
  }
  });

export default FirstPage