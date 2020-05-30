import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';


const Screen2 = ({navigation, route}) => {
    const [items, setItems] = useState();
    const [loading , setLoading] = useState(true)
  
    var slug = route.params.Country   

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
export default Screen2