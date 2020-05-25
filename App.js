import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button} from 'react-native';

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
       <Tab.Screen name="Asia" component={Cont1} options = {{tabBarIcon: () => 
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
            onPress ={()=> {navigation.goBack()}}
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
        <Stack2.Screen name="Asia"
        component={MyTabs} />
        </Stack2.Navigator>
  )
}

const Screen1 = ({navigation}) => {
  const [arrayholder,setArrayholder] =useState([])
  const [text, setText] = useState('')
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(true)
  const [country, setcountry] = useState('')

  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


  const fetchAPI = (url)=> {
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        setData(responseJson)
        setArrayholder(responseJson)
        setLoading(false)
    }
    
    )
    .catch((error) => {
        console.error(error);
      });
}
 
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchAPI("https://api.covid19api.com/countries");
      });

      return unsubscribe;
    }, [navigation]);
   
 
  const searchData= (text)=>  {
    data.sort(compareValues('Country'))
    const newData = arrayholder.filter(item => {
      const itemData = item.Country.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

      setData(newData)
      setText(text)
    }
 
   const itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
    
  return(
    // <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
    //   <Text>Screen1</Text>
    //   <Button title = "Go to Screen 2"
    //     onPress = {() => navigation.navigate("Screen2")}
    //   ></Button>
    // </View>
    //<ABCDEE/>

          <View>
    {loading === false ?  
        <View style={styles2.MainContainer}>
   
        <TextInput 
         style={styles2.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
 
        <FlatList
          data={data.sort(compareValues('Country'))}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={itemSeparator}
           renderItem={({ item }) => (
            <TouchableOpacity
                onPress = {()=> {
                   // setscreen('dbac')
                    setcountry(item.Slug)
                    //console.log(country)
                    console.log("exit screen 1")
                    navigation.navigate("Screen2", {ab: item.Slug })
                }
                }
            >

               <View>
              <Text style={styles2.row}>{item.Country}</Text>
              </View>
              </TouchableOpacity>
            )}
          style={{ marginTop: 10 }} />
 
      </View>
      : <Text>loading</Text>}

      </View>
    );
  }


const Screen2 = ({navigation, route}) => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  var slug = route.params.ab
  console.log(slug)

  const fetchAPI = ()=> {
    return fetch('https://api.covid19api.com/live/country/' + slug)
    .then((response) => response.json())
    .then((result) => {
     console.log(result[0])
      setItems(result[0])
      setLoading(false)
    }
    )
    .catch((error) => {
      console.error(error);
    });}

    useEffect(() => {
      fetchAPI();
    },[])
  
  return(
    <View>
    {loading === false ?  
     <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>
     <Text>Screen2</Text>
      <Text>Country  {items.Country}</Text>
      <Text>Total Confirmed  {items.Confirmed}</Text>
      <Text>New Deaths  {items.Deaths}</Text>
      <Text>New Recovered  {items.Recovered}</Text> 
      <Text>Total Recovered  {items.TotalRecovered}</Text> 
      <Text>Hello</Text>

     </View>
: <Text>Loading</Text>
      } 
    </View> )
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
    )
    .catch((error) => {
      console.error(error);
    });}

    useEffect(() => {
      fetchAPI();
    },[])
  
  
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
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/asia")
    .then((response) => response.json())
    .then((result) => {
      //console.log(result.countries)
      setItems(result.countries)
      setLoading(false)
    }
    )
    .catch((error) => {
      console.error(error);
    });}

    useEffect(() => {
      fetchAPI();
    },[])
  

  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>

    {loading === false ?
      <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>: <Text>Loading</Text>}
    </View>
    
  )
      }

const Cont2 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/europe")
    .then((response) => response.json())
    .then((result) => {
      //console.log(result.countries)
      setItems(result.countries)
      setLoading(false)
    }
    )
    .catch((error) => {
      console.error(error);
    });}

    useEffect(() => {
      fetchAPI();
    },[])
  

  return(
    <View style = {{ padding: 50,justifyContent: "center", alignItems: "center"}}>

    {loading === false ?
      <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>: <Text>Loading</Text>}
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
const styles2 = StyleSheet.create({
 
  MainContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    minHeight: 800
 
  },
 
  row: {
    fontSize: 18,
    padding: 12
  },
 
  textInput: {
 
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"
 
  }
});