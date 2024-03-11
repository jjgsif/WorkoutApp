import { StyleSheet, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { RadioButton } from '../getAllScripts';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

export default function TabTwoScreen() {
  var db = SQLite.openDatabase('workouts.db');


  const [exercise, setExercise] = useState(["Bench Press", "Tricep Press"]);

  const [scrollOn, setScroll] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({name: "", weight: 0, unit: "", goalWeight: 0, favorite1: "", favorite2: "", favorite3: ""});
  const [userExists, setExistence] = useState(false);

  const units = [{value: "lbs"}, {value: "kgs"}];
  const [option, setOption] = useState("");

  const [refresh, setRefresh] = useState(false);

  const submitProfile = ()=>{
    db.transaction((tx)=>{
      tx.executeSql(`INSERT INTO profile (name, weight, unit, goalWeight, favorite1, favorite2, favorite3) values (\"${profile.name}\", ${profile.weight}, \"${option}\", ${profile.goalWeight}, \"${profile.favorite1}\", \"${profile.favorite2}\", \"${profile.favorite3}\")`,null!, (txObj, results)=>{console.log("Success"); setRefresh(true);}, (txObj, error)=> console.log(error)!)
    })
  }

  const showFilledFavorites = (favorite:string) => {
    if(favorite !== ''){
      return (<Text>{favorite}</Text>);
    }
  }
  const createScrollPicker = () => {
    if(scrollOn){
    return (
      <View>
      <ScrollPicker
        dataSource={["1", "2", "3", "4", "5", "6"]}
        selectedIndex={1}
        onValueChange={(data, selectedIndex) => {}}
        wrapperHeight={180}
        wrapperBackground="#FFFFFF"
        itemHeight={60}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />
      </View>
    );
    }
    
  
  }

  const checkFavorites = () => {
    if(profile.favorite1 !== "" || profile.favorite2 !== "" || profile.favorite3 !== ""){
      return (
        <View>
          {showFilledFavorites(profile.favorite1)}
          {showFilledFavorites(profile.favorite2)}
          {showFilledFavorites(profile.favorite3)}
          <Button title="Modify Favorites"/>
        </View>
      );
    }
    
    return (
      <View>
      {showFilledFavorites(profile.favorite1)}
      {showFilledFavorites(profile.favorite2)}
      {showFilledFavorites(profile.favorite3)}
      <Button title="Add favorites" onPress={()=>{setScroll(true)}}/> 
      {createScrollPicker()}
      </View>
    )
  }



  useEffect(()=>{
    // db.transaction((tx)=>{
    //   tx.executeSql("DROP TABLE profile;");
    // });

  
    db.transaction((tx)=>{
      tx.executeSql("CREATE TABLE IF NOT EXISTS profile(name TEXT PRIMARY KEY, weight INTEGER, unit TEXT, goalWeight INTEGER, favorite1 TEXT, favorite2 TEXT, favorite3 TEXT);");
    }
    );
    db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM profile", null!, (txObj, resultRow)=>{if(resultRow.rows._array.length > 0){ setExistence(true); setProfile(resultRow.rows._array[0])}})
    })
  },[refresh]);
  const userSheet = () =>{
    return(
    <View style={styles.container}>
      <Text style={styles.title}>{profile.name}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={{flex:1, flexDirection: 'column', justifyContent:'space-evenly'}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', width:'70%'}}>
          <Text>Weight: </Text>
          <Text>{profile.weight} {profile.unit}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-between', width:'70%'}}>
          <Text>Goal Weight: </Text>
          <Text>{profile.goalWeight} {profile.unit}</Text>
        </View>
        <Button title="Edit Profile"/>
      </View>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Favorite Exercises</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={{flexDirection:'column', flex:1}}>
          {checkFavorites()}
        </View>

      </View>
    </View>);

  }
  const createUser = (exists:boolean) => {
    if(exists){return userSheet();}
    else {return (
      <View style = {styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput style={styles.input}placeholder='Name' onChangeText={(text)=>{setProfile({name: text, weight: profile.weight, unit: profile.unit, goalWeight: profile.goalWeight, favorite1: profile.favorite1, favorite2: profile.favorite2, favorite3: profile.favorite3})}}/>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.text}>Optional Fields</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{flexDirection: 'column', flex:2}}>
              <TextInput style={styles.input} keyboardType='numeric' returnKeyLabel='Done' returnKeyType='done' placeholder='Weight'/>
              <TextInput style={styles.input} keyboardType='numeric' returnKeyLabel='Done' returnKeyType='done' placeholder='Goal Weight' onChangeText={()=>{}}/> 
            </View>
            <RadioButton data={units} onSelect={(value:string) => setOption(value)}/>
        </View>   
            <Button color={"white"} title ="Create Profile" onPress={()=>{submitProfile()}}/>
       
        
      </View>
    );}
  }


  return (
    <View style={styles.container}>
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
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    marginTop: 10,
    alignSelf:'center',
    textAlign: 'center',
    alignContent: 'center'
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
      textAlign: 'center',
      alignSelf:'center'
    }
});
