import 'react-native-gesture-handler';

import { React, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, Modal } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Add from '../../components/Add';
import { AntDesign } from "@expo/vector-icons";

 import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Animals from '../../components/Animals';
import AnimalType from '../../components/AnimalType';
import Record from '../../components/Record';

import { useRecordContext } from '../../context/RecordContext';
import { useAnimalContext } from '../../context/AnimalContext';


const screenWidth = Dimensions.get("window").width;

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

const Home = ({ navigation, setState, getVal }) => {

  const {getRecentRecords, getRecentExepnses, getAnimalsWeights, editChecked, record, deleteRecord} = useRecordContext()
  const {getAnimalsByUserId, getAnimalByAnimalId} = useAnimalContext()

   const [records, setRecords] = useState()
   const [expenses, setExpenses] = useState()
   const [animals, setAnimals] = useState()
   const [animal, setAnimal] = useState()
   const [weights, setWeights] = useState([])
   
   const [temWeight, setTemWeight] = useState([])

  useEffect(() => {
    getRecentRecords().then(records => {
      setRecords(records)
      const checked = []
      records.map((item, key) => {
        checked.push(item.checked)
      })
      setCheckedState(checked)
    })

    getRecentExepnses().then(records => {
      setExpenses(records)
    })

    getAnimalsByUserId().then(records => {
      setAnimals(records)
    })

    getAnimalsWeights().then(records => {
      setWeights(records)
    })

    
  }, [record, animal])


  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['40%', "60%", "80%"], []);


  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [checkedState, setCheckedState] = useState([]);

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

  //console.log(weights)

  const data = {
    //labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //labels: ["2023"],
    labels: ["Jan","2023"],
    datasets: [
      {
        data: temWeight.length !== 0 ? temWeight : [0],
        color: (opacity = 1) => `rgba(17, 118, 176, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Weight"] // optional
  };

const handleOnChange = (position) => {
  console.log(position+"SUP")
  const updatedCheckedState = checkedState.map((item, index) =>
    {
     return index === position ? !item : item
    }
  );

  setCheckedState(updatedCheckedState);

  //console.log(records[position].id+"HEREEEEE")
  console.log(updatedCheckedState+"HEREEEEE")
  editChecked(records[position].id, updatedCheckedState[position]).then(() => {

   })
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

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



  let platform = Platform.OS

     const add = () => {
      if (platform !== "web")
      {
        return(
        <Add onPress={ handlePresentModal}></Add>
        )
      }
    }

  const displayRecords = () => {
    if (records) {
      return records.map((item, key) => {
        // console.log(key)
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
    <View style={checkedState[key] ? styles.textBoxN : styles.textBox}
    >
      <Text style={styles.text}>{item.animal[0].name} - {item.typeId}</Text>
      <Text style={styles.text}>{item.date.toDateString()}</Text>
    </View>
    <TouchableOpacity
      style={styles.cross}
      onPress={async () => {
        platform === "web" ? 
        
        [
        getVal(item),
         await setState()
        ]
        : navigation.navigate("EditRecord", {value: item})}}
      >
        <AntDesign name="edit" size={24} color="rgb(116,148, 185)" />
      </TouchableOpacity>
    <TouchableOpacity
      style={platform === 'web' ? styles.crossW : styles.cross}
      onPress={() => {
        deleteRecord(item.id)
      }}
    >
      <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
    </TouchableOpacity>
  </View>
        )
      })
    }
  }

  const displayExpenses = () => {
    if (expenses) {
    return expenses.map((item, key) => {
      // console.log(key)
        return(
          <View key={key}>
            <Text style={styles.dateExpense}>{item.date.toDateString()}</Text>
            <View style={styles.expense}>
            <Text>{item.animal[0].name} - {item.typeId}</Text>
            <Text style={styles.price}>£{item.values[0]}</Text>
            </View>
          </View>
        )
      })}
    } 

  const pickers = () => {
    if (animals)
    {
      return animals.map((item, key) => {
        // console.log(key)
        return(
          <Picker.Item label={item.name} value={item.id} key={key}/>
        )
          })
    }
  }


  return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
    <SafeAreaView >
      <ScrollView>

        <View 
        style={platform === 'web' ? styles.pageW : [styles.page]} >
          <View style={platform === 'web' ? styles.dateViewW : styles.dateView}>
            <Text>{new Date().toDateString()}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.recentRecords}>
              <Text>Recent records:</Text>
              <View style={styles.records}>
                
              {displayRecords()}

              </View>

            </View>

            <View style={styles.recentExepnses}>
              <Text>Recent expenses:</Text>
              <View style={styles.expenses}>
                {displayExpenses()}
              </View>

            </View>

            <View style={styles.pets}>
              <View style={styles.petsTop}>
                <Text>Track weight:</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={animal}
                    onValueChange={(itemValue) =>
                     { 
                      setAnimal(itemValue)
                      //console.log(itemValue)
                      weightAnimal(itemValue)
                    
                    }
                    }>
                    <Picker.Item label="Select" value="Select" />
                     {pickers()}
                  </Picker>
                </View>
              </View>

              <View 
              style={platform === 'web' ? styles.graphW : styles.graph} >
                <LineChart
                  data={data}
                  width={platform === 'web' ? 320 : 320}
                  height={platform === 'web' ? 300 : 270}
                  chartConfig={chartConfig}
                  // verticalLabelRotation={platform === 'web' ? 0 : 90}
                  svg={{ transform: [{ translateX: -50 }] }}
                  
                />

              </View>
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
  pageW:{
    padding:20,
  },
  page: {
    alignItems: 'center',
    margin: 20,

  },
  dateView: {
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    elevation: 7,
  },
  dateViewW:{
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,  
    elevation: 10,
    alignItems: 'center'

  },
  recentRecords: {
    flexDirection: 'column',
    margin: 10,
  },
  records: {
    // borderRadius: 5,
    flexDirection: 'column',
    // borderWidth: 1,
    marginTop: 10,
    // padding: 10,
    // borderColor: '#C5C2C2'
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
  cross: {
    marginLeft: 5
  },
  recentExepnses: {
    flexDirection: 'column',
    margin: 10,
  },
  expenses: {
    // borderRadius: 5,
    flexDirection: 'column',
    // borderWidth: 1,
    marginVertical: 10,
    // padding: 10,
    // borderColor: '#C5C2C2'
  },
  expense: {
    flexDirection: 'row',
    // margin: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    height: 75,
    backgroundColor: "#D9D9D9"
  },
  price: {
    color: '#3F8259'
  },
  pets: {
    flexDirection: 'column',
    marginTop: 10,
    padding: 10,
  },
  picker: {
    width: '40%',
    backgroundColor: "#D9D9D9",
    borderRadius: 5
  },
  graph: {
    width: '100%',
    height: 320,
    marginTop: 20,
    borderWidth: 0.5
  },
  graphW: {
    width: '100%',
    height: 350,
    marginTop: 20,
    paddingRight: 20,
    transform: [{ translateX: -20 }]
  },
  petsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
dateExpense:{
  // marginHorizontal: 5,
  marginVertical: 7,
  fontWeight: "bold"
}



})

export default Home