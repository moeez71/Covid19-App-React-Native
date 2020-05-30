import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';

const Asia = () => {
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


export default Asia