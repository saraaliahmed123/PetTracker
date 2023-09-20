//rface

import { React, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { format } from "date-fns";

import { useUserContext } from '../../context/UserContext'
import { useAnimalContext } from '../../context/AnimalContext'
import { useRecordContext } from '../../context/RecordContext'

import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

const Home = () => {

  const {currentUser} = useUserContext()
  const {getAnimalsByUserId} = useAnimalContext();
  const {getRecordTypes, getRecentRecords, editChecked} = useRecordContext()

  const [animals, setAnimals] = useState()
  const [recordTypes, setRecordTypes] = useState()
  const [records, setRecords] = useState()
  const [animal, setAnimal] = useState()
  const [recordType, setRecordType] = useState()
  const [checkedState, setCheckedState] = useState();

  const time = format(new Date(), 'a')

  useEffect(() => {
    const sub = () => {
      getAnimalsByUserId().then(records => {
        setAnimals(records)
      })

      getRecordTypes().then(records => {
        setRecordTypes(records)
      })


      getRecentRecords().then(records => {
        setRecords(records)
        console.log(records)
        const checked = []
        records.map((item, key) => {
          console.log(key)
          checked.push(item.checked)
        })
        setCheckedState(checked)
      })
    }
    sub()
    
  }, [])

  const getAnimalsImages = () => {
    if (animals){
      return animals.map((item, key) => {
        return(
          <TouchableOpacity key={key}>
            {/* Images */}
            <Text>Hi</Text>
          </TouchableOpacity>
        )
      })
    }
    else{
      //no animals image
    }

  }

  const getDropDown = (items) => {
    if (items){
      return items.map((item, key) => {
        // console.log(item)
        if (item?.name)
        {
          return(
            <Picker.Item label={item.name} value={item.id} key={key}/>
            
          )
        }
        else
        {
          return(
            <Picker.Item label={item.id} value={item.id} key={key}/>

          )
        }
      })
    }
    else{
      //no animals/records drop down
    }
  }
  

  const recentRecords = () => {
    if (records){
      return records.map((item, key) => {
        return(
          <View style={styles.record} key={key}>
            <View>
               <Checkbox
                style={styles.colourCheck}
                value={checkedState[key]}
                onValueChange={() => handleOnChange(key)}
                color={checkedState[key] ? '#8DADFF' : '#4E72CE'}
              /> 
            </View>
            <View style={checkedState[key] ? styles.textBoxN : styles.textBox}>
              <Text style={styles.text}>{item.animal.name} - {item.typeId}</Text>
              <Text style={styles.text}>{item.date.toDateString()}</Text> 
            </View>
          </View>
        )
      })
    }
    else{
      //no records
    }
  }

  const handleOnChange = (position) => {
    // console.log(position+"SUP")
    const updatedCheckedState = checkedState.map((item, index) =>
      {
       return index === position ? !item : item
      }
    );
  
    setCheckedState(updatedCheckedState);
  
    // console.log(updatedCheckedState+"HEREEEEE")
    editChecked(records[position].id, updatedCheckedState[position]).then(() => {
  
     })
  }
  
  console.log(currentUser)

  return (
    <View style={styles.everything}>

      <View style={styles.goodMorning}>
        <Text style={styles.goodMorningText}>{time === "PM" ? "Good afternoon," : "Good morning,"} {currentUser.displayName}</Text>
      </View>

      <View>
        <View>
          <Text>Your pets</Text>
        </View>
        <View>
          {
            getAnimalsImages()
          }
        </View>
      </View>

      <View>
        <View>
          <Text>Recent records</Text>
        </View>

        <View>
          <View>
          <Picker
            selectedValue={animal}
            onValueChange={(itemValue) =>
              { 
              setAnimal(itemValue)
            
            }
            }>
            <Picker.Item label="Select" value="Select" />
            {
              getDropDown(animals)
            }
          </Picker>
            
          </View>
          <View>
          <Picker
            selectedValue={animal}
            onValueChange={(itemValue) =>
              { 
              setRecordType(itemValue)
            }
            }>
            <Picker.Item label="Select" value="Select" />
            {
              getDropDown(recordTypes)
            }
          </Picker>
          </View>
        </View>

        <View>
          {
            recentRecords()
          }
        </View>
      </View>

      {/* <View>
        <View>
          <Text>{/* Month  </Text>
        </View>
        <View>
          {/* Graph 
        </View>
      </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
  recentRecords: {
    flexDirection: 'column',
    margin: 10,
  },
  record: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    width: '100%',
  },
  colourCheck: {
    width: 25,
    height: 25,
    marginLeft: 5,
    borderRadius: 3.5,
  },
  textBox: {
    flexDirection: 'column',
    width: '60%',
    height: '95%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 25,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#51759e",
  },
  textBoxN: {
    flexDirection: 'column',
    width: '60%',
    height: '95%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 25,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#51759e",
    opacity: 0.7
  },
  text: {
    color: 'white',
    marginVertical: 3,
    fontSize: 14
  },
  addModal:{
    borderWidth: 2,
    width: "100%",
    position: 'absolute',
    bottom: 0,
    height: "80%",
    backgroundColor: 'white'
    
},
addModal:{
  borderWidth: 2,
  width: "100%",
  position: 'absolute',
  bottom: 15,
  height: "20%",
  zIndex: 100000000000000000000
},
bottomsheetTitle:{
  alignSelf: "center",
  margin: 5
},
bottomsheetAnimals:{
  width: "90%",
  margin: 5,
  alignSelf: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center"
},
Here:{
  borderWidth:0.5,
  height: "100%",
  width: "100%"
},
everything:{
  margin: 20
},
goodMorningText:{
  textAlign: "center"
}


})

export default Home