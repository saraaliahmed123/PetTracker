import {React} from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from '../context/UserContext';

const NavBar = ({navigation, calendar, selected, home, expense, account}) => {

    const {currentUser} = useUserContext();

  return (
    <View style={styles.navBar}>

        <TouchableOpacity 
        style={selected==="1" ? [styles.nav, styles.selected] : styles.nav}
        onPress={() => {
            home()
        }}
        >
            <AntDesign 
                name="home" 
                size={20} 
                color={ selected==="1" ? "#51759e": "#D9D9D9"} 
            />
        </TouchableOpacity>

        <TouchableOpacity style={selected==="2" ? [styles.nav, styles.selected] : styles.nav}
        onPress={() => {
            currentUser ? calendar() : console.log("User does not exist")
        }}
        >
            <AntDesign 
                name="calendar" 
                size={20} 
                color={ selected==="2" ? "#51759e": "#D9D9D9"} 
            />
        </TouchableOpacity>

        <TouchableOpacity 
        style={selected==="3" ? [styles.nav, styles.selected] : styles.nav}
         onPress={() => {
            currentUser ? expense() : console.log("User does not exist")
        }}
        >
            <MaterialIcons 
                name="attach-money" 
                size={21} 
                color={ selected==="3" ? "#51759e": "#D9D9D9"} 
            />
        </TouchableOpacity>

        <TouchableOpacity style={selected==="4" ? [styles.nav, styles.selected] : styles.nav}
        onPress={() => {
            currentUser ? navigation.navigate("Main", {screen: "Info"}) : console.log("User does not exist")
        }}
        >
            <MaterialIcons 
                name="perm-device-info" 
                size={20} 
                color={ selected==="4" ? "#51759e": "#D9D9D9"} 
            />
        </TouchableOpacity>

        <TouchableOpacity style={selected==="5" ? [styles.nav, styles.selected] : styles.nav}
        onPress={() => {
            currentUser ? account() : console.log("User does not exist")
        }}
        >
            <MaterialCommunityIcons 
                name="account-circle-outline" 
                size={20} 
                color={ selected==="5" ? "#51759e": "#D9D9D9"} 
            />
        </TouchableOpacity>

        </View>
  )
}

const styles = StyleSheet.create({
    navBar:{
        height: '100%',
        width: '4.5%',
        borderRadius: 5,
        backgroundColor: "#51759e",
        flexDirection: 'column',
        alignItems: 'center',
    },
    nav: {
        marginTop: 50
    },
    selected:{
        backgroundColor: "#D9D9D9",
        height: 40,
        width: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default NavBar