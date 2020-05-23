import React, {useState, useEffect} from "react"
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';

export default function ABCDEE(){


  const [arrayholder,setArrayholder] =useState([])
  const[text, setText] = useState('')
  const[data, setData] = useState([])
  const [loading , setLoading] = useState(true)

  const fetchAPI = ()=> {
    return fetch('https://api.covid19api.com/countries')
    .then((response) => response.json())
    .then((responseJson) => {
        setData(responseJson)
        setLoading(false)
        setArrayholder(responseJson)
    }

    )
    .catch((error) => {
        console.error(error);
        throw error;
      });
}

  useEffect(() => {
    fetchAPI();
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
          renderItem={( {item}  ) => <Text style={styles.row}
           >{item.Country}</Text>}
          style={{ marginTop: 10 }} />

      </View>
      : <Text>loading</Text>}

      </View>
    );
  }


const styles = StyleSheet.create({

  MainContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    flex: 1,
    margin: 5,

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