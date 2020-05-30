import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';


const Europe = () => {
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
  export default Europe