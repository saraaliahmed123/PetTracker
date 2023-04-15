import { useRoute } from "@react-navigation/native"
import React from 'react'
import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRecordContext } from "../context/RecordContext";
import { Platform } from 'react-native';

const AnimalType = ({navigation, stateChange, childToParent, back}) => {

   const [recordTypes, setRecordTypes] = useState([])

   const {getRecordTypes} = useRecordContext()

  const route = useRoute()
  const animal = route.params?.animal

  let platform = Platform.OS

  useEffect(() => {
    getRecordTypes().then(records => {
        setRecordTypes(records)
    })
  }, [])

  return(
      <View style={styles.bottomsheet}>
      <Text style={styles.bottomsheetTitle}>Choose a record type</Text>
         <View style={styles.bottomsheetAnimals}>
        {recordTypes.map((item, key) => {
          //console.log(key)
        return(
            <TouchableOpacity key={key} style={styles.bottomsheetAnimal} onPress={() => 
              {
                platform === "web" ? 
              
             [ childToParent(item.id), childToParent(item.inputs),
              stateChange() ]
              :
              navigation.push("Record", {type:item, animal:animal})}
          }
            
            >
            <Text style={styles.bottomsheetAnimalText}>{item.id}</Text>     
            </TouchableOpacity>
            )
            })}
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
              platform === "web" ? 
              
             back()
              :
              navigation.pop()
            }}
            >
              <Text style={styles.buttontxt}>Back</Text>
            </TouchableOpacity>
      </View>
      </View>
   )
}

const styles = StyleSheet.create({
  bottomsheetAnimal:{
      borderWidth: 0.5,
      borderRadius: 5,
      margin: 10,
    },
    bottomsheetAnimalText:{
      margin: 15
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
    }

})

export default AnimalType