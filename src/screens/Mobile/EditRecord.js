import {React, useState, useEffect} from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRoute } from "@react-navigation/native"
import { useRecordContext } from '../../context/RecordContext'
import { Platform } from 'react-native';

const EditRecord = ({navigation, stateChange, webItem}) => {

    const route = useRoute()
    let value
    if (route.params?.value)
    {
       value = route.params.value
    }
    else
    {
       value = webItem
    }

    console.log(webItem)
    const [recordType, setRecordType] = useState([])
    let list = []

    const {getRecordTypes, editRecord} = useRecordContext()

    let platform = Platform.OS

    useEffect(() => {
           getRecordTypes().then(records => {
            console.log(records)
                records.forEach((item) => {
                    if (item.id == value.typeId)
                    {
                        setRecordType(item.inputs)
                    }
                })
            });
    }, [] )

  console.log(value)

  return (
    <View style={platform === "web" ? styles.pageWeb : styles.page}>

        <View style={platform === "web" ? styles.foodtypewWeb : styles.foodtype}>
        <Text style={styles.foodtypetxt}>{value.typeId}:</Text>
        </View>
        <View style={platform === "web" ? styles.contentWeb : styles.content}>
        {recordType.map((item, key) => {
          //console.log(key)
            return (
                <View key={key} style={platform === "web" ? styles.brandWeb : styles.brand}>
                  <View style={styles.titleBox}>
                    <Text style={styles.brandtxt}>{item}:</Text>
                  </View>
        
                  <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
                  <TextInput
                    autoCapitalize='sentences'
                   defaultValue={value.values[key]}
                    style={styles.brandInput}
                    onEndEditing={(text) => {
                      list[key] = text.nativeEvent.text
                      console.log(list)
                    }}
                    onChange={(text) => {
                      list[key] = text.nativeEvent.text
                       }}
                  />
                  </View>
                </View>
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
            navigation.navigate("Home")
        }}
        >
            <Text style={styles.buttontxt}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => {
            const arr = []
            console.log(value.values)
            value.values.forEach((item, key) => {
               // console.log(key)
                if (item === list[key])
                {
                    arr.push(item)
                }
                else if (list[key]){
                    arr.push(list[key])
                }
                else
                {
                    arr.push(item)
                }
            })

            console.log(arr)
            editRecord(value.id, arr)

            if (platform === "web")
            {
              stateChange()
            }
            else
            {
              navigation.navigate("Home")
            }

            
        }}
        >
            <Text style={styles.buttontxt}>Done</Text>
        </TouchableOpacity>

        </View>

    </View>
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

export default EditRecord