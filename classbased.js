import React from "react"
import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';
 
export default class ABCDE extends React.Component {
 
  constructor(props) {
 
    super(props);
 
    this.state = {
      isLoading: true,
      text: '',
      data: []
    }
 
    this.arrayholder = [];
  }
 
  componentDidMount() {
 
    return fetch('https://api.covid19api.com/countries')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoading: false,
          data: responseJson,
        }, () => {
          // In this block you can do something with new state.
          this.arrayholder = responseJson;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
 
  GetFlatListItem(name) {
    Alert.alert(name);
  }
 
  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.Country.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
 
    this.setState({
      data: newData,
      text: text
      })
    }
 
    itemSeparator = () => {
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
 
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer}>
   
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
 
        <FlatList
          data={this.state.data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={this.itemSeparator}
        //   renderItem={({ item }) => <Text style={styles.row}
        //   onPress={this.GetFlatListItem.bind(this, item.Country)} >{item.Country}</Text>}
        renderItem={({ item }) => { console.log(item.Country) }}
          style={{ marginTop: 10 }} />
 
      </View>
    );
  }
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