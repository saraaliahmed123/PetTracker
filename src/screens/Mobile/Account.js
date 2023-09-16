import {React, useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Button, Image  } from 'react-native'
import { useUserContext } from '../../context/UserContext';
import { useAnimalContext } from '../../context/AnimalContext';
import { Platform } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';

const Account = ({navigation}) => {
  let platform = Platform.OS

  const {signOutUser, currentUser} = useUserContext()
  const {getAnimalsByUserId, deleteAnimal
    //animalsList
  } = useAnimalContext();

   const [animals, setAnimals] = useState()

  useEffect(() => {
    const sub = () => {
    getAnimalsByUserId().then(records => {
      setAnimals(records)
    })
  }
  sub()
    
  }, [animals])

  const getAnimals = () => {
    if (animals)
        {
      return animals.map((item, key) => {
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
              navigation.navigate("Animal", {animal: item })
            }}>
            <View style={styles.imageView}>
              <View style={styles.image}></View>
             {/* <Image 
                style={styles.image}
                source={{uri:item.image}}
                />   */}
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


  const [page, setPage] = useState(1);
  return (
    <View style={styles.page}>
      <View style={styles.heading}>

        <TouchableOpacity onPress={() => {
              setPage(1)
            }}
            style={page === 1? styles.buttonLogInHcolour: styles.buttonLogInH}>
            <Text style={page === 1? styles.TextcolourHcolour: styles.TextcolourH} >Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              setPage(2)
            }}
            style={page === 2? styles.buttonLogInHcolour: styles.buttonLogInH}>
            <Text style={page === 2? styles.TextcolourHcolour: styles.TextcolourH} >Pets</Text>
          </TouchableOpacity>


      </View>
      {page === 1 ? 
      
      <View style={styles.profile}>
        <View style={styles.Info}>

        <View style={styles.brand}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>Name:</Text>
          </View>
          <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
          <Text style={styles.brandInput}>{currentUser?.providerData[0].displayName}</Text>
          </View>
        </View>

        <View style={styles.brand}>
          <View style={styles.titleBox}>
            <Text style={styles.brandtxt}>Email:</Text>
          </View>
          <View  style={platform === "web" ? styles.brandInputViewWeb : styles.brandInputView}>
          <Text style={styles.brandInput}>{currentUser?.providerData[0].uid}</Text>
          </View>
        </View>

  
        </View>
        <TouchableOpacity onPress={() => {
              signOutUser().then(() => {
                navigation.navigate("FirstPage")
              }) 
            }}
            style={styles.buttonLogIn}>
            <Text style={styles.Textcolour} >Sign out</Text>
          </TouchableOpacity>
      </View>

    :

    <ScrollView>
    <View style={styles.animalsView}>
    <View style={styles.animals}>
      {
        getAnimals()
      }
    </View>
    <TouchableOpacity 
      style={styles.add}
      onPress={() => {
        navigation.navigate("Animal", {new:true})
      }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
    
    </ScrollView>
    }
    </View>
  ) 
  
  
}

const styles = StyleSheet.create({
    page: {
        alignItems: 'center',
        height: '100%'
    },
    Textcolour:{
      color: "white"
    },
    buttonLogIn:{
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
    brandInput: {
      borderWidth: 0.5,
      borderColor: "#B3B3B3",
      borderRadius: 5,
      height: "100%",
      paddingLeft: 10,
      paddingTop: 13
    },
    Info:{
      marginTop: 5
    },
    heading:{
      flexDirection: "row",
      marginTop: 20
    },
    buttonLogInH:{
      margin: 25,
      borderBottomWidth: 0.5
    },
    buttonLogInHcolour:{
      margin: 25,
      borderBottomWidth: 0.5,
      borderBottomColor: "#51759e"
    },
    TextcolourHcolour:{
      color: "#51759e"
    },
    TextcolourH:{
      color: "black"
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
    cross: {
      marginLeft: 5,
      alignSelf: "flex-end",
    },
    animals:{
      flexDirection: "row",
      flexWrap: "wrap",
    },
    animalsView:{
      width: 300,
      paddingLeft: 23,
    },
    add:{
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
    card:{
      marginVertical: 5
    }
  
  })

export default Account