import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, Modal } from 'react-native'
import {Calendar} from 'react-native-calendars';
import NavBar from '../../components/NavBar'
import CalendarPage from '../Mobile/CalendarPage'
import Home from '../Mobile/Home'
import Add from '../../components/Add'
import { AntDesign } from "@expo/vector-icons";
import { useRecordContext } from '../../context/RecordContext';
import Animals from '../../components/Animals';
import AnimalType from '../../components/AnimalType';
import Record from '../../components/Record';
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { useUserContext } from '../../context/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from "@expo/vector-icons";
import EditRecord from '../Mobile/EditRecord';

//const initialDate = new Date().getFullYear()+"-"+new Date().toLocaleDateString().split("/")[1]+"-"+new Date().toLocaleDateString().split("/")[0];

const CalendarWeb = ({navigation}) => {

  const {getAllRecords, getRecordTypes, record, addRecord} = useRecordContext()
  const {currentUser} = useUserContext()

  const [selected, setSelected] = useState();

  const [recordTypes, setRecordTypes] = useState([])

   const [records, setRecords] = useState([])
   

   useEffect(() => {
    const sub = () => {
    const val = {};
    val[selected] = {selected: true, marked: true, selectedColor: '#51759e', selectedTextColor: 'white'}
      
    getAllRecords().then(records => {
      for (const [key, value] of Object.entries(records)) {
        val[key] =  {value, marked: true, dotColor: value[0].colour}
      }  
      setRecords(val)
    })

    getRecordTypes().then(records => {
      setRecordTypes(records)
    })
  }
  sub()

  }, [])

  const categories= () => {
    return recordTypes.map((item, key) => {
      // console.log(key)
      return(
        <View style={styles.category} key={key}>
              <View style={[styles.colourCheck, {backgroundColor: item.colour}]}>
              </View>
              <View style={styles.expense}>
                <Text>{item.id}</Text>
              </View>
          </View>
      )
    })
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(1);
  const [values, setValues] = useState([]);
  let arr

  const here = (val) => {
    arr = val
   }

   const [web, setWeb] = useState([]);
  const getVal = (val) => {
    setWeb(val)
   }

   console.log(web)

  const state = () => {
    if (modalState === 1)
            return(
            <Animals 
            childToParent={childToParent}
            stateChange={() => {setModalState(2)}}
            ></Animals>
            )
        else if (modalState === 2)
        {
            return(
            <AnimalType 
            childToParent={childToParent}
            stateChange={() => {setModalState(3)}}
            back={() => {setModalState(1)}}
            ></AnimalType>
            )
        }
        else if (modalState === 3)
        {
            return(
            <Record
            childToParent={here}
            add={ async () => {
                await addRecord(new Date().toISOString(), values[0], false, new Date(), values[1], currentUser.providerData[0].uid, arr);
                setValues([])
                setModalVisible(false)
                setModalState(1)
            }}
            stateChange={() => {setModalVisible(false); setModalState(1)}}
            back={() => {setModalState(2)}}
            typeWeb={values[2]}
            ></Record>
            )
        }
        else if (modalState === 4)
        {
            return(
            <EditRecord 
            webItem={web}
            stateChange={() => {setModalVisible(false); setModalState(1)}}
            > </EditRecord>
            )
        }
  }

  const childToParent = (childdata) => {
     setValues((prev) => {
       return [...prev, childdata]
     })
  
   }

  const displayModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <TouchableOpacity
              style={styles.cross}
              onPress={() => {
                setModalVisible(false);
                setModalState(1)
              }}
            >
              <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
          </TouchableOpacity>
          {state()}
        </View>
      </Modal>
    )
  }


  return (
    <BottomSheetModalProvider>
    <View style={styles.pageWholeNav}>
      <NavBar selected = "2" 
        calendar = {() => {navigation.navigate("CalendarWeb")}} 
        home = {() => {navigation.navigate("FirstPageWeb")}}
        expense = {() => {navigation.navigate("Main", {screen: 'Exepnse' })}}
        account = {() => {navigation.navigate("AccountWeb")}}
        > </NavBar>
      <View style={styles.page}>

          <View style={styles.calendarSmallView}>

            <View style={styles.logo}>
                  <Image style={styles.image4}
                          source={require('../../components/Picture4.png')}
                  />
              </View>
            
              <View style={styles.calendarSmall}>
                    <Calendar
                    initialDate={new Date()}
                    style={styles.calendar}
                    onDayPress={
                      day => {
                        setSelected(day.dateString)
                        console.log(day.dateString+"WEB PAGE")
                    }
                  }
                    markedDates={records}
                    firstDay={1}
                    renderArrow={(direction) => {
                      if (direction == "left")
                        return (
                          <AntDesign name="caretleft" size={15} color="black" />
                      );
                      if (direction == "right")
                        return (
                       <AntDesign name="caretright" size={15} color="black" />
                       );
                    }}
                    />

              </View>

              <Text style={styles.categoriesT}>Categories</Text>
              
              <View style={styles.categories}>
                {categories()}
              </View>
          </View>

          <View style={styles.agenda}>
            <View style={styles.pageTop}>
              <Text style={styles.pageTitle}>Calendar</Text>
              <View style={styles.add}>
                <Add onPress={() => {
                  setModalVisible(true)
                }}> </Add>
              </View>
            </View>
            <View style={styles.agendaW}>
              <CalendarPage hey = {selected} ></CalendarPage>
            </View>
          </View>
          
        <View style={styles.dashboard}>
            <Home 
            setState ={() => {setModalVisible(true); setModalState(4)}} 
            getVal={getVal}

            ></Home>
        </View>
        
      </View>

      {displayModal()}

     </View>
     </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  pageWholeNav:{
    flexDirection: 'row',
    height: '100%',
     backgroundColor: 'white'
  },
  page:{
    flexDirection: 'row',
    height: '100%',
    width: '95.5%',
    justifyContent: 'space-between'
  },
  dashboard: {
    height: '100%',
    width: '25%',
   // width: '35%',
    overflow: "scroll",
    backgroundColor: '#F2F2F2'
  },
  calendarSmall:{
    height: '50%',
    width: 270,
    borderRadius: 5, 
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 10,
  },
  calendar: {
    marginBottom: 10,
    fontSize: 5,
  },
  calendarSmallView:{
    height:'100%',
    width: '21%',
    alignItems: 'center',
  },
  pageTitle:{
    fontSize: 30,
    textAlign: 'left',
    marginVertical: 20,
  },
  pageTop:{
    flexDirection: 'row',
    marginVertical: 27,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '65%',
  },
  agenda:{
    width:'50%' ,
    height: '100%',
    flexDirection: 'column'
  },
  agendaW:{
    overflow: 'hidden',
    width:'100%' ,
    height: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 10,
  },
  logo:{
    width: '70%',
    height: '10%',
    alignSelf: 'center',
    marginVertical: 30
  },
  image4:{
    height: '87%',
    width: '90%'
  },
  add:{
    marginTop: 10
  },
  colourCheck: {
    width: 17,
    height: 17,
    borderRadius: 3.5,
    marginHorizontal: 10
  },
  expense: {
    borderRadius: 2,
    height: '50%',
    padding: 5,
    justifyContent: 'center',
  },
  categories: {
    marginTop: 13,
    marginBottom: 15,
    minHeight: '19%',
    width: '87%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C5C2C2',
    flexWrap: 'wrap',
    paddingTop: 5
  },
  category:{
    flexDirection: 'row',
    width: '50%',
    height: '15%',
    alignItems: 'center',
  },
  categoriesT:{
    alignSelf: 'flex-start',
    marginHorizontal: 15,
    marginTop: 17
  },
  centeredView:{
    borderWidth: 0.5,
    position: "absolute",
    right: "31%",
    top: "27%",
    width: "37%",
    height: "45%",
    backgroundColor: "white",
    flexDirection: "column",
    paddingTop: 10
  },
  cross:{
    alignSelf: "flex-end",
    margin: 5,
  },
})

export default CalendarWeb