import React, {useState, useEffect} from "react"
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, Button } from 'react-native';

 
export default function ABCDEE({navigation}){
 
    
  const [arrayholder,setArrayholder] =useState([])
  const [text, setText] = useState('')
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(true)
  const [country, setcountry] = useState('')

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
    fetchAPI("https://api.covid19api.com/countries");
  },[])
 
 
  const searchData= (text)=>  {
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
    
    const Screeeen1 = () => {
      return (
          <View>
    {loading === false ?  
        <View style={styles.MainContainer}>
   
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
 
        <FlatList
          data={data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={itemSeparator}
           renderItem={({ item }) => (
            <TouchableOpacity
                onPress = {({navigation})=> {
                   // setscreen('dbac')
                    setcountry(item.Slug)
                    console.log(country)
                    navigation.navigate("Screen2")
                }
                }
            >

               <View>
              <Text style={styles.row}>{item.Country}</Text>
              </View>
              </TouchableOpacity>
            )}
          style={{ marginTop: 10 }} />
 
      </View>
      : <Text>loading</Text>}

      </View>
    );
  }

  const Screeen2 = () => {

    const fetchAPI = (url)=> {
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            setData2(responseJson)
            console.log(data2)
            
        }
        )
        .catch((error) => {
            console.error(error);
          });
    }
     
      useEffect(() => {
        fetchAPI("https://api.covid19api.com/live/country/south-africa");
      },[country])

      return(
      <View>
          <Text>Agaya ty jawan ho k</Text>
          <Button title= "Return"
                    onPress= {()=> {
                        setscreen("Abc")
                        setcountry('')
                    }}
          ></Button>
      </View>
      )
  }


    return(
        <View>
        {screen === "Abc" ? <Screeeen1/>: <Screeen2/>}

        </View>
        
    )

    }
const styles = StyleSheet.create({
 
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