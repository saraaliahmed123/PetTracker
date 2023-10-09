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
import Animal from '../Mobile/Animal';
import { Platform } from 'react-native';
import { useAnimalContext } from '../../context/AnimalContext';

const initialDate = new Date().getFullYear()+"-"+new Date().toLocaleDateString().split("/")[1]+"-"+new Date().toLocaleDateString().split("/")[0];

const AccountWeb = ({navigation}) => {
    let platform = Platform.OS

  const {getAllRecords, getRecordTypes, record, addRecord} = useRecordContext()
  const {currentUser, signOutUser} = useUserContext()

  const [selected, setSelected] = useState(initialDate);

  const [recordTypes, setRecordTypes] = useState([])

   const [records, setRecords] = useState([])
   

  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState(1);
  const [values, setValues] = useState([]);

  const [newOrNot, setNewOrNot] = useState(false)

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
        else if (modalState === 5)
        {
            return(
            <Animal 
                newOrNot={newOrNot}
                selected={selectedAnimal}
                stateChange={() => {
                    setModalVisible(false); 
                    setModalState(1)
                    setNewOrNot(false)
                    setSelectedAnimal()
                }}
                back={() => {
                    setModalVisible(false); 
                    setModalState(1)
                    setNewOrNot(false)
                    setSelectedAnimal()
                }}
                ></Animal>
            )
        }
  }

  const {getAnimalsByUserId, deleteAnimal
    //animalsList
  } = useAnimalContext();

   const [animals, setAnimals] = useState()
   const [selectedAnimal, setSelectedAnimal] = useState()

  useEffect(() => {
    const sub = () => {
    getAnimalsByUserId().then(records => {
      setAnimals(records)
    })
  }
  sub()
    
  }, [])

  const getAnimals = () => {
    if (animals)
        {
      return animals.map((item, key) => {
        console.log(item.image)
        return(
          <View style={styles.card} key={key}>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => {
                deleteAnimal(item.id)
              }}
            >
              <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bottomsheetAnimal} 
            onPress={() => {
              //navigation.navigate("Animal", {animal: item })
              setSelectedAnimal(item)
              setModalVisible(true); 
              setModalState(5)
            }}>
            <View style={styles.imageView}>
             <Image 
                style={styles.image}
                source={{uri:item.image}}/>  
            </View>
            <View style={styles.bottomsheetAnimalTextView}>
                <Text>{item.name}</Text>     
            </View>
            </TouchableOpacity>
            </View>
        )
      })
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
      <NavBar selected = "5" 
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
          </View>

          <View style={styles.agenda}>
            <View style={styles.pageTop}>
              <Text style={styles.pageTitle}>Account</Text>
              <View style={styles.add}>
                <Add onPress={() => {
                  setModalVisible(true)
                }}> </Add>
              </View>
            </View>
            
          </View>
          
        <View style={styles.dashboard}>
            <Home 
            setState ={() => {setModalVisible(true); setModalState(4)}} 
            getVal={getVal}

            ></Home>
        </View>
        
      </View>

      <View style={styles.content}>

        <View style={styles.accountInfo}>

        <View style={styles.Info}>

        <View style={styles.brand}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>Name:</Text>
          </View>
          <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
          <Text style={styles.brandInput}>{currentUser?.displayName}</Text>
          </View>
        </View>

        <View style={styles.brand}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>Email:</Text>
          </View>
          <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
          <Text style={styles.brandInput}>{currentUser?.uid}</Text>
          </View>
        </View>
  
        </View>

        <TouchableOpacity onPress={() => {
              signOutUser().then(() => {
                navigation.navigate("FirstPageWeb")
              }) 
            }}
            style={styles.buttonLogIn}>
            <Text style={styles.Textcolour} >Sign out</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.animalInfo}>

        <View style={styles.animals}>
            {
                getAnimals()
            
            }

            </View>
            <TouchableOpacity 
            style={styles.addAnimal}
            onPress={() => {
                //navigation.navigate("Animal", {new:true})
                console.log("HEREEEE")
                setNewOrNot(true)
                setModalVisible(true); 
                setModalState(5)
            }}
            >
                <Text>Add</Text>
            </TouchableOpacity>

        </View>

     </View>

      {displayModal()}

     </View>
     </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
    addAnimal:{
        marginLeft: 95,
        marginVertical: 25,
        // alignSelf: "center",
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        width: 70,
        height: 40,
        alignItems: "center",
        padding: 9
      },
      
      animals:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 40,
        marginTop: 10
      },
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
  content:{
    height: "70%",
    width: "65%",
    position: "absolute",
    top: "20%",
    left: "8%",
    justifyContent: "space-between"
  },
  accountInfo:{
    borderWidth: 0.5,
    height: "25%",
    flexDirection: "row"
  },
  animalInfo:{
    borderWidth: 0.5,
    height: "60%",
  },
  Info:{
      marginTop: 5,
      flexDirection: "row",
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
    brandtxt:{
      color: "white",
      width: 45,
      fontSize: 12,
      marginLeft: 4
    },
    brandInputView:{
      margin: 5,
      width: 230,
    },
    brandInputViewWeb:{
      margin: 10,
    },
     buttonLogIn:{
        width: 100,
      borderColor: "white",
      borderWidth: 1,
      backgroundColor: "#51759e",
      alignItems: "center",
      padding: 20,
      margin: 20,
      borderRadius: 10,
  
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 5,  
      elevation: 10,
    },
    Textcolour:{
      color: "white"
    },
    brandInput: {
        borderWidth: 0.5,
        borderColor: "#B3B3B3",
        borderRadius: 5,
        paddingLeft: 10,
        paddingTop: 13,
        width: 300,
        height: 80
      },
      card:{
      marginVertical: 5
    },
     cross: {
      marginLeft: 5,
      alignSelf: "flex-end",
    },
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
    image:{
      height: 75,
      width: 80

    },
     bottomsheetAnimalTextView:{
      marginVertical: 10,
      width: "100%",
      alignItems: "center"
    },
})

export default AccountWeb