import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import Asia from "./Continents/Asia"


import ABCDE from './classbased';
import ABCDEE from './funcbased';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
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
       <Tab.Screen name="Europe" component={Cont2} options = {{tabBarIcon: () => 
        <Image source={require("./Pictures/europe.png")} style={{width: 40,height: 25}}></Image>
       }} />
       <Tab.Screen name="Africa" component= {Cont3} options = {{tabBarIcon: () => 
         <Image source={require("./Pictures/africa.png")} style={{width: 40,height: 25}}></Image>
       }} />
       <Tab.Screen name="N.America"  component = {Cont4} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/north-america-map.png")} style={{width: 40,height: 25}}></Image>
       }}/>
       <Tab.Screen name="S.America"  component = {Cont5} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/south-america-map.png")} style={{width: 40,height: 25}}></Image>
       }}/>
       <Tab.Screen name="Australia"  component = {Cont6} options = {{tabBarIcon: () =>
       <Image source={require("./Pictures/australia.png")} style={{width: 40,height: 25}}></Image>
       }}/>
     </Tab.Navigator>
   );
 }

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="All Countries" component={Screen1} 
      options= {{drawerIcon: ()=> 
        <View style= {{paddingLeft: 5}}>
          <FontAwesome5 name="flag" size={20} color="black" />
        </View>
        }}/>
        
      <Drawer.Screen name="Global Summary" component={Screen3} 
         options= {{drawerIcon: ()=> 
        <View style= {{paddingLeft: 5}}>
          <Fontisto name="world-o" size={20} color="black" />
        </View>
        }}
      />
      <Drawer.Screen name="Continent Stats" component={Screen4}
        options= {{drawerIcon: ()=> 
        <View style= {{paddingLeft: 5}}>
          <MaterialCommunityIcons name="earth-box" size={22} color="black" />
        </View>
        }}
         />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

const N1 = () => {
  return (
  <Stack.Navigator
    screenOptions= {({navigation}) => ({
      title : "Covid-19", 
      headerTintColor: "black",
      headerStyle: {backgroundColor: "#b0c4de"},
      headerLeft: ()=> 
      <View style= {{paddingLeft:15}}>
      <Ionicons name="md-menu" size={40} color="red" onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}/>
      </View>
    })}
  >
        <Stack.Screen name="Home" component={MyDrawer} />

        <Stack.Screen 
        name="Screen2" 
        component={Screen2}
        options = {({navigation}) => ({
          title: "",
          headerLeft: () =>
          <View style= {{paddingLeft:15}}>
           <Ionicons name="md-arrow-round-back" size={24} color="black" 
            onPress ={()=> {navigation.goBack()}}
          />
          </View>,
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
        component={MyTabs}
        options = {{headerShown : false}} />
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
            height: 2,
            width: "100%",
            backgroundColor: "#2f4f4f",
          }}
        />
      );
    }
    
  return(
          <View>
    {loading === false ?  
        <View style={styles2.MainContainer}>
   
        <TextInput 
         style={styles2.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Country Here" />
 
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
          style={{ marginTop: 0 }} />
 
      </View>
      : <ActivityIndicator/>}

      </View>
    );
  }


const Screen2 = ({navigation, route}) => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  var slug = route.params.ab
  console.log(slug)

  const fetchAPI = ()=> {
    return fetch('https://api.covid19api.com/dayone/country/' + slug)
    .then((response) => response.json())
    .then((result) => {
     console.log(result)
      setItems(result)
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
     <View style= {{}}>

     <View style = {{justifyContent: "center", alignItems: "center" , flexDirection: "row",}}>
     <Text style = {{padding : 10,fontWeight: "bold", fontSize: 22, fontFamily: "serif"}}>{items[0].Country} </Text>
      </View>

      <View style= {{paddingTop: 30, paddingLeft: 70}}>


      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> First Case Date: </Text>
        <Text style= {{color: "red"}}>{items[0].Date}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> First Day Cases Active: </Text>
        <Text style= {{color: "red"}}>{items[0].Active}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> First Day Cases Confirmed: </Text>
        <Text style= {{color: "red"}}>{items[0].Confirmed}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> First Day Deaths: </Text>
        <Text style= {{color: "red"}}>{items[0].Deaths}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> Total Confirmed Cases: </Text>
        <Text style= {{color: "red"}}>{items[items.length - 1].Confirmed}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> Total Deaths: </Text>
        <Text style= {{color: "red"}}>{items[items.length - 1].Deaths}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> Active Cases: </Text>
        <Text style= {{color: "red"}}>{items[items.length - 1].Active}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> Total Recovered: </Text>
        <Text style= {{color: "green"}}>{items[items.length - 1].Recovered}</Text>
      </View>
      </View>

     </View>
: <ActivityIndicator/>
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
     <View style = {{}}>
      <View style = {{justifyContent: "center", alignItems: "center"}}>
      <Text style = {{padding : 10,fontWeight: "bold", fontSize: 30, fontFamily: "serif"}}>Global Summary</Text>
      </View>

      <View style = {{paddingTop: 30, paddingLeft: 120}}>

      <View style = {{padding: 4,flexDirection: "row" , justifyContent : "flex-start"}}>
        <Text style={{fontWeight: "bold", paddingRight:6}}> New Confirmed:  </Text>
        <Text style= {{color: "red"}}>{items.NewConfirmed}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row"}}>
        <Text style={{fontWeight: "bold", paddingRight:4}}> Total Confirmed:  </Text>
        <Text style= {{color: "red"}}>{items.TotalConfirmed}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row"}}>
        <Text style={{fontWeight: "bold", paddingRight:30}}> New Deaths:  </Text>
        <Text style= {{color: "red"}}>{items.NewDeaths}</Text>
      </View>

      
      <View style = {{padding: 4,flexDirection: "row"}}>
        <Text style={{fontWeight: "bold", paddingRight:26}}> Total Deaths:  </Text>
        <Text style= {{color: "red"}}>{items.TotalDeaths}</Text>
      </View>

      <View style = {{padding: 4,flexDirection: "row"}}>
        <Text style={{fontWeight: "bold", paddingRight:7}}> New Recovered:  </Text>
        <Text style= {{color: "green"}}>{items.NewRecovered}</Text>
      </View>

      
      <View style = {{padding: 4,flexDirection: "row"}}>
        <Text style={{fontWeight: "bold", paddingRight:3}}> Total Recovered:  </Text>
        <Text style= {{color: "green"}}>{items.TotalRecovered}</Text>
      </View>

      </View>

     </View>
: <ActivityIndicator/>
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>Asia</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>Europe</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
    </View>
    
  )
}

const Cont3 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/africa")
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>Africa</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
    </View>
    
  )
}


const Cont4 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/north")
    .then((response) => response.json())
    .then((result) => {
      console.log(result.countries)
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>North America</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
    </View>
    
  )
}

const Cont6 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/australia")
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>Australia</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items.sort(compareValues('name'))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
    </View>
    
  )
}

const Cont5 = () => {
  const [items, setItems] = useState();
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch("https://covid19-update-api.herokuapp.com/api/v1/world/continent/south")
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
    <View >

    {loading === false ?
      <View>

      <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
      <Text style = {{fontWeight: "bold", fontSize: 30, fontFamily: "serif", borderRadius: 10, borderColor: "black", borderWidth: 2, padding:5, backgroundColor: "grey"}}>South America</Text>
      </View>

      <View style= {{padding: 5, backgroundColor: '#ffff'}}>

      <FlatList
        style= {{borderWidth: 2, paddingLeft: 20}}
        data={items.sort(compareValues('name'))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <View >
        <Text style ={{fontWeight: "bold"}}>Country : {item.name}</Text>
        <Text>Total Cases : {item.cases}</Text>
        <Text style= {{color: "red"}}>Deaths : {item.deaths}</Text>
        <Text></Text>
        </View>
        )
        }
      />
      </View>
      </View>: <ActivityIndicator/>}
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
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ffff',
 
  },
 
  row: {
    fontSize: 15,
    padding: 15
  },
 
  textInput: {
 
    textAlign: 'center',
    height: 42,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 120,
    backgroundColor: "#FFFF",
  }
});