import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from 'react-native';

import FirstPage from './src/screens/Mobile/FirstPage';
import SignUp from './src/screens/Mobile/SignUp';
import LogIn from './src/screens/Mobile/LogIn';

import FirstPageWeb from './src/screens/Web/FirstPageWeb';
import CalendarWeb from './src/screens/Web/CalendarWeb';

import Home from './src/screens/Mobile/Home';
import CalendarPage from './src/screens/Mobile/CalendarPage';
import Expense from './src/screens/Mobile/Expense';
import Info from './src/screens/Mobile/Info'
import Account from './src/screens/Mobile/Account'
import Animal from './src/screens/Mobile/Animal';

import {UserProvider} from './src/context/UserContext';
import {RecordProvider} from './src/context/RecordContext';
import {AnimalProvider} from './src/context/AnimalContext';

import EditRecord from './src/screens/Mobile/EditRecord';
import AccountWeb from './src/screens/Web/AccountWeb'


// let platform = Platform.OS
let web = false;
if (Platform.OS === 'web')
{
  web = true;
}


const Main = () => {
  const Tab = createBottomTabNavigator();
  return(
  <Tab.Navigator initialRouteName='Home' 
    screenOptions={{
      headerTintColor: "#D9D9D9",
      headerStyle: {
        backgroundColor: "#51759e",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 90,
      },
      headerTitleAlign: "center",
      tabBarStyle: {
        backgroundColor: "#51759e",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: 75,
        // marginTop: 5,
        // display: web ? "none" : "flex"
        
      },
      tabBarItemStyle: {
        borderRadius: 15,
      },
      tabBarActiveBackgroundColor: "#D9D9D9",
      tabBarShowLabel: false,
    }}
  >

    <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{ 
        tabBarIcon: ({ focused  }) => (
        <AntDesign 
        name="home" 
        size={25} 
        color={focused ? "#51759e" : "#D9D9D9"} />
        )
      }}
    />
    <Tab.Screen 
      name="Calendar" 
      component={CalendarPage} 
      options={{ tabBarIcon: ({ focused }) => (
        <AntDesign 
        name="calendar" 
        size={25} 
        color={focused ? "#51759e" : "#D9D9D9"}/>
        )
      }}
    />
    <Tab.Screen 
      name="EditRecord" 
      component={EditRecord} 
      options={{
          tabBarButton: () => null,
      }}
    />
    <Tab.Screen 
      name="Expense" 
      component={Expense} 
      options={{ tabBarIcon: ({ focused }) => (
        <MaterialIcons 
        name="attach-money" 
        size={27} 
        color={focused ? "#51759e" : "#D9D9D9"} />
        )
      }}
    />
    <Tab.Screen 
      name="Info" 
      component={Info} 
      options={{ tabBarIcon: ({ focused }) => (
        <MaterialIcons 
        name="perm-device-info" 
        size={25} 
        color={focused ? "#51759e" : "#D9D9D9"} />
        )
      }}
    />
    <Tab.Screen 
      name="Account" 
      component={Account} 
      options={{ tabBarIcon: ({ focused }) => (
        <MaterialCommunityIcons 
        name="account-circle-outline" 
        size={25} 
        color={focused ? "#51759e" : "#D9D9D9"} />
        )
      }}
    />
    <Tab.Screen 
      name="Animal" 
      component={Animal} 
      options={{
        tabBarButton: () => null,
    }}
    />
  </Tab.Navigator>
  )
}

export default function App() {
  const Stack = createNativeStackNavigator();
  if ((Platform.OS === 'android') || (Platform.OS === 'ios'))
    {
    return (
      <UserProvider>
        <AnimalProvider>
        <RecordProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='FirstPage' 
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen
            name='FirstPage'
            component={FirstPage}
            />
            <Stack.Screen
            name='LogIn'
            component={LogIn}
            />
            <Stack.Screen
            name='SignUp'
            component={SignUp}
            />
            <Stack.Screen
            name="Main"
            component={Main}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </RecordProvider>
      </AnimalProvider>
      </UserProvider>
      )
    }
  else
    {
      return (
        <UserProvider>
        <AnimalProvider>
        <RecordProvider>
        <NavigationContainer>
         <Stack.Navigator initialRouteName='FirstPageWeb' 
         screenOptions={{
           headerShown: false
         }}
         >
           <Stack.Screen
             name='FirstPageWeb'
             component={FirstPageWeb}
            />
            {/* <Stack.Screen
                name="Main"
                component={Main}
            /> */}
            <Stack.Screen
                name="CalendarWeb"
                component={CalendarWeb}
            />
            <Stack.Screen
                name="AccountWeb"
                component={AccountWeb}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </RecordProvider>
      </AnimalProvider>
      </UserProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
