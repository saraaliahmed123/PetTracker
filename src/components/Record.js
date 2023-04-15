import {React, useEffect} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Keyboard } from 'react-native'
import { useRoute } from "@react-navigation/native"
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
// import { firebase } from '../../firebase';
import { useRecordContext } from '../context/RecordContext';
import { useUserContext } from '../context/UserContext';
import { Platform } from 'react-native';

// if (Platform.OS !== "web")
// {
  import { useBottomSheetModal } from '@gorhom/bottom-sheet';
//}

const Record = ({navigation, stateChange, childToParent, add, back, typeWeb}) => {

  const route = useRoute()
  const animal = route.params?.animal

  const type = route.params?.type

  const [date, setDate] = useState(new Date())

  const [recordTypes, setRecordTypes] = useState([])
  const [typee, setTypee] = useState()
  const [typeeWeb, setTypeeWeb] = useState(typeWeb)
  let values = []

  const {getRecordTypes, addRecord} = useRecordContext()
  const {currentUser} = useUserContext()

  const { dismissAll } = useBottomSheetModal();
  let platform = Platform.OS

  useEffect(() => {
    const sub = () => {
       getRecordTypes().then(records => {
        setRecordTypes(records)
        records.forEach((item) => {
          if (platform !== "web")
          {
            if (item.id === type.id)
            {
              setTypee(item.inputs)
            }
        }
        });
    })}
    sub();
  }, [])


  const getRecordTypeInputs = () => {
    let inputs
    
    if (platform !== "web")
    {
      inputs = typee
    }
    else
    {
      inputs = typeeWeb
    }

    console.log(inputs)
    if (inputs)
    {
  
    return inputs.map((item, key) => {
       //console.log(key)
      // console.log(item)
      return (
        <View style={styles.brand} key={key}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>{item}:</Text>
          </View>

          <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
          <TextInput
            autoCapitalize='sentences'
            style={styles.brandInput}
            onEndEditing={(text) => {
              values[key] = text.nativeEvent.text
            }}
            
            onChange={(text) => {
              values[key] = text.nativeEvent.text
            }}
          />
          </View>
        </View>
      )
    })
  
  }
}


  return (
    <ScrollView>
    <View style={styles.page}>
      <View style={platform === "web" ? styles.contentWeb:styles.content}>
        {getRecordTypeInputs()}

       <View style={styles.brand}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>Date:</Text>
          </View>
          <View style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
            <TextInput
            autoCapitalize='sentences'
            value={date.toDateString()}
            style={styles.brandInput}
            />
          </View>
        </View>
             
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

            <TouchableOpacity
            style={styles.button}
            onPress={ () => {
              if (platform === "web") 
              {
                
                childToParent(values)
                console.log(values)
                add()
              }
              else
              {
                addRecord(date.toISOString(), animal.id, false, date, type.id, currentUser.providerData[0].uid, values)
                values = []
                dismissAll()
              }
              
              
              //values[]
              // console.log(values),
              // childToParent(values),
              //console.log(values),
              //stateChange(),
              //add()
            
             
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
    flexWrap: "wrap"
  },
  content:{
    flexDirection: "column",
    margin: 15
  },
  contentWeb:{
    flexDirection: "row",
    flexWrap: "wrap"
  },
  brand: {
    flexDirection: "row",
    margin: 7,
    height: 60
  },
  titleBox:{
    backgroundColor: "#51759e",
    margin: 5,
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
  brandInput: {
    borderWidth: 0.5,
    borderColor: "#B3B3B3",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 10
  },
  datetxt:{
    borderWidth: 0.5,
    borderColor: "#B3B3B3",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 12,
    paddingTop: 13,
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
    borderWidth: 0.5,
    borderColor: "#B3B3B3",
    margin: 10,
    width: 305,
    height: 65,
  },
  foodtypetxt:{
    margin:21
  }
  });

export default Record