import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";
import { Platform, StyleSheet } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';

export default function ModalScreen() {
  const  {datedWorkout} = useLocalSearchParams<{datedWorkout:string}>();
  var db = SQLite.openDatabase("workouts.db");
  var [day, setDay] = useState("");
  db.transaction((tx)=>{
    tx.executeSql(`SELECT * FROM workouts WHERE id = ${datedWorkout};`, null!, (txObj, resultSet)=>{setDay(resultSet.rows._array[0].daylogged)})
  });
  var date = new Date(day);

  const [exercises, setExercises] = useState([{}])

  db.transaction((tx)=>{
    tx.executeSql(`SELECT * FROM exercise WHERE workout = ${datedWorkout};`, null!, (txObj, resultSet)=>{setExercises(resultSet.rows._array)})
  });
  
  

  const isPresented = router.canGoBack();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}`}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View>
        {exercises.map((e)=>{
          
          return(
            <View>
              <Text>{e.name}: {e.reps}</Text>
            </View>
          );
        })}
      </View>
      {isPresented && <Link href="../"><Text style={{color:'white'}}>Done</Text></Link>}

     
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
