import {React, useEffect, useState} from 'react'
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import { Platform } from 'react-native';
import {useUserContext} from '../../context/UserContext';


const LogIn = ({navigation, logInPage}) => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { logIn, currentUser } = useUserContext()

  let platform = Platform.OS

  return (
     <SafeAreaView>
      <View style={styles.page}>

      
        <View style={styles.stuff}>
          <Text style={styles.title}>Login</Text>

          <View style={ styles.inputBox}>
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              value={email}
              onChangeText = {(text) => setEmail(text)}
            />

            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              secureTextEntry
              value={password}
              onChangeText = {(text) => setPassword(text)}
            />

          </View>

          <View style={styles.buttonsView}>
            
            <TouchableOpacity onPress={async () => {
              if (email && password)
              {
                
                try{
                  await logIn(email, password)

                }catch(e){

                }

                if (currentUser && Platform.OS !== 'web'){
                  console.log(currentUser)
                  navigation.navigate('Main')

                }
                else if (currentUser && Platform.OS == 'web'){
                  console.log(currentUser)
                  logInPage()
                }
              
                
              }
              }} style={styles.buttonLogIn}>
              <Text style={styles.Textcolour} >Login</Text>
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
  },
  stuff:{
    margin: 30,
    alignItems: 'center'
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
  title:{
    fontSize: 25,
    margin: 20,
  },
  buttonLogIn:{
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#51759e",
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
  inputBox: {
    width: 335,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#D9D9D9",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});


export default LogIn