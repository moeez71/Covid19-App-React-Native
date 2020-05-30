import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import Asia from "./Continents/Asia"
import Europe from "./Continents/Europe"
import Africa from "./Continents/Africa"
import NorthAmerica from "./Continents/N.America"
import SouthAmerica from "./Continents/S.America"
import Australia from "./Continents/Australia"

import compareValues from "./SortFunction"

import Screen1 from "./Screens/Screen1"
import Screen2 from "./Screens/Screen2"
import Screen3 from "./Screens/Screen3"


const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen 
        name="All Countries"
        component={Screen1} 
        options= {{drawerIcon: ()=> 
          <View style= {{paddingLeft: 5}}>
            <FontAwesome5 
              name="flag"
              size={20} 
              color="black" />
          </View>
        }}/>
        
      <Drawer.Screen 
        name="Global Summary"
        component={Screen3} 
        options= {{drawerIcon: ()=> 
          <View style= {{paddingLeft: 5}}>
            <Fontisto 
              name="world-o" 
              size={20} 
              color="black" />
          </View>
        }}/>

      <Drawer.Screen 
        name="Continent Stats" 
        component={Screen4}
        options= {{drawerIcon: ()=> 
          <View style= {{paddingLeft: 5}}>
            <MaterialCommunityIcons 
              name="earth-box" 
              size={22} 
              color="black" />
          </View>
        }}/>

    </Drawer.Navigator>
  );
}


 function MyTabs() {
   return (
    <Tab.Navigator  
     activeColor = '#ffffff'
     inactiveColor = '#ffffff'
     barStyle = {{backgroundColor: '#b0c4de',}}
     shifting = {false}
     >

       <Tab.Screen name="Asia" component={Asia} options = {{tabBarIcon: () => 
          <Image source={require("./Pictures/asia.png")} style={{width: 40,height: 25}}></Image>,
       }} />

       <Tab.Screen name="Europe" component={Europe} options = {{tabBarIcon: () => 
        <Image source={require("./Pictures/europe.png")} style={{width: 40,height: 25}}></Image>
       }} />

       <Tab.Screen name="Africa" component= {Africa} options = {{tabBarIcon: () => 
         <Image source={require("./Pictures/africa.png")} style={{width: 40,height: 25}}></Image>
       }} />

       <Tab.Screen name="N.America"  component = {NorthAmerica} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/north-america-map.png")} style={{width: 40,height: 25}}></Image>
       }}/>

       <Tab.Screen name="S.America"  component = {SouthAmerica} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/south-america-map.png")} style={{width: 40,height: 25}}></Image>
       }}/>

       <Tab.Screen name="Australia"  component = {Australia} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/australia.png")} style={{width: 40,height: 25}}></Image>
       }}/>

     </Tab.Navigator>
   );
 }


const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

const Navigator1 = () => {
  return (
  <Stack.Navigator
    screenOptions= {({navigation}) => ({
      title : "Covid-19", 
      headerTintColor: "black",
      headerStyle: {backgroundColor: "#b0c4de"},
      headerLeft: ()=> 
        <View style= {{paddingLeft:15}}>
          <Ionicons 
            name="md-menu" 
            size={40} 
            color="red" 
            onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}/>
        </View>
    })}>

        <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen 
          name="Screen2" 
          component={Screen2}
          options = {({navigation}) => ({
          title: "",
          headerLeft: () =>
            <View style= {{paddingLeft:15}}>
              <Ionicons 
                name="md-arrow-round-back" 
                size={24} color="black" 
                onPress ={()=> {navigation.goBack()}}
              />
            </View>,
          })}
         />
        </Stack.Navigator>
  )
}

const Navigator2 = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen 
        name= "Continents"
        component={MyTabs}
        options = {{headerShown : false}} />
    </Stack2.Navigator>
  )
}



const Screen4 = () => {
  return(
      <Navigator2/>
  )
}

export default function App() {
  return (
      
      <NavigationContainer>
        <Navigator1 />
      </NavigationContainer>
  );
}

