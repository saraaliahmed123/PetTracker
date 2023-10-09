//rface

import { React, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Image, View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, Modal } from 'react-native'

import { format } from "date-fns";

import { useUserContext } from '../../context/UserContext'
import { useAnimalContext } from '../../context/AnimalContext'
import { useRecordContext } from '../../context/RecordContext'

import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';


import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Add from '../../components/Add';
import Animals from '../../components/Animals';
import AnimalType from '../../components/AnimalType';
import Record from '../../components/Record';

import { MaterialIcons } from '@expo/vector-icons';
import {LineChart} from "react-native-chart-kit";

import { Platform } from 'react-native';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const Home = () => {

  const {currentUser} = useUserContext()
  const {getRecentRecords, getRecentExepnses, getAnimalsWeights, editChecked, record, deleteRecord, getRecordTypes} = useRecordContext()
  const {getAnimalsByUserId, getAnimalByAnimalId} = useAnimalContext()


  const [animals, setAnimals] = useState()
  const [recordTypes, setRecordTypes] = useState()
  const [records, setRecords] = useState()
  const [animal, setAnimal] = useState()
  const [recordType, setRecordType] = useState()
  const [checkedState, setCheckedState] = useState();

  const [weights, setWeights] = useState([])
   
  const [temWeight, setTemWeight] = useState([])

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
        const checked = []
        records.map((item, key) => {
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
        console.log("here")
        console.log(item)
        return(
          <TouchableOpacity key={key} style={styles.tinyLogo}>
            <Image
            style={styles.tinyLogoImage}
              source={{
                uri: item.image,
              }}/>
              <MaterialIcons name="arrow-forward-ios" size={24} color="white"  style={styles.tinyLogoArrow}/>
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

  const weightAnimal = (pet) => {
    let temWeightt = []
    if (pet !== "Select")
    {
      //console.log(pet)
      animals.forEach((item) => {
        if (item.id === pet)
        {
          console.log("IM HERE")
          temWeightt.push(parseInt(item.weight))
        }
      })

      console.log(temWeightt)
      weights.forEach((item) => {
        if (item.animalId === pet)
        {
          //console.log(parseInt(item.values[0]))
          temWeightt.push(parseInt(item.values[0]))
        }
      })
    }

   console.log(temWeightt)

    setTemWeight(temWeightt)
    
  }
  

  const recentRecords = (itemValue, animal) => {
    if (records){
      return records.map((item, key) => {
        console.log(itemValue)
        if ((itemValue == item.typeId && animal == item.animalId) || (itemValue == "Select") || (itemValue == undefined))
        {
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
              <View style={styles.textBoxText}>
                <Text style={styles.text}>{item.animal.name} - {item.typeId}</Text>
                <Text style={styles.text}>{item.date.toDateString()}</Text> 
              </View>
              <TouchableOpacity
              style={styles.arrow}
                onPress={
                  console.log(item)
                }
              >
                <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )
        }
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

  let platform = Platform.OS

  const add = () => {
   if (platform !== "web")
   {
     return(
     <Add onPress={ handlePresentModal}></Add>
     )
   }
 }

 const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%', "80%", "100%"], []);


  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const Stack = createStackNavigator();
const bottom = () => {
  if (platform !== "web")
  {
    return(
      <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      >
        
          <NavigationContainer 
  independent={true} theme={MyTheme}>
      <Stack.Navigator 
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: false,
          headerMode:"screen",
          backgroundColor:"white",
          animationEnabled: false,
        }}
        >
        <Stack.Screen
          name="Animals"
          component={Animals}
        />
        <Stack.Screen 
          name="AnimalType" 
          component={AnimalType} 
        />
        <Stack.Screen 
          name="Record" 
          component={Record} 
        />
      </Stack.Navigator>
    </NavigationContainer>
      </BottomSheetModal>
    )
  }
}


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: temWeight.length !== 0 ? temWeight : [0],
      color: (opacity = 1) => `rgba(17, 118, 176, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  // legend: ["Weight"] // optional
};


const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(25, 100, 140, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  style: {
        transform: [{ translateX: -50 }]
      },

};



  return (
  <GestureHandlerRootView>
  <BottomSheetModalProvider>
  <SafeAreaView >
    <ScrollView>
    <View style={styles.everything}>

      <View style={styles.goodMorning}>
        <Text style={styles.goodMorningText}>{time === "PM" ? "Good afternoon," : "Good morning,"} {currentUser.displayName}</Text>
      </View>

      <View>
        <View style={styles.headings}>
          <Text>Your pets</Text>
        </View>
        <View style={styles.headingsImages} >
        <ScrollView
          horizontal={true}
          >

          {
            getAnimalsImages()
          }
          </ScrollView>
        </View>
      </View>

      <View>
        <View style={styles.headings}>
          <Text>Recent records</Text>
        </View>

        <View style={styles.dropDownsBox}>
          <View style={styles.dropDown}>
            <Picker
              selectedValue={animal}
              onValueChange={(itemValue) =>
                { 
                setAnimal(itemValue)
                weightAnimal(itemValue)
              
              }
              }>
              <Picker.Item label="Select" value="Select" />
              {
                getDropDown(animals)
              }
            </Picker>
            
          </View>
          <View style={styles.dropDown}>
            <Picker
              style={styles.picker}
              selectedValue={recordType}
              onValueChange={(itemValue) =>
                { 
                  setRecordType(itemValue)
                }
              }>
              <Picker.Item style={styles.pickerItem} label="Select" value="Select" />
              {
                getDropDown(recordTypes)
              }
            </Picker>
          </View>
        </View>

        <View style={styles.recentRecordsView}>
          {
           // recentRecords(recordType, animal)
          }
        </View>
      </View>

      <View style={styles.headingsGraph}>
        <View style={styles.headings}>
          <Text style={styles.headingsText}> Track weight  </Text>
        </View>
        <View 
          style={platform === 'web' ? styles.graphW : styles.graph} >
           <LineChart
              data={data}
              width={screenWidth-34}
              height={290}
              chartConfig={chartConfig}
            />

          </View>
      </View>

      

    </View>


    </ScrollView>

    {add()}
        
    {bottom()}

    </SafeAreaView>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
  },
  colourCheck: {
    width: 25,
    height: 25,
    marginLeft: 5,
    borderRadius: 3.5,
  },
  textBox: {
    width: '80%',
    height: '95%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 25,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#51759e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textBoxText:{
    flexDirection: 'column',
  },
  textBoxN: {
    width: '80%',
    height: '95%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 25,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#51759e",
    opacity: 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  height: "100%"
},
goodMorningText:{
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 18
},
goodMorning:{
  marginHorizontal: 25,
  marginTop: 25,
  marginBottom: 5
},
headings:{
  marginVertical: 10,
  marginHorizontal: 25,
  
},
headingsText:{
  marginBottom: 15,
},
dropDownsBox:{
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 10,
  marginHorizontal: 25
},
dropDown:{
  borderRadius: 5,
  borderColor: '#616161',
  borderWidth: 0.5,
  width: "40%",
},
recentRecordsView:{
  margin: 15,
  marginBottom: 10,
},
headingsGraph:{
  // borderWidth:0.5,
  // marginVertical: 20
},
tinyLogo: {
  width: 150,
  height: 150,
  marginRight: 12
},
tinyLogoImage:{
  width: "100%",
  height: "100%"
},
tinyLogoArrow:{
  position: "absolute",
  bottom: 0,
  right: 0,
  margin: 5
},
headingsImages:{
  flexDirection: "row",
  marginVertical: 10,
  marginHorizontal: 25
}


})

export default Home