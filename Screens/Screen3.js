import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';


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
export default Screen3