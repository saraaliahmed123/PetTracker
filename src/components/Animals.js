import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { useAnimalContext } from '../context/AnimalContext';
import { Platform } from 'react-native';


const Animals = ({navigation, stateChange, childToParent}) => {

   const [animals, setAnimals] = useState([])

   let platform = Platform.OS

   const {getAnimalsByUserId} = useAnimalContext()


   useEffect(() => {
    getAnimalsByUserId().then(records => {
        setAnimals(records)
    })
   }, [])

   const displayAnimals = () => {
    return animals.map((item, key) => {
      //console.log(key)
        return(
            <TouchableOpacity style={styles.bottomsheetAnimal} key={key}
            onPress={() => {
              platform === "web" ? 
              
             [ childToParent(item.id),
              stateChange() ]
              
              : navigation.push("AnimalType", {animal:item})
            }}>
            <View style={styles.imageView}>
              <View style={styles.image}></View>
             {/* <Image 
                style={styles.image}
                source={{uri:item.image}}/>  */}
            </View> 
            <View style={styles.bottomsheetAnimalTextView}>
                <Text>{item.name}</Text>     
            </View>
            </TouchableOpacity>
            )
            })
   }

   return(
    <View style={styles.bottomsheet}>
      <Text style={styles.bottomsheetTitle}>Choose an animal</Text>
      <View style={styles.bottomsheetAnimals}>
        {displayAnimals()}
      </View> 
    </View>
   )
}

const styles = StyleSheet.create({
    bottomsheetAnimal:{
        borderWidth: 0.5,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "white",

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,  
        elevation: 4,
      },
      bottomsheetAnimalTextView:{
        marginVertical: 10,
        width: "100%",
        alignItems: "center"
      },
      bottomsheetAnimals:{
        margin: 5,
        flexWrap: "wrap",
        flexDirection: "row",
      },
      bottomsheet:{
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      },
      bottomsheetTitle:{
        margin: 10,
      },
      image:{
        height: 75,
        width: 80

      }

})

export default Animals