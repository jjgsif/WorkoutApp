import { View, Text } from "@/components/Themed";
import * as SQLite from "expo-sqlite"
import {useState, useEffect} from "react";
import { StyleSheet } from "react-native";

export default function dbApp(){
  const db = SQLite.openDatabase('workouts.db');
  const [isLoading, setLoading] = useState(true);
  const [names, setNames] = useState([]);

  useEffect(()=>{
    db.transaction(tx=>
    {tx.executeSql("CREATE TABLE IF NOT EXISTS exercise (id INTEGER AUTOINCREMENT PRIMARY KEY, name TEXT, reps INTEGER, workout INTEGER");
    });
    db.transaction(tx=>
      {tx.executeSql("CREATE TABLE IF NOT EXISTS workouts (id INTEGER AUTOINCREMENT PRIMARY KEY, dayLogged DATETIME)");
    });
    db.transaction(tx => 
      tx.executeSql("SELECT dayLogged FROM workouts", null, (txObj, resultSet) => setNames(resultSet.rows._array)));
    setLoading(false);
  }, []);
  
  if(!isLoading){
    return (
      <View>
          {names.map((name)=>{<Text style={styles.text}>1</Text>})}
      </View>
    )
  }
  return (
    <View>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  text:{
    color:"white",
    width: "100%",
    textAlign: 'center',
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
