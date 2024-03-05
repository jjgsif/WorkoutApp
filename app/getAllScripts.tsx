import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView, TextInput, Button, Platform, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite"


export function workoutForm(){
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState(null);
    const [exercise, setExercise] = useState([
        {label: 'Bench Press', value: 'Bench Press'},
        {label: 'Incline Bench Press', value: 'Incline Bench Press'},
        {label: 'Incline Dumbbell Press', value: 'Incline Dumbell Press'},
        {label: 'Pec Deck', value: 'Pec Deck'},
        {label: 'Cable Flys', value: 'Cable Flys'},
        {label: 'Dumbbell Press', value:'Dumbbell Press'},
        {label: 'Machine Press', value:'Machine Press'},
        {label: 'Incline Machine Press', value: 'Incline Machine Press'}
        ]);
    const [eName, setEName] = useState("");
    const [reps, setReps] = useState(0);
    const [workout, setWorkout] = useState([{id : -1, name: '', reps: 0, weight: 0, lbs: false}]);
    const [wName, setWName] = useState('');

    const db = SQLite.openDatabase('workouts.db');
    const [id, setID] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState(false);
    const [newExercise, setNewExcersise] = useState({label:"", value: ""});
    const [on, setOn] = useState(false);
    

    const addExercise = (turnedOn:boolean) => {
        if(turnedOn){
        return (
        <View>
            <TextInput style={styles.input} placeholder="Exercise name" onChangeText={(text)=>setNewExcersise({label: text, value: text})}/>
            <Button title="Add to list" onPress={()=>{setExercise(exercise.concat(newExercise))}}/>
        </View>
        );
        }
        else{
            return;
        }
    }

    const addWorkout = () => {
        db.transaction(tx=>
            {
            tx.executeSql(`INSERT INTO workouts(dayLogged, name) values (CURRENT_TIMESTAMP ,\'${wName}\')`,null!, 
            (txObj, resultSet) => {
                setID(resultSet.rows._array.length);
                console.log(resultSet.rows._array.length);
            }, 
            (txObj, error) => {console.log(error); return false;});
            tx.executeSql('SELECT * FROM workouts;', null!, 
            (txObj, resultSet) => {
                setID(resultSet.rows._array.length);
                console.log(resultSet.rows._array.length);
            }, 
            (txObj, error) => {console.log(error); return false;}
            );
            for(let i = 0; i < workout.length; i++){
                tx.executeSql(`INSERT INTO exercise(name, reps, workout, weight, lbs) values (\"${workout[i].name}\", ${workout[i].reps}, ${workout[i].id}, ${workout[i].weight}, ${workout[i].lbs})`)
            }
        });
    }
  
     return (
      <View style={styles.container}>
        <TextInput inputMode="text" returnKeyType="done" placeholder="Workout Name" style={styles.input} onChangeText={(text) => {setWName(text)}}/>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TextInput inputMode="numeric" returnKeyType="done" placeholder="Reps" style={styles.inputName} onChangeText={(text) => {setReps(parseInt(text))}}/>
            <TextInput inputMode="numeric" returnKeyType="done" placeholder="Weight" style={styles.inputName} onChangeText={(text) => {setWeight(parseInt(text))}}/>
        </View>
        <DropDownPicker
        open={open}
        value={val}
        items={exercise}
        setOpen={setOpen}
        setValue={setVal}
        setItems={setExercise}
        onChangeValue={(value)=>{if(value != null){setEName(value)}}}
        />
        <Button title="Add exercise" onPress={()=>{setOn(true)}}/>
        {addExercise(on)}
        
        
        <View style={{padding: 10}}><Button title="Add to Workout" onPress={()=>{setWorkout([...workout, {id: workout.length, name: eName, reps: reps, weight: weight, lbs: unit }]);}}/></View>
       
        
        
        
        <ScrollView style={{width:"100%"}}>
            {workout.map((exercises)=>{if(exercises.id !== -1) return(<View style={{width: '100%', alignItems: 'center'}}><View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /><Text key={exercises.id} style={styles.text}>{exercises.name}: {exercises.reps}</Text></View>)})}
        </ScrollView>
        <View style={{padding: 10}}><Button title="Save Workout" onPress={()=> {addWorkout()}}/></View>
      </View>
    );
  };

  






  
  


const styles = StyleSheet.create({
    text:{
        width: "100%",
        textAlign: 'center',
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
        marginTop: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        color: "white"
    },
    inputName: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: "white",
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        width: '40%',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        color: "white",
        width: '70%',
        textAlign: 'center'
      }
})



