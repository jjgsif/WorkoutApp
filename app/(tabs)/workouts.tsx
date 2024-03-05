import { Pressable, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SQLite from "expo-sqlite"
import {useState, useEffect} from "react";




export default function TabTwoScreen() {
    
    


  return (
    <View style={styles.container}>
      <Link href={"/newWorkout"} style={{paddingTop: 10,
      marginTop: 10}}><Text style={styles.title}><FontAwesome name="plus-circle" size={24}/> Add new workout</Text></Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.5)" />
      {dbApp()}
    </View>
  );
}


function dbApp(){
  const db = SQLite.openDatabase('workouts.db');
  const [isLoading, setLoading] = useState(true);
  const [names, setNames] = useState([{"daylogged": "","id": -1, "name": ""}]);

  useEffect(()=>{
    //  db.transaction(tx=>
    //   {tx.executeSql("DROP TABLE exercise;", null!, (txObj, resultSet) => {console.log(resultSet.rowsAffected)}, (txObj, error) => console.log(error));
    //    });
    //    db.transaction(tx=>
    //     {tx.executeSql("DROP TABLE workouts;", null!, (txObj, resultSet) => {console.log(resultSet.rowsAffected)}, (txObj, error) => console.log(error));
    //      });
    db.transaction(tx=>// @ts-ignore
    {tx.executeSql("CREATE TABLE IF NOT EXISTS exercise (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, reps INTEGER, workout INTEGER, weight INTEGER, lbs BOOLEAN);", null!, (txObj, resultSet) => {}, (txObj, error) => console.log(error));
    });
    db.transaction(tx=> // @ts-ignore
      {tx.executeSql("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, daylogged DATETIME);", null!, (txObj, resultSet) => {}, (txObj, error) => console.log(error));
    });
    db.transaction(tx => 
      // @ts-ignore
      tx.executeSql("SELECT * FROM workouts;", null!, (txObj, resultSet) => {setNames(resultSet.rows._array); },(txObj, error) => console.log(error)));
    setLoading(false);
  },[1]);
  
  if(isLoading){
    return (
      <View>
      <Text style={styles.text}>Loading...</Text>
    </View>
    )
  }
  return (
    <ScrollView style={{width: '100%'}}>
        {names.map((name, index)=> {if (name.id > -1){let date = new Date(Date.parse(name.daylogged)); console.log(name.daylogged); return (
          <View style={{width: '100%', alignItems: 'center'}}><Text key={name.id} style={styles.text}>Workout on: {date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Text><Text style={styles.title}>{name.name}</Text><View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /></View>
        )}})}
    </ScrollView>
  )
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
