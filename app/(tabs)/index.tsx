import { ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Link style={styles.title} href={"./profile"}><Text style={styles.title}>View profile</Text></Link>
      <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,.5)" />

      <ScrollView style={{alignContent: 'center'}}>
      <Link href={"/newWorkout"}><Text style={styles.text}>Start a New Workout!</Text></Link>

        
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 15,
    paddingTop: 5,
    marginTop: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    marginTop: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    alignSelf: 'center'
  }
});
