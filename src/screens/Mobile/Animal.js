import {React, useState, useEffect} from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRoute } from "@react-navigation/native"
import { useAnimalContext } from '../../context/AnimalContext';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserContext } from '../../context/UserContext';

const Animal = ({navigation, newOrNot, selected, stateChange, back}) => {

    const {editAnimal, addAnimal} = useAnimalContext();
    const {currentUser} = useUserContext()
    

    let platform = Platform.OS

    const route = useRoute()
    let animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]

    useEffect(() => {
      if (platform !== "web"){
        if (route.params.animal)
        {
            animal = Object.entries(route.params.animal)
        }
        else if (route.params.new)
        {
            animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
        }
      }
      else
      {
        if (selected)
        {
            animal = Object.entries(selected)
        }
        else if (newOrNot)
        {
          animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
        }
      }
    }, [])

    if (platform !== "web"){
      if (route.params.animal)
      {
          animal = Object.entries(route.params.animal)
      }
      else if (route.params.new)
      {
          animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
      }
    }
    else
    {
      if (selected)
      {
          animal = Object.entries(selected)
      }
      else if (newOrNot)
      {
        animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
      }
    }
    

    // console.log(route.params.new)


    let list = []

    const displayAnimal = () => {
        if (animal)
        {
          console.log(animal)
            return animal.map((item, key) => { 
            if (item[0] !== "userId" && item[0] !== "image" && item[0] !== "id"){
              return (
                  <View style={platform === "web" ? styles.brandWeb : styles.brand} key={key}>
                    <View style={styles.titleBox}>
                      <Text style={styles.brandtxt}>{item[0]}:</Text>
                    </View>
          
                    <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
                    <TextInput
                      autoCapitalize='sentences'
                      defaultValue={item[1]}
                      
                      style={styles.brandInput}
                      onEndEditing={(text) => {
                        list[key] = text.nativeEvent.text
                        // console.log(list)
                      }}
                      onChange={(text) => {
                        list[key] = text.nativeEvent.text
                          }}
                      // value={item[1]}
                    />
                    </View>
                  </View>
                )
            }
          })
        }
    }


 
  return (
    <ScrollView>
    <View style={platform === "web" ? styles.pageWeb : styles.page}>

        <View style={platform === "web" ? styles.contentWeb : styles.content}>
        {displayAnimal()}
        </View>

        <View style={styles.buttons}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
            if (platform === "web") {
            
            animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid]]
            back()
            
            }
            else
            {

            animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid]]
            navigation.navigate("Account")
            }
          
        }}
        >
            <Text style={styles.buttontxt}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => {
            console.log("HEREEEEE")
            const arr = {}
            // console.log(animal)
            animal.forEach((item, key) => {
                if (item[1] === list[key])
                {
                    arr[item[0]] = item[1]
                }
                else if (list[key]){
                    arr[item[0]] = list[key]
                }
                else
                {
                    arr[item[0]] = item[1]
                }
            })
//
             console.log(arr)
            //  if (route.params.new || newOrNot)
            //  {
            //     addAnimal(arr)
            //  }
            //  else
            //  {
            //     editAnimal(arr["id"], arr)
            //  }

            if (platform === "web")
            {
              // try{
                if (newOrNot){
                  addAnimal(arr)
                }
                else
                {
                  editAnimal(arr["id"], arr)
                }
              // }
              // catch(e){

              // }

              animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
              stateChange()
              
            }
            else
            {
              if (route.params.new){
                addAnimal(arr)
              }
              else
              {
                editAnimal(arr["id"], arr)
              }
              animal = [["age", ""], ["name", ""],["weight", ""],["dob", ""],["type", ""],["breed", ""],["userId", currentUser?.providerData[0].uid],]
              navigation.navigate("Account")
              
            }

            
        }}
        >
            <Text style={styles.buttontxt}>Done</Text>
        </TouchableOpacity>

        </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    page:{
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 30
    },
    pageWeb:{
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10
    },
    brand: {
      flexDirection: "row",
      margin: 7,
      height: 60,
      marginVertical: 20
    },
    brandWeb:{
      flexDirection: "row",
      height: 60,
    },
    titleBox:{
      backgroundColor: "#51759e",
      margin: 5,
      // width: 80,
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
    brandInputView:{
      margin: 5,
      width: 230,
    },
    brandInputViewWeb:{
      margin: 10,
    },
    contentWeb:{
      flexDirection: "row",
      flexWrap: "wrap"
    },
    brandInput: {
      borderWidth: 0.5,
      borderColor: "#B3B3B3",
      borderRadius: 5,
      height: "100%",
      paddingLeft: 10
    },
    brandtxt:{
      color: "white",
      width: 45,
      fontSize: 12,
      marginLeft: 4
    },
    button: {
      backgroundColor: "#51759e",
      margin: 10,
      padding: 10,
      borderRadius: 5,
      paddingHorizontal: 20
    },
    buttontxt:{
      color: "white"
    },
    buttons: {
      flexDirection: "row",
      margin: 10
    },
    foodtype:{
      alignItems: "flex-start",
      width: 335,
      height: 65,
    },
    foodtypewWeb:{
      width: 335,
      height: 65,
      alignItems: "center",
    },
    foodtypetxt:{
      margin:20,
      color: "#51759e",
      fontSize: 17
    }
    });

export default Animal