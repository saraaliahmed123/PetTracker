import {React, useState } from 'react'
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {useUserContext} from '../../context/UserContext';
import { Platform } from 'react-native';


const SignUp = ({navigation, signUpPage}) => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let platform = Platform.OS

  const { signUp, currentUser } = useUserContext()

  return (
    <SafeAreaView>
    <View style={styles.page}>

    
      <View style={styles.stuff} >
        <Text style={styles.title}>Signup</Text>

        <View 
        style={platform === 'web' ? styles.inputBoxW : styles.inputBox}
        >
          <TextInput 
            style={platform === 'web' ? styles.inputW : styles.input}
            placeholder="Name" 
            value={name}
            onChangeText = {text => setName(text)}
          />

          <TextInput 
           style={platform === 'web' ? styles.inputW : styles.input}
            placeholder="Email" 
            value={email}
            onChangeText = {text => setEmail(text)}
          />

          <TextInput 
            style={platform === 'web' ? styles.inputW : styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText = {text => setPassword(text)}
          />

        </View>

        <View style={styles.buttonsView}>
          
          <TouchableOpacity onPress={() => {
            if (email && password && name)
            { 
              if (Platform.OS === 'web')
              {
                signUpPage()
              }
              else
              {
                signUp(email, password, name)
                navigation.navigate('Main')
                console.log("HERE")
              }
            }
            }}
            style={styles.buttonLogIn}>
            <Text style={styles.Textcolour} >Signup</Text>
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
  inputBoxW:{
    width: 335,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#D9D9D9",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  inputW: {
    backgroundColor: "#D9D9D9",
    padding: 20,
    marginVertical: 13,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});

export default SignUp