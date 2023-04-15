import {React, useState, useEffect, useRef, useMemo, useCallback} from 'react'
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import {Agenda} from 'react-native-calendars';
import { Entypo } from "@expo/vector-icons";
import { Platform } from 'react-native';
import Add from '../../components/Add';
import {useRecordContext } from '../../context/RecordContext';

import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Animals from '../../components/Animals';
import AnimalType from '../../components/AnimalType';
import Record from '../../components/Record';


const CalendarPage = ({navigation, hey}) => {
  let platform = Platform.OS

  const {getAllRecords, editChecked, record, deleteRecord} = useRecordContext()

  const [records, setRecords] = useState()

  useEffect(() => {
   const sub = () => {getAllRecords().then(records => {
      setRecords(records)
    })}

    sub();

  }, [record])

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['40%', "60%", "80%"], []);


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

  const add = () => {
    if (platform !== "web")
      {
        return(
        <Add onPress={ handlePresentModal}></Add>
        )
      }
  }

  let date
  date = new Date().getFullYear()+"-"+new Date().toLocaleDateString().split("/")[1]+"-"+new Date().toLocaleDateString().split("/")[0]
  let hey2 = new Date().getFullYear()+"-"+new Date().toLocaleDateString().split("/")[0]+"-"+new Date().toLocaleDateString().split("/")[1]
 // console.log(date)

  const values = (item) => {
    //console.log(item)
    if (Array.isArray(item)) 
    {
     return item.map((val, key) => {
        return (
          <View style={styles.record} key={key}>
            <View style={styles.textBox}>
            <Text style={styles.text}>{val.animalName} - {val.typeId}</Text>
            <Text style={styles.text}>{new Date(val.date).toLocaleTimeString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.cross}
                onPress={() => {
                  deleteRecord(val.id)
                }}
              >
                <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
              </TouchableOpacity>
          </View>
          )
      })
    }
    else
    {
      return (
        <View style={styles.record}>
          <View style={styles.textBox}>
          <Text style={styles.text}>{item.animalName} - {item.typeId}</Text>
          <Text style={styles.text}>{item.date.toLocaleTimeString()}</Text>
          </View>
          <TouchableOpacity
                style={styles.cross}
                onPress={() => {
                  deleteRecord(item.id)
                }}
              >
                <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
              </TouchableOpacity>
            
            </View>
        )
    }
  }

  const renderItem = (item) => {
    //console.log(item.length+"LENGTH")
     return (
      <View style={styles.cardT} >
        {values(item)}
      </View>
     )
  }

  console.log(hey)
  console.log(date)


  return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
    <SafeAreaView>
    <View>
      <View style={platform === 'web' ? styles.calendarW: styles.calendar} >
      <Agenda
      theme={{ 
        calendarBackground: "#51759e", //agenda background
        agendaKnobColor: "white", // knob color
        selectedDayBackgroundColor: "white", // calendar sel date
        selectedDayTextColor: '#51759e',
        dayTextColor: "white", // calendar day
        dotColor: "white", // dots
      }}
        firstDay={1}
        scrollEnabled={true}
        items={records}
        //selected={"2023-28-03"}
        selected={platform === 'web' && hey ? hey : platform === 'web' ? hey2 : date}
        renderItem = {
              renderItem
        }
        showClosingKnob={true}
        minDate='2023-01-01'
        maxDate='2023-09-09'
        />

      </View>

      {add()}

      {bottom()}

    </View>
    </SafeAreaView>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  calendar:{
    height: '97%',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1, 
    elevation: 3,
  },
  calendarW:{
    height: 570,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1, 
    elevation: 3,
  },
  card:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardT:{
    marginRight: 10,
    marginTop: 15
  },
  cardC:{
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  record: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    width: '100%',
    height: 80
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
    marginLeft: 15,
    marginRight: 15,
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
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: "#51759e",
    opacity: 0.7
  },
  text: {
    color: 'white',
    marginVertical: 3,
    fontSize: 14
  },
  cross: {
    margin: 5
  },
})

export default CalendarPage