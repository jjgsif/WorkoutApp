import { StyleSheet, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TabTwoScreen() {
  var db = SQLite.openDatabase('workouts.db');

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({name: "", weight: 0, goalWeight: 0, favorite1: "", favorite2: "", favorite3: ""});
  const [userExists, setExistence] = useState(false);

  useEffect(()=>{
    db.transaction((tx)=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS profile(name TEXT PRIMARY KEY, weight INTEGER, goalWeight INTEGER, favorite1 TEXT, favorite2 TEXT, favorite3 TEXT);");
    }
    );
    db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM profile", null!, (txObj, resultRow)=>{if(resultRow.rows._array.length === 1) setExistence(true)})
    })
  },[]);
  const userSheet = () =>{

  }
  const createUser = (exists:boolean) => {
    if(exists){return userSheet();}
    else {return (
      <View style = {styles.container}>
        <TextInput style={styles.input}placeholder='Name' onChangeText={(text)=>{setProfile({name: text, weight: profile.weight, goalWeight: profile.goalWeight, favorite1: profile.favorite1, favorite2: profile.favorite2, favorite3: profile.favorite3})}}/>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.text}>Optional Fields</Text>
      </View>
    );}
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {createUser(userExists)!}
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
      width: "auto",
      textAlign: 'center',
      alignSelf:'center'
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10, 
      width: "100%"
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 10,
      marginTop: 10,
      alignSelf:'center',
      textAlign: 'center',
      alignContent: 'center'
  },
  separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
      color: "white"
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      marginTop: 20,
      width: '70%',
      color: "white", 
      textAlign: 'center'
    }
});
