import {React, useState, useEffect} from 'react'
import { View, StyleSheet, Image} from 'react-native'
import FirstPage from '../Mobile/FirstPage'
import LogIn from '../Mobile/LogIn'
import SignUp from '../Mobile/SignUp'
import NavBar from '../../components/NavBar';
import { useUserContext } from '../../context/UserContext'


const FirstPageWeb = ({navigation}) => {

    const [change, setChange] = useState(1);

    const {currentUser} = useUserContext()

    useEffect(() => {
        if (currentUser){
          navigation.navigate("CalendarWeb")
        }
      }, [])

    const state = () => {
        if (change === 1)
            return(
            <FirstPage 
            
                logIn = {() => { setChange(2) }} 
                signUp = {() => { setChange(3) }} 
            
            > </FirstPage>
            )
        else if (change === 2)
        {
            return(
            <LogIn
                logInPage = {() => { navigation.navigate("CalendarWeb") }} 
            > </LogIn>
            )
        }
        else if (change === 3)
        {
            return(
            <SignUp
                signUpPage = {() => { navigation.navigate("CalendarWeb") }} 
            > </SignUp>
            )
        }
    }

    return (
    <View style={styles.pageWholeNav}>
    <NavBar selected = "1" 
    calendar = {() => {navigation.navigate("CalendarWeb")}}
    expense = {() => {navigation.navigate("Main", {screen: 'Exepnse' })}}
    account = {() => {navigation.navigate("AccountWeb")}}
    > </NavBar>
         
        <View style={styles.pageWhole}>
            <View style={styles.logo}>
                <Image style={styles.image4}
                        source={require('../../components/Picture4.png')}
                />
            </View>

            <View style={styles.topImage}>
                <Image style={styles.image1}
                    source={require('../../components/Picture3.png')}
                />

            </View>
            {/* <View style={styles.middle}> */}
            <View style={styles.image}>
                <Image style={styles.image2}
                    source={require('../../components/Picture2.png')}
                />
            </View>

            <View style={styles.page}>
                {state()}
            </View>
            

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    pageWhole: {
        flexDirection: 'column',
        height: '100%',
        width: '94.5%',
       
    },
    topImage: {
        width: '100%',
        height: '50%'
    },
    image1: {
        height: '100%',
        width: '95.5vw'
    },
    image2: {
        width: '50%',
        height: '100%',
    },
    image: {
        height: '68%',
        width: '48%',
        zIndex: 100,
        position: 'absolute',
        top: '25%',
        left: '15%'
    },
    page: {
        width: '26%',
        height: '70%',
        position: 'absolute',
        top: '22%',
        right: '15%',
        borderRadius: 20,
        backgroundColor: "#51759e",
        overflow: 'hidden'
    },
    page2: {
        width: '26%',
        height: '70%',
        position: 'absolute',
        top: '21%',
        right: '10%',
        borderRadius: 20,
        backgroundColor: "#51759e",
        overflow: 'hidden'
    },
    page3: {
        width: '26%',
        height: '70%',
        position: 'absolute',
        top: '21%',
        right: '25%',
        borderRadius: 20,
        backgroundColor: "#51759e",
        overflow: 'hidden'
    },
    image4:{
        width: '90%',
        height: '60%',
    },
    logo:{
        width: '15%',
        height: '15%',
        position: 'absolute',
        top: '5%',
        left: '4%',
        zIndex: 100,
    },
    pageWholeNav:{
        flexDirection: 'row',
        height: '100%',
    },
})

export default FirstPageWeb