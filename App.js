import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import ABCDE from './classbased';
import ABCDEE from './funcbased';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

 function MyTabs() {
   return (
    <Tab.Navigator  
     activeColor = '#ffffff'
     inactiveColor = '#ffffff'
     barStyle = {{backgroundColor: '#696969'}}
     shifting = {true}>
       <Tab.Screen name="Home" component={Cont1} options = {{tabBarIcon: () => 
         <Entypo name="home" size={24}  />
       }} />
       <Tab.Screen name="Explore" component={Cont2} options = {{tabBarIcon: () => 
        <MaterialIcons name="explore" size={24} /> 
       }} />
       <Tab.Screen name="Subscriptions" component= {Cont3} options = {{tabBarIcon: () => 
       <MaterialIcons name="subscriptions" size={24}  /> 
       }} />
       <Tab.Screen name="Inbox"  component = {Cont4} options = {{tabBarIcon: () =>
       <MaterialIcons name="inbox" size={24}  />
       }}/>
       <Tab.Screen name="Library"  component = {Cont5} options = {{tabBarIcon: () =>
       <MaterialIcons name="video-library" size={24}  />
       }}/>
     </Tab.Navigator>
   );
 }

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Screen3" component={Screen3} />
      <Drawer.Screen name="Screen4" component={Screen4} />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

const N1 = () => {
  return (
  <Stack.Navigator
    screenOptions= {({navigation}) => ({
      title : "Covid19", 
      headerLeft: ()=> <Ionicons name="md-menu" size={45} color="red" onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}/>,
      headerRight: ()=> <MaterialIcons name="search" size={45} color="black"  />
    })}
  >
        <Stack.Screen name="Home" component={MyDrawer} />

        <Stack.Screen 
        name="Screen2" 
        component={Screen2}
        options = {({navigation}) => ({
          title: "screen2",
          headerLeft: () => <Ionicons name="md-arrow-round-back" size={24} color="black" 
            onPress ={()=> navigation.goBack()}
          />,
          headerRight: false
        })}
        
         />
        </Stack.Navigator>
  )
}

const N2 = () => {
  return (
  <Stack2.Navigator>
        <Stack2.Screen name="Cont1"
        component={MyTabs} />
        </Stack2.Navigator>
  )
}

const Screen1 = ({navigation}) => {
  return(
    // <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
    //   <Text>Screen1</Text>
    //   <Button title = "Go to Screen 2"
    //     onPress = {() => navigation.navigate("Screen2")}
    //   ></Button>
    // </View>
    <ABCDEE/>

  )
}
const Screen2 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Screen2</Text>
    </View>

  )
}
const Screen3 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      setItems(result.Global)
      setLoading(false)
    }
    )}

    useEffect(() => {
      fetchAPI();
    })
  
  
  return( 
    <View>
    {loading === false ?  
     <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Screen3</Text>
      <Text>New Confirmed  {items.NewConfirmed}</Text>
      <Text>Total Confirmed  {items.TotalConfirmed}</Text>
      <Text>New Deaths  {items.NewDeaths}</Text>
      <Text>New Recovered  {items.NewRecovered}</Text>
      <Text>Total Recovered  {items.TotalRecovered}</Text>

     </View>
: <Text>Loading</Text>
      } 
    </View> )
}
    

  
const Screen4 = () => {
  return(
      <N2/>
  )
}

const Cont1 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Cont1</Text>
    </View>

  )
}

const Cont2 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Cont2</Text>
    </View>

  )
}

const Cont3 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Cont3</Text>
    </View>

  )
}

const Cont4 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Cont4</Text>
    </View>

  )
}

const Cont5 = () => {
  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
      <Text>Cont5</Text>
    </View>

  )
}

export default function App() {
  return (
      
      <NavigationContainer>
        <N1 />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
