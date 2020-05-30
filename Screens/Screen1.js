import React, {useState, useEffect}  from 'react';
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import compareValues from ".././SortFunction"

const Screen1 = ({navigation}) => {
    const [data, setData] = useState([])
    const [loading , setLoading] = useState(true)
    const [arrayholder,setArrayholder] =useState([])
    const [text, setText] = useState('')
    
    const fetchAPI = (url)=> {       //API Call method
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          setData(responseJson)
          setArrayholder(responseJson)
          setLoading(false)
      })                                
      .catch((error) => {
          console.error(error);
        });
  }

    useEffect(() => { //Focus property used so when user comes back to screen 1 from
      //screen2 , screen1 refreshes and all state data that was assigned gets 
      //hardcodedvold values
        const unsubscribe = navigation.addListener('focus', () => {   
          fetchAPI("https://api.covid19api.com/countries");
        });
        return unsubscribe;
      }, [navigation]);
     
   
    const searchData= (text)=>  {   
      data.sort(compareValues('Country'))   
      //uses the imported sort method to sort countries alphabetically
      const newData = arrayholder.filter(item => {
        const itemData = item.Country.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
  
        setData(newData)
        setText(text)
      }
   
     const itemSeparator = () => {
       //for Flat List components ItemSeparator Component
        return (
          <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#2f4f4f",
            }}/>);
      }
      
    return(
            <View>
      {loading === false ?  //If loading is set to false render
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
                //console.log(country)
                console.log("exit screen 1")
                navigation.navigate("Screen2", {Country: item.Slug })
                  }}> 

                 <View>
                  <Text style={styles2.row}>{item.Country}</Text>
                </View>

              </TouchableOpacity>
              )}
            />
   
        </View>
        : <ActivityIndicator/>}
  
        </View>
      );
    }

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
  

export default Screen1